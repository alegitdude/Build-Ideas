import { createContext, useContext, useReducer } from "react";

import axios from "axios";
import reducer from "./reducer";
import {
  errorResponseAlert,
  ideaCreatedAlert,
  ideaDeleteAlert,
  ideaEditedAlert,
  tooManyRankedIdeasAlert,
  genericSuccessAlert,
} from "../Alerts";
import {
  LOGOUT_USER,
  OPEN_MODAL,
  CLOSE_MODAL,
  FLIP_CHECK,
  OPEN_LOGIN,
  OPEN_SIGNUP,
  TOGGLE_USER_MENU,
  CREATE_IDEA_BEGIN,
  CREATE_IDEA_SUCCESS,
  CREATE_IDEA_ERROR,
  SET_EDIT_IDEA,
  GET_IDEAS_BEGIN,
  GET_IDEAS_SUCESS,
  DELETE_IDEA_BEGIN,
  DELETE_IDEA_SUCCESS,
  EDIT_IDEA_BEGIN,
  EDIT_IDEA_SUCCESS,
  EDIT_IDEA_ERROR,
  HANDLE_CHANGE,
  CHANGE_PAGE,
  STOP_EDITING,
  GET_MY_RANKED_IDEAS_BEGIN,
  GET_MY_RANKED_IDEAS_SUCESS,
  CREATE_RANKED_IDEA_BEGIN,
  CREATE_RANKED_IDEA_SUCCESS,
  CREATE_RANKED_IDEA_ERROR,
  DELETE_RANKED_IDEA_BEGIN,
  DELETE_RANKED_IDEA_SUCCESS,
  DELETE_RANKED_IDEA_ERROR,
  GET_MY_VOTES_BEGIN,
  GET_MY_VOTES_SUCCESS,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
} from "./actions";

import { useGlobalContext } from "../GlobalContext/Context";

const AppContext = createContext();

const initialState = {
  userLoading: false,
  isModalOpen: false,
  modalLoading: false,
  isGoodIdea: false,
  isLoginOpen: true,
  isSignupOpen: false,
  isLoading: false,
  user: null,
  isUserMenuOpen: false,
  ideas: [],
  totalIdeas: 0,
  numOfPages: 1,
  page: 1,
  isEditing: false,
  editIdeaId: "",
  Idea: "",
  display: "all",
  sort: "Created Newest",
  myRankedIdeas: [],
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // axios
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });
  // response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
  };
  const openModal = () => {
    dispatch({ type: OPEN_MODAL });
  };
  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  const flipCheck = () => {
    dispatch({ type: FLIP_CHECK });
  };
  const openLogin = () => {
    dispatch({ type: OPEN_LOGIN });
  };
  const openSignup = () => {
    dispatch({ type: OPEN_SIGNUP });
  };

  const toggleUserMenu = () => {
    dispatch({ type: TOGGLE_USER_MENU });
  };

  const createIdea = async (idea) => {
    dispatch({ type: CREATE_IDEA_BEGIN });
    try {
      const { isGoodIdea } = state;

      const response = await authFetch.post("/ideas", {
        idea,
        isGoodIdea,
      });

      dispatch({ type: CREATE_IDEA_SUCCESS, payload: { response } });

      ideaCreatedAlert();
      getIdeas();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({ type: CREATE_IDEA_ERROR });
      errorResponseAlert(error);
    }
  };

  const getIdeas = async () => {
    const { display, page, sort } = state;
    let url = `/ideas?page=${page}&sort=${sort}`;
    if (display !== "All") {
      url = `/ideas?page=${page}&isGoodIdea=${display}&sort=${sort}`;
    }

    dispatch({ type: GET_IDEAS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { ideas, totalIdeas, numOfPages } = data;
      dispatch({
        type: GET_IDEAS_SUCESS,
        payload: {
          ideas,
          totalIdeas,
          numOfPages,
        },
      });
    } catch (error) {
      errorResponseAlert(error);
    }
  };
  const setEditIdea = (singleIdea) => {
    dispatch({ type: SET_EDIT_IDEA, payload: { singleIdea } });
    document.body.style.overflow = "hidden";
  };

  const stopEditing = () => {
    dispatch({ type: STOP_EDITING });
    document.body.style.overflow = "visible";
  };

  const editIdea = async (idea) => {
    dispatch({ type: EDIT_IDEA_BEGIN });

    try {
      const { isGoodIdea } = state;
      await authFetch.patch(`/ideas/${state.editIdeaId}`, {
        idea: idea,
        isGoodIdea,
      });
      document.body.style.overflow = "visible";
      dispatch({ type: EDIT_IDEA_SUCCESS });
      ideaEditedAlert();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_IDEA_ERROR,
        payload: { msg: error.message.data.msg },
      });
    }
  };
  const deleteIdea = async (ideaId) => {
    dispatch({ type: DELETE_IDEA_BEGIN });
    try {
      await authFetch.delete(`/ideas/${ideaId}`);
      dispatch({ type: DELETE_IDEA_SUCCESS });
      ideaDeleteAlert();
      getIdeas();
    } catch (error) {
      logoutUser();
    }
  };
  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  const getMyRankedIdeas = async () => {
    const url = `/rankedIdeas/id`;
    dispatch({ type: GET_MY_RANKED_IDEAS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const myRankedIdeas = data.userRankedIdeas;
      dispatch({
        type: GET_MY_RANKED_IDEAS_SUCESS,
        payload: { myRankedIdeas },
      });
    } catch (error) {
      errorResponseAlert(error);
    }
  };

  const createRankedIdea = async (idea, isGoodIdea) => {
    const { myRankedIdeas } = state;
    if (myRankedIdeas[4]) {
      tooManyRankedIdeasAlert();
      return;
    }
    dispatch({ type: CREATE_RANKED_IDEA_BEGIN });

    try {
      const response = await authFetch.post("/rankedideas", {
        idea,
        isGoodIdea,
      });

      dispatch({ type: CREATE_RANKED_IDEA_SUCCESS });

      ideaCreatedAlert();
      getMyRankedIdeas();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({ type: CREATE_IDEA_ERROR });
      errorResponseAlert(error);
    }
  };

  const deleteRankedIdea = async (_id) => {
    dispatch({ type: DELETE_RANKED_IDEA_BEGIN });
    try {
      const response = await authFetch.delete(`/rankedideas/${_id}`);
      dispatch({ type: DELETE_RANKED_IDEA_SUCCESS, payload: { response } });
      getMyRankedIdeas();

      ideaDeleteAlert();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({ type: CREATE_IDEA_ERROR });
      errorResponseAlert(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        openModal,
        closeModal,
        flipCheck,
        openLogin,
        openSignup,
        toggleUserMenu,
        createIdea,
        setEditIdea,
        editIdea,
        getIdeas,
        deleteIdea,
        handleChange,
        changePage,
        stopEditing,
        getMyRankedIdeas,
        createRankedIdea,
        deleteRankedIdea,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { initialState };

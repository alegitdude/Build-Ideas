import {
  OPEN_MODAL,
  CLOSE_MODAL,
  FLIP_CHECK,
  OPEN_LOGIN,
  OPEN_SIGNUP,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  TOGGLE_USER_MENU,
  LOGOUT_USER_BEGIN,
  LOGOUT_USER_SUCCESS,
  UPDATE_USER_BEGIN,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
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
  GET_MY_RANKED_IDEAS_ERROR,
  CREATE_RANKED_IDEA_BEGIN,
  CREATE_RANKED_IDEA_SUCCESS,
  CREATE_RANKED_IDEA_ERROR,
  DELETE_RANKED_IDEA_BEGIN,
  DELETE_RANKED_IDEA_SUCCESS,
  GET_MY_VOTES_BEGIN,
  GET_MY_VOTES_SUCCESS,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
  LOGOUT_USER,
} from "./actions";

import { initialState } from "./Context";

const defaultList = JSON.parse(localStorage.getItem("list") || "[]");

const reducer = (state, action) => {
  if (action.type === LOGOUT_USER) {
    return { ...state, user: null };
  }
  if (action.type === OPEN_MODAL) {
    return { ...state, isModalOpen: true, isUserMenuOpen: false };
  }
  if (action.type === CLOSE_MODAL) {
    return { ...state, isModalOpen: false };
  }

  if (action.type === FLIP_CHECK) {
    const { isGoodIdea } = state;
    const toggle = !isGoodIdea;
    return { ...state, isGoodIdea: toggle };
  }
  if (action.type === OPEN_LOGIN) {
    return { ...state, isLoginOpen: true, isSignupOpen: false };
  }
  if (action.type === OPEN_SIGNUP) {
    return { ...state, isLoginOpen: false, isSignupOpen: true };
  }
  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      isModalOpen: false,
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === LOGIN_USER_BEGIN) {
    return { ...state, isLoading: true, userLoading: true };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      isModalOpen: false,
      userLoading: false,
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === TOGGLE_USER_MENU) {
    const { isUserMenuOpen } = state;
    const toggle = !isUserMenuOpen;
    return { ...state, isUserMenuOpen: toggle };
  }

  if (action.type === LOGOUT_USER_BEGIN) {
    return { ...initialState, userLoading: true };
  }
  if (action.type === LOGOUT_USER_SUCCESS) {
    return { ...initialState, user: null, userLoading: false };
  }
  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      isModalOpen: false,
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === CREATE_IDEA_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === CREATE_IDEA_SUCCESS) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === CREATE_IDEA_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === GET_IDEAS_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_IDEAS_SUCESS) {
    return {
      ...state,
      isLoading: false,
      ideas: action.payload.ideas,
      totalIdeas: action.payload.totalIdeas,
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === SET_EDIT_IDEA) {
    const { _id, idea, isGoodIdea } = action.payload.singleIdea;
    return {
      ...state,
      isEditing: true,
      editIdeaId: _id,
      idea: idea,
      isGoodIdea: isGoodIdea,
    };
  }
  if (action.type === STOP_EDITING) {
    return { ...state, isEditing: false, editIdeaId: "", idea: "" };
  }
  if (action.type === EDIT_IDEA_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_IDEA_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      isEditing: false,
    };
  }
  if (action.type === EDIT_IDEA_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === DELETE_IDEA_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === DELETE_IDEA_SUCCESS) {
    return { ...state, isLoading: true, page: 1 };
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page };
  }
  if (action.type === STOP_EDITING) {
    return { ...state, isEditing: false };
  }

  if (action.type === GET_MY_RANKED_IDEAS_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === GET_MY_RANKED_IDEAS_SUCESS) {
    return {
      ...state,
      isLoading: false,
      myRankedIdeas: action.payload.myRankedIdeas,
    };
  }
  if (action.type === DELETE_RANKED_IDEA_BEGIN) {
    return {
      ...state,
      modalLoading: true,
    };
  }
  if (action.type === DELETE_RANKED_IDEA_SUCCESS) {
    return {
      ...state,
      modalLoading: false,
    };
  }
  if (action.type === CREATE_RANKED_IDEA_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === CREATE_RANKED_IDEA_SUCCESS) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === CREATE_RANKED_IDEA_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === GET_CURRENT_USER_BEGIN) {
    return { ...state, userLoading: true };
  }
  if (action.type === GET_CURRENT_USER_SUCCESS) {
    return { ...state, userLoading: false, user: action.payload.user };
  }
};
export default reducer;

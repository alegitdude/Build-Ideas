import {
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  LOGOUT_USER_BEGIN,
  LOGOUT_USER_SUCCESS,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
} from "./action";
import {
  errorResponseAlert,
  loginSuccessfulAlert,
  logoutSuccessAlert,
  updateUserSuccessAlert,
  userCreatedAlert,
  genericSuccessAlert,
} from "../Alerts";
import axios from "axios";
import reducer from "./reducer";
import { useEffect, useReducer, useContext, createContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
const GlobalContext = createContext();

const initialState = {
  user: null,
  isLoading: false,
};
export const GlobalProvider = ({ children }) => {
  const navigation = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  // axios
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });
  // request

  // response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        dispatch({ type: LOGOUT_USER_SUCCESS });
      }
      return Promise.reject(error);
    }
  );

  const registerUser = async (newUser) => {
    window.scrollTo(0, 0);
    dispatch({ type: REGISTER_USER_BEGIN });
    document.body.style.overflow = "hidden";
    try {
      const response = await axios.post("/api/v1/auth/register", newUser);
      const { msg } = response.data;
      dispatch({ type: REGISTER_USER_SUCCESS });
      genericSuccessAlert(msg);
      document.body.style.overflow = "visible";
    } catch (error) {
      document.body.style.overflow = "visible";
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
      errorResponseAlert(error.response.data.msg);
    }
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const { data } = await axios.post("/api/v1/auth/login", currentUser);
      const { user } = data;
      dispatch({ type: LOGIN_USER_SUCCESS, payload: { user } });
      navigation("/");
      loginSuccessfulAlert();
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
      errorResponseAlert("Invalid Credentials");
    }
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);
      const { user } = data;

      dispatch({ type: UPDATE_USER_SUCCESS, payload: { user } });

      updateUserSuccessAlert();
    } catch (error) {
      dispatch({
        type: UPDATE_USER_ERROR,
      });
      errorResponseAlert(error.message.data.msg);
    }
  };
  const logoutUser = async () => {
    dispatch({ type: LOGOUT_USER_BEGIN });
    try {
      const response = await authFetch.delete("/auth/logout");
    } catch (error) {
      dispatch({ type: LOGOUT_USER_SUCCESS });
    }
    dispatch({ type: LOGOUT_USER_SUCCESS });
  };
  const getCurrentUser = async () => {
    console.log("global current user ");
    dispatch({ type: GET_CURRENT_USER_BEGIN });
    try {
      const { data } = await authFetch("./auth/getCurrentUser");
      const { user } = data;
      dispatch({ type: GET_CURRENT_USER_SUCCESS, payload: { user } });
    } catch (error) {
      if (error.response.status === 401) return;
      console.log(error.response.data.msg);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        registerUser,
        loginUser,
        logoutUser,
        updateUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { initialState };

import {
  GET_RANKED_IDEAS_BEGIN,
  GET_RANKED_IDEAS_SUCCESS,
  GET_MY_VOTES_BEGIN,
  GET_MY_VOTES_SUCCESS,
  LOGOUT_USER,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
  HANDLE_CHANGE,
  CHANGE_PAGE,
} from "./actions";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";

import reducer from "./reducer";
import axios from "axios";
import { useGlobalContext } from "../GlobalContext/Context";
const LeaderContext = createContext();

const leaderInitialState = {
  user: null,

  isBoardLoading: false,
  rankedIdeas: [],
  totalRankedIdeas: 0,
  numOfRankedPages: 0,
  rankedPage: 1,
  rankedDisplay: "all",
  rankedSort: "Most Upvotes",
  sort: "Most Upvotes",
  myVotes: [],
};

export const LeaderboardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, leaderInitialState);

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
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const getHomeIdeas = async () => {
    const url = `/home?page=1&sort=MostUpvotes`;

    dispatch({ type: GET_RANKED_IDEAS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { rankedIdeas, totalRankedIdeas, numOfRankedPages } = data;
      dispatch({
        type: GET_RANKED_IDEAS_SUCCESS,
        payload: {
          rankedIdeas,
          totalRankedIdeas,
          numOfRankedPages,
        },
      });
    } catch (error) {
      errorResponseAlert(error);
    }
  };
  const getRankedIdeas = async () => {
    const { rankedDisplay, rankedPage, sort } = state;
    let url = `/rankedideas?page=${rankedPage}&sort=${sort}`;
    if (rankedDisplay !== "All") {
      url = `/rankedideas?page=${rankedPage}&isGoodIdea=${rankedDisplay}&sort=${sort}`;
    }

    dispatch({ type: GET_RANKED_IDEAS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { rankedIdeas, totalRankedIdeas, numOfRankedPages } = data;
      dispatch({
        type: GET_RANKED_IDEAS_SUCCESS,
        payload: {
          rankedIdeas,
          totalRankedIdeas,
          numOfRankedPages,
        },
      });
    } catch (error) {
      errorResponseAlert(error);
    }
  };

  const getMyVotes = async () => {
    const url = `/vote/`;
    dispatch({ type: GET_MY_VOTES_BEGIN });
    try {
      const { data } = await authFetch(url);
      const myVotes = data.userVotes;
      dispatch({
        type: GET_MY_VOTES_SUCCESS,
        payload: { myVotes },
      });
    } catch (error) {
      errorResponseAlert(error);
      console.log(error);
    }
  };
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    getHomeIdeas();
  };

  const loginUser = () => {
    if (!user) {
      logoutUser();
    }
  };


  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };
  const changePage = (rankedPage) => {
    dispatch({ type: CHANGE_PAGE, payload: { rankedPage } });
  };

  return (
    <LeaderContext.Provider
      value={{
        ...state,
        getRankedIdeas,
        getHomeIdeas,
        handleChange,
        getMyVotes,
        logoutUser,
        loginUser,

        changePage,
      }}
    >
      {children}
    </LeaderContext.Provider>
  );
};

export const useLeaderboardContext = () => {
  return useContext(LeaderContext);
};

export { leaderInitialState };

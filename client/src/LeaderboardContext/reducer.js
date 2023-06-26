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
const defaultList = JSON.parse(localStorage.getItem("list") || "[]");
import { leaderInitialState } from "./Context";

const reducer = (state, action) => {
  if (action.type === GET_RANKED_IDEAS_BEGIN) {
    return { ...state, isBoardLoading: true };
  }
  if (action.type === GET_RANKED_IDEAS_SUCCESS) {
    if (action.payload.numOfRankedPages < 2) {
      return {
        ...state,
        isBoardLoading: false,
        rankedIdeas: action.payload.rankedIdeas,
        totalRankedIdeas: action.payload.totalRankedIdeas,
        numOfRankedPages: action.payload.numOfRankedPages,
        rankedPage: 1,
      };
    }
    return {
      ...state,
      isBoardLoading: false,
      rankedIdeas: action.payload.rankedIdeas,
      totalRankedIdeas: action.payload.totalRankedIdeas,
      numOfRankedPages: action.payload.numOfRankedPages,
    };
  }
  if (action.type === GET_MY_VOTES_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === GET_MY_VOTES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      myVotes: action.payload.myVotes,
    };
  }
  if (action.type === LOGOUT_USER) {
    return { ...leaderInitialState, user: null };
  }
  if (action.type === GET_CURRENT_USER_BEGIN) {
    return { ...state, userLoading: true };
  }
  if (action.type === GET_CURRENT_USER_SUCCESS) {
    return { ...state, userLoading: false, user: action.payload.user };
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === CHANGE_PAGE) {
    return { ...state, rankedPage: action.payload.rankedPage };
  }
};
export default reducer;

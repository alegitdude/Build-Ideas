import { useLeaderboardContext } from "./LeaderboardContext/Context";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { errorResponseAlert } from "./Alerts";

import { useGlobalContext } from "./GlobalContext/Context";
import HandThumbsDown from "./assets/HandThumbsDown";
import HandThumbsUp from "./assets/HandThumbsUp";

const SingleRankedIdea = ({ isGoodIdea, upVotes, idea, submittedBy, _id }) => {
  const { logoutUser } = useLeaderboardContext();
  const { user } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [ideaName, setIdeaName] = useState("");
  const [vote, setVote] = useState(null);
  const [currentUpVotes, setCurrentUpVotes] = useState(upVotes);
  const [glowState, setGlowState] = useState("");

  ////////////// AXIOS //////////////////
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
  ////////////////////////////////////////////////

  const getMyVotes = async () => {
    const url = `/vote/`;
    try {
      const { data } = await authFetch.get(url);
      const allMyVotes = data.userVotes;
      const oldVote = allMyVotes.find((votes) => {
        return votes.rankedIdea === _id;
      });
      setVote(oldVote);
      if (oldVote?.thumb === 1) {
        setGlowState("upVote");
      }
      if (oldVote?.thumb === -1) {
        setGlowState("downVote");
      }
    } catch (error) {
      errorResponseAlert(error);
    }
  };
  useEffect(() => {
    getMyVotes();
  }, [idea]);

  const deleteVote = async (_id) => {
    setIsLoading(true);
    const url = `/vote/${_id}`;
    try {
      const response = await authFetch.delete(url);
      setCurrentUpVotes(response.data.newRankedIdea.upVotes);
      setGlowState("");
      getMyVotes();
      setIsLoading(false);
    } catch (error) {
      errorResponseAlert(error);
    }
  };

  const changeVote = async (newThumb) => {
    setIsLoading(true);

    const url = `/vote/${vote._id}`;
    try {
      const response = await authFetch.patch(url);
      const thumbs = response.data.newRankedIdea.upVotes;
      getMyVotes();
      setCurrentUpVotes(thumbs);
      if (newThumb === 1) {
        setGlowState("upVote");
      }
      if (newThumb === -1) {
        setGlowState("downVote");
      }
      setIsLoading(false);
    } catch (error) {
      errorResponseAlert(error);
    }
  };
  const castVote = async (newThumb) => {
    setIsLoading(true);

    // Reclick of previous vote: Delete vote
    if (vote && vote.thumb === newThumb) {
      deleteVote(vote._id);
      getMyVotes();
      return;
    }
    // No previous vote: Create new vote
    if (!vote) {
      const url = `/vote/`;
      try {
        const data = await authFetch.post(url, {
          id: _id,
          thumb: newThumb,
        });
        const thumbs = data.data.newRankedIdea.upVotes;

        setCurrentUpVotes(thumbs);
        getMyVotes();
        setIsLoading(false);
        return;
      } catch (error) {
        errorResponseAlert(`${error.response.data.msg}`);
        setIsLoading(false);
      }
    }
    // Click on opposte thumb: Change vote
    if (vote && vote.thumb !== newThumb) {
      changeVote(newThumb);
    }
  };

  return (
    <div className="single-ranked-container">
      <div className={"single-ranked-idea"}>
        <div className="ranked-idea-grid ">
          <div className="ranking">
            {isLoading && <Loading className="loading" />}
            <HandThumbsUp
              onClick={() => {
                castVote(1);
              }}
              className={
                glowState === "upVote"
                  ? "thumbs thumbs-up upVote"
                  : "thumbs thumbs-up"
              }
            />

            {currentUpVotes}

            <HandThumbsDown
              onClick={() => {
                castVote(-1);
              }}
              className={
                glowState === "downVote"
                  ? "thumbs thumbs-down downVote"
                  : "thumbs thumbs-down"
              }
            />
          </div>

          <div className="ranked-idea-text-container">
            <p className="ranked-idea-text">{idea}</p>
            <span className="submitted-by">{`Submitted by: ${submittedBy.name}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRankedIdea;

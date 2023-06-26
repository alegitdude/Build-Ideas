import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import HandThumbsUp from "./assets/HandThumbsUp";
import HandThumbsDown from "./assets/HandThumbsDown";
const HomeIdea = ({ isGoodIdea, upVotes, idea, submittedBy, _id }) => {
  const [showPointer, setShowPointer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUpVotes, setCurrentUpVotes] = useState(upVotes);
  const [ideaName, setIdeaName] = useState("");
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
  useEffect(() => {
    setShowPointer(false);
  }, [idea]);

  const handlePointer = () => {
    setShowPointer(true);
    setTimeout(() => {
      setShowPointer(false);
    }, 3000);
  };
  return (
    <div className="single-ranked-container">
      <div
        className={showPointer ? "flip-to-login flip-visible" : "flip-to-login"}
      >
        <p className="login-reminder">
          <span>Login</span> at the top of the page to vote!
        </p>
      </div>
      <div
        className={
          showPointer
            ? "single-ranked-idea flip-invisible"
            : "single-ranked-idea"
        }
      >
        <div
          style={{
            backgroundColor: "var(--primary-grey)",
          }}
          className="ranked-idea-grid "
        >
          <div className="ranking">
            <HandThumbsUp
              onClick={() => {
                handlePointer();
              }}
              className={"thumbs thumbs-up"}
            />
            {isLoading && <Loading isGoodIdea={isGoodIdea} />}

            {currentUpVotes}

            <HandThumbsDown
              onClick={() => {
                handlePointer();
              }}
              className={"thumbs thumbs-down"}
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
export default HomeIdea;

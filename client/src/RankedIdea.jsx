import { useAppContext } from "./context/Context";
import { useState } from "react";
import CloseCircle from "./assets/CloseCircle";
import HandThumbsUp from "./assets/HandThumbsUp";
const RankedIdea = (singleIdea) => {
  const [showDelete, setShowDelete] = useState(false);
  const { idea, isGoodIdea, upVotes, _id } = singleIdea.singleIdea;
  const { deleteRankedIdea, getMyRankedIdeas } = useAppContext();
  return (
    <div>
      <div
        className={
          showDelete
            ? "visible delete-ideas-container "
            : "delete-ideas-container"
        }
      >
        <h3 className="delete-idea">Delete and remove from leaderboard?</h3>
        <div>
          <button
            onClick={() => deleteRankedIdea(_id)}
            className="delete-confirm confirm-yes"
          >
            Yes
          </button>
          <button
            className="delete-confirm confirm-no"
            onClick={() => setShowDelete(false)}
          >
            No
          </button>
        </div>
      </div>
      <div
        className={
          showDelete
            ? "invisible profile-ideas-container "
            : "profile-ideas-container"
        }
      >
        <div className="profile-idea">
          <div>
            <HandThumbsUp />
            {upVotes}
          </div>
          <p>{idea}</p>
        </div>
        <button
          onClick={() => setShowDelete(true)}
          className="delete-idea-button"
        >
          <CloseCircle className="delete-idea-icon" />
        </button>
      </div>
    </div>
  );
};
export default RankedIdea;

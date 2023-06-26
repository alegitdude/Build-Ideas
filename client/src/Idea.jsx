import { useEffect, useState } from "react";
import { useAppContext } from "./context/Context";

const Idea = (singleIdea) => {
  const { idea } = singleIdea;
  const { deleteIdea, setEditIdea, createRankedIdea, myRankedIdeas } =
    useAppContext();
  const isGood = singleIdea.isGoodIdea;
  const _id = singleIdea._id;
  const [deleteDropMenu, setDeleteDropMenu] = useState(false);
  const [submitDropMenu, setSubmitDropMenu] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  useEffect(() => {
    const submitted = myRankedIdeas.filter((rankedIdea) => {
      return rankedIdea.idea === idea;
    });
    if (submitted[0]) {
      setIsSubmitted(true);
    }
  }, []);

  const handleSubmit = () => {
    createRankedIdea(idea, isGood);
  };
  const handleLeave = () => {
    setDeleteDropMenu(false);
    setSubmitDropMenu(false);
  };

  const goToTop = () => {
    document.scrollingElement.scrollTop;

    window.scrollTo(0, 1);
    document.getElementById("nav").scrollTo(0, 0);
  };

  const handleEdit = (singleIdea) => {
    goToTop();
    setEditIdea(singleIdea);
  };

  const handleDelete = () => {
    deleteIdea(_id);
  };
  return (
    <div id="ideaBox" className="idea-box" onMouseLeave={() => handleLeave()}>
      <div
        onMouseLeave={() => handleLeave()}
        className="idea"
        style={{
          backgroundColor: !isGood ? "rgb(245,0,0,0.2)" : "rgb(0, 245, 0, .2",
        }}
      >
        <p className="is-good"> {isGood ? "Good Idea" : "Bad Idea"}</p>
        <p className="idea-text">{idea}</p>

        <button
          type="button"
          className="idea-btn btn-edit"
          onClick={() => handleEdit(singleIdea)}
        >
          Edit
        </button>
        <div className="delete-menu">
          <button
            type="button"
            className="idea-btn btn-delete"
            onClick={() => {
              setDeleteDropMenu(!deleteDropMenu);
              setSubmitDropMenu(false);
            }}
          >
            Delete
          </button>
          <div
            id="delete-submenu"
            className={
              deleteDropMenu
                ? "delete-submenu show-delete-submenu"
                : "delete-submenu"
            }
          >
            <h4>Are You Sure?</h4>
            <div>
              <button
                onClick={() => handleDelete()}
                type="button"
                className="delete yes-delete"
              >
                Yes
              </button>
              <button
                onClick={() => setDeleteDropMenu(!deleteDropMenu)}
                type="button"
                className="delete no-delete"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="submit-container">
        {isSubmitted ? (
          <p className="submitted">Submitted!</p>
        ) : (
          <button
            type="button"
            className="idea-btn btn-submit"
            onClick={() => {
              setSubmitDropMenu(!submitDropMenu);
              setDeleteDropMenu(false);
            }}
          >
            Submit to Leaderboard
          </button>
        )}

        <div
          id="submit-submenu"
          className={
            submitDropMenu
              ? "submit-submenu show-submit-submenu"
              : "submit-submenu"
          }
        >
          <h5>Once you submit, you cannot edit your idea. Submit?</h5>
          <div>
            <button
              onClick={handleSubmit}
              type="button"
              className="delete yes-delete"
            >
              Yes
            </button>
            <button
              onClick={() => setSubmitDropMenu(!submitDropMenu)}
              type="button"
              className="delete no-delete"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Idea;

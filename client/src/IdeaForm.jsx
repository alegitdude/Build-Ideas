import { useState, useEffect } from "react";
import Filter from "bad-words";
import { useAppContext } from "./context/Context";
import { ideaLengthAlert, noIdeaAlert } from "./Alerts";
import { UserLoading } from "./UserLoading";
import TimesIcon from "./assets/TimesIcon";

const Form = () => {
  const {
    isGoodIdea,
    flipCheck,
    isLoading,
    createIdea,
    isEditing,
    idea,
    editIdea,
    handleChange,
    stopEditing,
    userLoading,
    getIdeas,
  } = useAppContext();

  const [newIdea, setNewIdea] = useState("");
  const [editableIdea, setEditableIdea] = useState("");
  useEffect(() => {
    setEditableIdea(idea);
  }, [idea]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const filter = new Filter();
    const formData = new FormData(e.currentTarget);
    const newIdea = Object.fromEntries(formData);
    const idea = filter.clean(newIdea.idea);
    if (!idea || idea.length < 5) {
      noIdeaAlert();
      return;
    }
    if (idea.length > 150) {
      ideaLengthAlert(idea.length);
      return;
    }

    createIdea(idea);

    setNewIdea("");
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const filter = new Filter();
    const formData = new FormData(e.currentTarget);
    const newIdea = Object.fromEntries(formData);
    const idea = filter.clean(newIdea.idea);
    if (!idea || idea.length < 5) {
      noIdeaAlert();
      return;
    }
    if (idea.length > 150) {
      ideaLengthAlert(idea.length);
      return;
    }
    editIdea(idea);
    setNewIdea("");
  };

  const handleClose = () => {
    stopEditing();
  };
  if (userLoading) {
    return <UserLoading />;
  }

  return (
    <div className={isEditing ? "form-container form-focus" : "form-container"}>
      <form
        className={isEditing ? "form form-margin" : "form"}
        onSubmit={isEditing ? handleEdit : handleSubmit}
      >
        <label className="label" id="idea">
          Your Idea
        </label>
        {isEditing ? (
          <textarea
            className="input text-area"
            type="text"
            name="idea"
            id="idea"
            onChange={(event) => setEditableIdea(event.target.value)}
            value={editableIdea}
            autoFocus
          />
        ) : (
          <textarea
            placeholder="Only genius please"
            className="input text-area"
            type="text"
            name="idea"
            value={newIdea}
            id="idea"
            onChange={(event) => setNewIdea(event.target.value)}
          />
        )}

        <div className="check-btn">
          <p>Is this a good idea?</p>
          <label id="yes">Yes</label>
          <input
            checked={isGoodIdea}
            onChange={flipCheck}
            className="checkbox"
            type="checkbox"
            id="yes"
          />
          <label className="check-label" id="no">
            No
          </label>
          <input
            checked={!isGoodIdea}
            onChange={flipCheck}
            className="checkbox"
            type="checkbox"
            id="no"
          />
        </div>

        <button type="submit" disabled={isLoading} className="btn btn-submit">
          {isEditing ? "Update" : "Submit"}
        </button>
      </form>
      {isEditing ? (
        <button
          type="button"
          className="close-modal-btn close-btn"
          onClick={() => handleClose()}
        >
          <TimesIcon />
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};
export default Form;

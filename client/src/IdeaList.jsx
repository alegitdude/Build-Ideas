import { useEffect, useRef } from "react";
import { useAppContext } from "./context/Context";
import Idea from "./Idea";
import { nanoid } from "nanoid";
import PageBtnContainer from "./PageBtnContainer";
import Loader from "./Loader";
import "./assets/Loader.css";
import { UserLoading } from "./UserLoading";
import ArrowUp from "./assets/ArrowUp";

const List = () => {
  const {
    ideas,
    getIdeas,
    isEditing,
    handleChange,
    display,
    numOfPages,
    page,
    sort,
    getMyRankedIdeas,
    isLoading,
  } = useAppContext();

  const handleDisplay = (e) => {
    if (e.target.value === "Good Ideas") {
      handleChange({ name: e.target.name, value: true });
    }
    if (e.target.value === "Bad Ideas") {
      handleChange({ name: e.target.name, value: false });
    }
    if (e.target.value === "All") {
      handleChange({ name: e.target.name, value: "All" });
    }
  };

  const handleSort = (e) => {
    if (e.target.value === "Created Newest") {
      handleChange({ name: e.target.name, value: "Created Newest" });
    }
    if (e.target.value === "Created Oldest") {
      handleChange({ name: e.target.name, value: "Created Oldest" });
    }
    if (e.target.value === "Edited Newest") {
      handleChange({ name: e.target.name, value: "Edited Newest" });
    }
    if (e.target.value === "Edited Oldest") {
      handleChange({ name: e.target.name, value: "Edited Oldest" });
    }
  };

  useEffect(() => {
    getIdeas();
    getMyRankedIdeas();
  }, [display, isEditing, page, sort]);

  return (
    <div
      className={
        isEditing ? "ideas-container editing-margin" : "ideas-container"
      }
    >
      <h2 className="ideas-title">Your Ideas</h2>
      <div className="list-options">
        <form className="display-form">
          <div className="display-row">
            <label className="display-label">Display: </label>
            <select
              className="display-input"
              name="display"
              id="display"
              onChange={handleDisplay}
            >
              <option value="All">All</option>
              <option value="Good Ideas">Good Ideas</option>
              <option value="Bad Ideas">Bad Ideas</option>
            </select>
          </div>
        </form>
        <form className="display-form">
          <div className="display-row">
            <label className="display-label">Sort: </label>
            <select
              className="display-input"
              name="sort"
              id="sort"
              onChange={handleSort}
            >
              <option value="Created Newest">Created Newest</option>
              <option value="Created Oldest">Created Oldest</option>
              <option value="Edited Newest">Edited Newest</option>
              <option value="Edited Oldest">Edited Oldest</option>
            </select>
          </div>
        </form>
      </div>
      {numOfPages === 0 && (
        <div className="no-ideas">
          <ArrowUp className="arrow-up" />
          <h1>Create your ideas above </h1>
        </div>
      )}
      <div className="ideas">
        {isLoading === true ? <Loader /> : null}

        <div className="ideas">
          {ideas.map((singleIdea) => {
            const { idea, isGoodIdea, _id } = singleIdea;

            return (
              <div className="idea-container" key={nanoid()}>
                <Idea idea={idea} isGoodIdea={isGoodIdea} _id={_id} />
              </div>
            );
          })}
        </div>
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </div>
  );
};
export default List;

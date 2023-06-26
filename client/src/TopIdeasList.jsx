import { useEffect, useState } from "react";
import { useLeaderboardContext } from "./LeaderboardContext/Context";
import SingleRankedIdea from "./SingleRankedIdea";
import { nanoid } from "nanoid";
import LeaderPageBtnContainer from "./LeaderPageBtnContainer";

const TopIdeasList = () => {
  const {
    getRankedIdeas,
    rankedIdeas,
    handleChange,
    sort,
    rankedPage,
    rankedDisplay,
    numOfRankedPages,
  } = useLeaderboardContext();

  useEffect(() => {
    getRankedIdeas();
  }, [rankedDisplay, rankedPage, sort]);

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
    if (e.target.value === "Newest") {
      handleChange({ name: e.target.name, value: "Newest" });
    }
    if (e.target.value === "Oldest") {
      handleChange({ name: e.target.name, value: "Oldest" });
    }
    if (e.target.value === "Most Upvotes") {
      handleChange({ name: e.target.name, value: "Most Upvotes" });
    }
    if (e.target.value === "Most Downvotes") {
      handleChange({ name: e.target.name, value: "Most Downvotes" });
    }
  };

  return (
    <div className="leaderboard">
      <div className="title-container">
        <h1 className="leaderboard-title">Leaderboard</h1>
      </div>
      <div className="listings">
        <div className="rankings-list">
          <div className="list-options">
            <form className="display-form">
              <div className="display-row">
                <label className="display-label">Display: </label>
                <select
                  className="display-input"
                  name="rankedDisplay"
                  id="rankedDisplay"
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
                  <option value="Most Upvotes">Most Upvotes</option>
                  <option value="Most Downvotes">Most Downvotes</option>
                  <option value="Newest">Newest</option>
                  <option value="Oldest">Oldest</option>
                </select>
              </div>
            </form>
          </div>

          {rankedIdeas.map((singleIdea) => {
            const { _id, isGoodIdea, upVotes, idea, submittedBy } = singleIdea;

            return (
              <SingleRankedIdea
                key={nanoid()}
                _id={_id}
                isGoodIdea={isGoodIdea}
                upVotes={upVotes}
                idea={idea}
                submittedBy={submittedBy}
              />
            );
          })}
        </div>
      </div>
      {numOfRankedPages > 1 && <LeaderPageBtnContainer />}
    </div>
  );
};
export default TopIdeasList;

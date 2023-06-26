import { useEffect, useMemo, useState } from "react";

import axios from "axios";
import { nanoid } from "nanoid";
import HomeIdea from "./HomeIdea";

const HomeList = () => {
  const [ideasArray, setIdeasArray] = useState([]);
  useEffect(() => {
    getHomeIdeas();
  }, []);

  const getHomeIdeas = useMemo(() => {
    return async () => {
      const authFetch = axios.create({
        baseURL: "/api/v1",
      });
      const url = `/home?page=1&sort=Most Upvotes`;

      try {
        const { data } = await authFetch(url);
        const { rankedIdeas, totalRankedIdeas, numOfRankedPages } = data;
        setIdeasArray(rankedIdeas);
      } catch (error) {
        errorResponseAlert(error);
      }
    };
  }, []);
  const rankedIdeas = ideasArray;

  return (
    <div className="leaderboard">
      <div className="title-container">
        <h1 className="leaderboard-title">Leaderboard</h1>
      </div>
      <div className="listings">
        <div className="rankings-list">
          {rankedIdeas.map((singleIdea) => {
            const { _id, isGoodIdea, upVotes, idea, submittedBy } = singleIdea;

            return (
              <HomeIdea
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
      {/* {numOfRankedPages > 1 && <LeaderPageBtnContainer />} */}
    </div>
  );
};
export default HomeList;

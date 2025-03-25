import { useContext } from "react";

import { BoardContext } from "../lib/context";
import { MatchScoresForm } from "./MatchScoresForm";

export const BoardList = () => {
  const { summary } = useContext(BoardContext);
  return (
    <div className="resultsWrapper">
      {summary?.length ? (
        summary.map((el) => {
          return (
            <div className="resultRow" key={el.id}>
              <div className="scores">
                <div className="team">
                  <span className="teamName">{el.home}</span>
                  <span className="teamScore">{el.scores.home}</span>
                </div>
                -
                <div className="team">
                  <span className="teamScore">{el.scores.away}</span>
                  <span className="teamName">{el.away}</span>
                </div>
              </div>
              <MatchScoresForm scores={el.scores} id={el.id} />
            </div>
          );
        })
      ) : (
        <div>No live matches...</div>
      )}
    </div>
  );
};

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
                <TeamInfo score={el.scores.home} name={el.home} />
                -
                <TeamInfo score={el.scores.away} name={el.away} />
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

const TeamInfo = ({ score, name }: { score: number; name: string }) => (
  <div className="team">
    <span className="teamName">{name}</span>
    <span className="teamScore">{score}</span>
  </div>
);

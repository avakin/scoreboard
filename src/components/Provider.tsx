import { ReactNode, useState } from "react";

import Board from "../lib/board";
import { BoardContext } from "../lib/context";
import { Match, Scores, Teams } from "../lib/types";

export const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [results, setResults] = useState<Match[]>([]);

  const onStart = (params: Teams) => {
    Board.startMatch(params);
    setResults(Board.summary);
  };

  const onFinish = (id: number) => {
    Board.finishMatch(id);
    setResults(Board.summary);
  };

  const onUpdate = (id: number, params: Scores) => {
    Board.updateMatch(id, params);
    setResults(Board.summary);
  };

  return (
    <BoardContext.Provider
      value={{
        summary: results,
        onStart,
        onFinish,
        onUpdate,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

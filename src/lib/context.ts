import { createContext } from "react";
import { BoardContextType } from "./types";

export const BoardContext = createContext<BoardContextType>({
  summary: [],
  onStart: () => {},
  onFinish: () => {},
  onUpdate: () => {},
});

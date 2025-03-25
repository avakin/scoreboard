export interface Match {
  id: number;
  home: string;
  away: string;
  startedAt: number;
  finishedAt?: number | null;
  scores: Scores;
}

export type Scores = {
  home: number;
  away: number;
};

export type Teams = {
  home: string;
  away: string;
};

export interface BoardContextType {
  summary: Match[];
  onStart: (opts: { home: string; away: string }) => void;
  onFinish: (id: number) => void;
  onUpdate: (id: number, scores: Scores) => void;
}

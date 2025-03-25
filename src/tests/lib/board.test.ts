import {
  describe,
  it,
  expect,
  beforeEach,
  vi,
  afterAll,
  beforeAll,
} from "vitest";
import { ScoreBoard } from "../../lib/board";

describe("ScoreBoard", () => {
  let board: ScoreBoard;
  const mockDate = new Date("2025-03-25T12:00:00Z");

  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });
  beforeEach(() => {
    board = new ScoreBoard();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("should start a match successfully", () => {
    board.startMatch({ home: "Juventus", away: "Inter" });
    expect(board.summary).toHaveLength(1);
    expect(board.summary[0]).toMatchObject({
      home: "Juventus",
      away: "Inter",
      scores: { home: 0, away: 0 },
      startedAt: mockDate.valueOf(),
    });
  });

  it("should not start a match if team names are missing", () => {
    board.startMatch({ home: "", away: "Inter" });
    expect(board.summary).toHaveLength(0);
  });

  it("should update a match score", () => {
    board.startMatch({ home: "Juventus", away: "Inter" });
    const matchId = board.summary[0].id;

    const updatedMatch = board.updateMatch(matchId, { home: 1, away: 2 });
    expect(updatedMatch).toBeDefined();
    expect(updatedMatch?.scores).toEqual({ home: 1, away: 2 });
  });

  it("should not update a match if the ID is invalid", () => {
    const result = board.updateMatch(999, { home: 1, away: 2 });
    expect(result).toBeUndefined();
  });

  it("should finish a match successfully", () => {
    board.startMatch({ home: "Juventus", away: "Inter" });
    const matchId = board.summary[0].id;

    const finishedMatch = board.finishMatch(matchId);
    expect(finishedMatch).toBeDefined();
    expect(finishedMatch?.finishedAt).toBe(mockDate.valueOf());
    expect(board.summary).toHaveLength(0);
  });

  it("should not finish a match if the ID is invalid", () => {
    const result = board.finishMatch(999);
    expect(result).toBeUndefined();
  });

  it("should return a sorted summary based on total score and start time", () => {
    board.startMatch({ home: "Juventus", away: "Inter" });
    board.startMatch({ home: "Lazio", away: "Roma" });

    const match1 = board.summary[0].id;
    const match2 = board.summary[1].id;

    board.updateMatch(match1, { home: 2, away: 2 });
    board.updateMatch(match2, { home: 1, away: 0 });

    const summary = board.summary;
    expect(summary[0].scores).toEqual({ home: 2, away: 2 });
  });
});

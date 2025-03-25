import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ReactNode } from "react";

import { BoardContext } from "../../lib/context";
import { Board } from "../../lib/board";
import { Teams, Scores } from "../../lib/types";
import { BoardProvider } from "../../components/Provider";

describe("BoardProvider", () => {
  const ProviderWrapper = ({ children }: { children: ReactNode }) => (
    <BoardProvider>{children}</BoardProvider>
  );

  it("should start a match and update context", async () => {
    const teams: Teams = { home: "Juventus", away: "Inter" };

    const mockStartMatch = vi
      .spyOn(Board, "startMatch")
      .mockImplementation(() => {});

    const mockGetSummary = vi.spyOn(Board, "getSummary").mockReturnValue([
      {
        id: 1,
        home: "Juventus",
        away: "Inter",
        startedAt: new Date().valueOf(),
        finishedAt: null,
        scores: { home: 0, away: 0 },
      },
    ]);

    render(
      <ProviderWrapper>
        <BoardContext.Consumer>
          {(value) => (
            <>
              <button
                data-testid="start-button"
                onClick={() => value.onStart(teams)}
              >
                Start Match
              </button>
              <div data-testid="summary">
                {value?.summary?.[0]?.home} - {value?.summary?.[0]?.away}
              </div>
            </>
          )}
        </BoardContext.Consumer>
      </ProviderWrapper>
    );

    const startButton = screen.getByTestId("start-button");
    fireEvent.click(startButton);

    expect(mockStartMatch).toHaveBeenCalledWith(teams);
    expect(mockGetSummary).toHaveBeenCalled();
    expect(screen.getByTestId("summary").textContent).toEqual(
      "Juventus - Inter"
    );
  });

  it("should finish a match and update context", async () => {
    const matchId = 1;

    const mockFinishMatch = vi
      .spyOn(Board, "finishMatch")
      .mockImplementation(() => undefined);

    const mockGetSummary = vi.spyOn(Board, "getSummary").mockReturnValue([
      {
        id: 1,
        home: "Juventus",
        away: "Inter",
        startedAt: new Date().valueOf(),
        finishedAt: new Date().valueOf(),
        scores: { home: 1, away: 0 },
      },
    ]);

    render(
      <ProviderWrapper>
        <BoardContext.Consumer>
          {(value) => (
            <>
              <button
                data-testid="finish-button"
                onClick={() => value.onFinish(matchId)}
              >
                Finish Match
              </button>
              <div data-testid="summary">{value?.summary?.[0]?.finishedAt}</div>
            </>
          )}
        </BoardContext.Consumer>
      </ProviderWrapper>
    );

    const finishButton = screen.getByTestId("finish-button");
    fireEvent.click(finishButton);

    expect(mockFinishMatch).toHaveBeenCalledWith(matchId);
    expect(mockGetSummary).toHaveBeenCalled();
    expect(screen.getByTestId("summary").textContent).toEqual(
      `${new Date().valueOf()}`
    );
  });

  it("should handle errors when trying to update non-existent match", async () => {
    const matchId = 999;
    const scores: Scores = { home: 1, away: 3 };

    const mockUpdateMatch = vi
      .spyOn(Board, "updateMatch")
      .mockImplementation(() => {
        console.error("No match found to update from test");
        return undefined;
      });

    render(
      <ProviderWrapper>
        <BoardContext.Consumer>
          {(value) => (
            <>
              <button
                data-testid="update-button"
                onClick={() => value.onUpdate(matchId, scores)}
              >
                Update Scores
              </button>
            </>
          )}
        </BoardContext.Consumer>
      </ProviderWrapper>
    );

    const updateButton = screen.getByTestId("update-button");
    fireEvent.click(updateButton);

    expect(mockUpdateMatch).toHaveBeenCalledWith(matchId, scores);
    expect(console.error).toBeCalledWith("No match found to update from test");
  });
});

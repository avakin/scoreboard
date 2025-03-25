import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { BoardList } from "../../components/BoardList";
import { BoardContext } from "../../lib/context";
import { Match } from "../../lib/types";

vi.mock("../../components/MatchScoresForm", () => ({
  MatchScoresForm: () => <div data-testid="match-scores-form">Form</div>,
}));

describe("BoardList", () => {
  const initialContextValues = {
    summary: [],
    onFinish: vi.fn(),
    onStart: vi.fn(),
    onUpdate: vi.fn(),
  };
  const renderWithContext = (summary?: Match[]) =>
    render(
      <BoardContext.Provider
        value={{ ...initialContextValues, summary: summary || [] }}
      >
        <BoardList />
      </BoardContext.Provider>
    );

  it("renders placeholder when no results", () => {
    renderWithContext();

    expect(screen.getByText("No live matches...")).toBeInTheDocument();
  });

  it("renders resulst list correctly", () => {
    const mockSummary = [
      {
        id: 1,
        home: "Juventus",
        away: "Milan",
        scores: { home: 2, away: 1 },
        startedAt: new Date().valueOf(),
      },
      {
        id: 2,
        home: "Roma",
        away: "Napoli",
        scores: { home: 3, away: 4 },
        startedAt: new Date().valueOf(),
      },
    ];
    renderWithContext(mockSummary);

    expect(screen.getByText("Juventus")).toBeInTheDocument();
    expect(screen.getByText("Milan")).toBeInTheDocument();
    expect(screen.getByText("Roma")).toBeInTheDocument();
    expect(screen.getByText("Napoli")).toBeInTheDocument();

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders MatchScoresForm child component", () => {
    const mockSummary = [
      {
        id: 1,
        home: "Juventus",
        away: "Milan",
        scores: { home: 2, away: 1 },
        startedAt: new Date().valueOf(),
      },
    ];

    renderWithContext(mockSummary);

    expect(screen.getAllByTestId("match-scores-form")).toHaveLength(1);
  });
});

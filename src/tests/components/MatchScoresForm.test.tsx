import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { BoardContext } from "../../lib/context";
import { MatchScoresForm } from "../../components/MatchScoresForm";
import { Match } from "../../lib/types";

describe("MatchScoresForm", () => {
  const mockOnUpdate = vi.fn();
  const mockOnFinish = vi.fn();
  const mockOnStart = vi.fn();
  const mockSummary: Match[] = [
    {
      id: 1,
      home: "Milan",
      away: "Juventus",
      scores: {
        home: 1,
        away: 2,
      },
      startedAt: new Date().valueOf(),
    },
  ];

  const initialScores = { home: 1, away: 2 };

  const renderWithContext = (scores: { home: number; away: number }) =>
    render(
      <BoardContext.Provider
        value={{
          onUpdate: mockOnUpdate,
          onFinish: mockOnFinish,
          onStart: mockOnStart,
          summary: mockSummary,
        }}
      >
        <MatchScoresForm scores={scores} id={1} />
      </BoardContext.Provider>
    );

  it("renders form with controls after click on edit button", () => {
    renderWithContext(initialScores);

    const editButton = screen.getByText("✏️");
    fireEvent.click(editButton);

    expect(screen.getByPlaceholderText("Home team score")).toHaveValue(1);
    expect(screen.getByPlaceholderText("Away team score")).toHaveValue(2);
    expect(screen.getByText("❌")).toBeInTheDocument();
    expect(screen.getByText("✔️")).toBeInTheDocument();
    expect(screen.getByText("🏁")).toBeInTheDocument();
  });

  it("toggles form when the edit button is clicked", () => {
    renderWithContext(initialScores);

    const editButton = screen.getByText("✏️");
    fireEvent.click(editButton);

    expect(screen.getByPlaceholderText("Home team score")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Away team score")).toBeInTheDocument();
    expect(screen.getByText("❌")).toBeInTheDocument();

    const closeButton = screen.getByText("❌");
    fireEvent.click(closeButton);

    expect(screen.getByText("✏️")).toBeInTheDocument();
    expect(
      screen.queryByPlaceholderText("Home team score")
    ).not.toBeInTheDocument();
  });

  it("calls onUpdate with passed params button is clicked", async () => {
    renderWithContext(initialScores);

    const editButton = screen.getByText("✏️");
    fireEvent.click(editButton);

    const homeInput = screen.getByPlaceholderText("Home team score");
    const awayInput = screen.getByPlaceholderText("Away team score");

    fireEvent.change(homeInput, { target: { value: "3" } });
    fireEvent.change(awayInput, { target: { value: "4" } });

    const updateButton = screen.getByText("✔️");
    fireEvent.click(updateButton);

    expect(mockOnUpdate).toHaveBeenCalledWith(1, { home: 3, away: 4 });
  });

  it("calls onFinish when button is clicked", () => {
    renderWithContext(initialScores);

    const finishButton = screen.getByText("🏁");
    fireEvent.click(finishButton);

    expect(mockOnFinish).toHaveBeenCalledWith(1);
  });
});

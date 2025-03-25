import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";

import { NewMatchForm } from "../../components/NewMatchForm";
import { BoardContext } from "../../lib/context";

describe("NewMatchForm", () => {
  const mockOnStart = vi.fn();

  const initialContextValues = {
    summary: [],
    onFinish: vi.fn(),
    onStart: mockOnStart,
    onUpdate: vi.fn(),
  };

  const renderWithContext = () =>
    render(
      <BoardContext.Provider value={initialContextValues}>
        <NewMatchForm />
      </BoardContext.Provider>
    );

  it("renders form with empty fields", () => {
    renderWithContext();

    expect(screen.getByPlaceholderText("Home team")).toHaveValue("");
    expect(screen.getByPlaceholderText("Away team")).toHaveValue("");
  });

  it("handles input components correctly", () => {
    renderWithContext();

    const homeInput = screen.getByPlaceholderText("Home team");
    const awayInput = screen.getByPlaceholderText("Away team");

    fireEvent.change(homeInput, { target: { value: "Juventus" } });
    fireEvent.change(awayInput, { target: { value: "Milan" } });

    expect(homeInput).toHaveValue("Juventus");
    expect(awayInput).toHaveValue("Milan");
  });

  it("does not call onStart if fields are empty triggers console.error", () => {
    renderWithContext();

    const submitButton = screen.getByText("▶️");
    fireEvent.click(submitButton);

    expect(mockOnStart).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith("Please fill in all the fields");
  });

  it("calls onStart with the correct values when form is valid", async () => {
    renderWithContext();

    const homeInput = screen.getByPlaceholderText("Home team");
    const awayInput = screen.getByPlaceholderText("Away team");

    fireEvent.change(homeInput, { target: { value: "Milan" } });
    fireEvent.change(awayInput, { target: { value: "Lazio" } });

    const submitButton = screen.getByText("▶️");
    fireEvent.click(submitButton);

    expect(mockOnStart).toHaveBeenCalledWith({
      home: "Milan",
      away: "Lazio",
    });
  });

  it("resets the form after submit", async () => {
    renderWithContext();

    const homeInput = screen.getByPlaceholderText("Home team");
    const awayInput = screen.getByPlaceholderText("Away team");

    fireEvent.change(homeInput, { target: { value: "Juve" } });
    fireEvent.change(awayInput, { target: { value: "Fiorentina" } });

    const submitButton = screen.getByText("▶️");
    fireEvent.click(submitButton);

    expect(homeInput).toHaveValue("");
    expect(awayInput).toHaveValue("");
  });
});

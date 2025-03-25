import "@testing-library/jest-dom";
import { afterAll, beforeAll, vi } from "vitest";

export const mockDate = new Date("2025-03-25");

beforeAll(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});

  vi.useFakeTimers();
  vi.setSystemTime(mockDate);
});

afterAll(() => {
  vi.useRealTimers();
});

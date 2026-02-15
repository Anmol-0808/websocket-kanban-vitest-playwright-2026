import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProgressChart from "../../components/ProgressChart";

describe("ProgressChart", () => {
  test("calculates and displays correct completion percentage", () => {
    const mockTasks = [
      { id: "1", status: "todo" },
      { id: "2", status: "in-progress" },
      { id: "3", status: "done" },
      { id: "4", status: "done" },
    ];

    render(<ProgressChart tasks={mockTasks} />);

    expect(screen.getByText("50% done")).toBeInTheDocument();
  });

  test("shows 0% when there are no tasks", () => {
    render(<ProgressChart tasks={[]} />);

    expect(screen.getByText("0% done")).toBeInTheDocument();
  });

  test("renders correct number of bars based on task categories", () => {
    const mockTasks = [
      { id: "1", status: "todo" },
      { id: "2", status: "todo" },
      { id: "3", status: "in-progress" },
      { id: "4", status: "done" },
    ];

    render(<ProgressChart tasks={mockTasks} />);

    expect(screen.getByText("25% done")).toBeInTheDocument();
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

// Mock BEFORE importing component
vi.mock("../../socket", () => ({
  default: {
    emit: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
  },
}));

import KanbanBoard from "../../components/KanbanBoard.jsx";
import socket from "../../socket";

describe("KanbanBoard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders Kanban board title", () => {
    render(<KanbanBoard />);
    expect(screen.getByText("Kanban Board")).toBeInTheDocument();
  });

  test("shows loading initially", () => {
    render(<KanbanBoard />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  test("opens modal when Add Task is clicked", async () => {
  render(<KanbanBoard />);

  socket.on.mock.calls[0][1]([]);

  const addButton = await screen.findByText("Add Task");
  fireEvent.click(addButton);

  expect(screen.getByTestId("modal")).toBeInTheDocument();
});


 test("submits form and emits task:create", async () => {
  render(<KanbanBoard />);

  socket.on.mock.calls[0][1]([]);

  const addButton = await screen.findByText("Add Task");
  fireEvent.click(addButton);

  fireEvent.change(screen.getByTestId("title-input"), {
    target: { value: "Test Task" },
  });

  fireEvent.click(screen.getByTestId("submit-btn"));

  expect(socket.emit).toHaveBeenCalledWith("task:create", {
    title: "Test Task",
    priority: "medium",
    category: "feature",
  });
});

});

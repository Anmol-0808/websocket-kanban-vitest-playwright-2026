import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom";

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

  function triggerSync(tasks) {
    // Grab the sync callback and trigger it
    const syncCallback = socket.on.mock.calls.find(
      (call) => call[0] === "sync:tasks"
    )[1];

    syncCallback(tasks);
  }

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
    triggerSync([]);

    const addButton = await screen.findByText("Add Task");
    fireEvent.click(addButton);

    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  test("submits form and emits task:create", async () => {
    render(<KanbanBoard />);
    triggerSync([]);

    const addButton = await screen.findByText("Add Task");
    fireEvent.click(addButton);

    fireEvent.change(screen.getByTestId("title-input"), {
      target: { value: "Test Task" },
    });

    fireEvent.click(screen.getByTestId("submit-btn"));

    expect(socket.emit).toHaveBeenCalledWith(
      "task:create",
      expect.objectContaining({
        title: "Test Task",
        priority: "medium",
        category: "feature",
        description: "",
        attachments: [],
      })
    );
  });

  test("emits task:delete when delete icon is clicked", async () => {
    const mockTask = {
      id: "123",
      title: "Delete Me",
      status: "todo",
      priority: "medium",
      category: "feature",
      description: "",
      attachments: [],
    };

    render(<KanbanBoard />);
    triggerSync([mockTask]);

    const taskCard = await screen.findByTestId(`task-${mockTask.id}`);
    const deleteIcon = taskCard.querySelector(".delete-icon");

    fireEvent.click(deleteIcon);

    expect(socket.emit).toHaveBeenCalledWith("task:delete", "123");
  });

  test("emits task:update when editing a task", async () => {
    const mockTask = {
      id: "999",
      title: "Old Title",
      status: "todo",
      priority: "medium",
      category: "feature",
      description: "",
      attachments: [],
    };

    render(<KanbanBoard />);
    triggerSync([mockTask]);

    const taskCard = await screen.findByTestId(`task-${mockTask.id}`);

    fireEvent.doubleClick(taskCard);

    fireEvent.change(screen.getByTestId("title-input"), {
      target: { value: "Updated Title" },
    });

    fireEvent.click(screen.getByTestId("submit-btn"));

    expect(socket.emit).toHaveBeenCalledWith(
      "task:update",
      expect.objectContaining({
        id: "999",
        title: "Updated Title",
      })
    );
  });
});

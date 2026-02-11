import React, { useEffect, useState } from "react";
import socket from "../socket";
import "./KanbanBoard.css";
import TaskModal from "./TaskModal";

import Column from "./Column";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function KanbanBoard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleCreateTask = (taskData) => {
  socket.emit("task:create", taskData);
};


  useEffect(() => {
    socket.on("sync:tasks", (serverTasks) => {
      setTasks(serverTasks);
      setLoading(false)
    });

    return () => {
      socket.off("sync:tasks");
    };
  }, []);

  const createDummyTask = () => {
    socket.emit("task:create", {
      title: "New Task",
      priority: "medium",
      category: "feature",
    });
  };

  const handleDropTask = (taskId, newStatus) => {
    socket.emit("task:move", {
      taskId,
      status: newStatus,
    });
  };

  return (
  <DndProvider backend={HTML5Backend}>
    <div className="kanban-container">
      <h2>Kanban Board</h2>

      {loading ? (
        <p data-testid="loading">Loading tasks...</p>
      ) : (
        <>
              <button
                className="add-btn"
                onClick={() => setIsModalOpen(true)}>
                Add Task
              </button>


          <div className="board">
            <Column
              title="Todo"
              status="todo"
              tasks={tasks}
              onDropTask={handleDropTask}
            />

            <Column
              title="In Progress"
              status="in-progress"
              tasks={tasks}
              onDropTask={handleDropTask}
            />

            <Column
              title="Done"
              status="done"
              tasks={tasks}
              onDropTask={handleDropTask}
            />
          </div>
        </>
      )}
            <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTask}
      />
    </div>
  </DndProvider>
);
}

export default KanbanBoard;

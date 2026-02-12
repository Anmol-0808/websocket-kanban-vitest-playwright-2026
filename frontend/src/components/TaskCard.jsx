import React from "react";
import { useDrag } from "react-dnd";
import socket from "../socket";

const ItemType = "TASK";

function TaskCard({ task, onEdit }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleDelete = (e) => {
    e.stopPropagation();
    socket.emit("task:delete", task.id);
  };

  return (
    <div
      ref={drag}
      className="card"
      style={{
        opacity: isDragging ? 0.5 : 1,
        position: "relative",
        cursor: "pointer",
      }}
      data-testid={`task-${task.id}`}
      onDoubleClick={() => onEdit(task)}
    >
      <div
  onClick={handleDelete}
  className="delete-icon"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path d="M3 6h18" />
    <path d="M8 6V4h8v2" />
    <path d="M9 6v14h6V6" />
  </svg>
</div>


      <strong>{task.title}</strong>

      {task.description && (
        <p style={{ marginTop: "6px", fontSize: "0.9rem", opacity: 0.8 }}>
          {task.description}
        </p>
      )}

      <div className="badge-row">
  <div className="priority-badge">
    <span className={`dot ${task.priority}`}></span>
    <span className="badge-text">
      {task.priority.toUpperCase()}
    </span>
  </div>

  <div className="category-badge">
    {task.category.toUpperCase()}
  </div>
</div>
</div>
  );
}

export default TaskCard;
export { ItemType };

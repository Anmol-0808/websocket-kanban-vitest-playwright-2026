import React from "react";
import { useDrag } from "react-dnd";

const ItemType = "TASK";

function TaskCard({ task }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="card"
      style={{ opacity: isDragging ? 0.5 : 1 }}
      data-testid={`task-${task.id}`}
    >
      <strong>{task.title}</strong>
      <p>Priority: {task.priority}</p>
    </div>
  );
}

export default TaskCard;
export { ItemType };

import React from "react";
import { useDrop } from "react-dnd";
import TaskCard, { ItemType } from "./TaskCard";

function Column({ title, status, tasks, onDropTask }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item) => {
      if (item.status !== status) {
        onDropTask(item.id, status);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`column ${isOver ? "active" : ""}`}
      data-testid={`column-${status}`}
    >
      <h3>{title}</h3>

      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
    </div>
  );
}

export default Column;

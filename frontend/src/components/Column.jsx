import React from "react";
import { useDrop } from "react-dnd";
import TaskCard, { ItemType } from "./TaskCard";

function Column({ title, status, tasks, onDropTask, onEditTask }) {
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
        <div className="column-header">
          <h3>{title}</h3>
          <span className="task-count">
            {tasks.filter((task) => task.status === status).length}
          </span>
        </div>
        {tasks
          .filter((task) => task.status === status)
          .map((task) => (
            <TaskCard
                key={task.id}
                task={task}
                  onEdit={onEditTask}
            />
          ))}
      </div>
  );
}

export default Column;

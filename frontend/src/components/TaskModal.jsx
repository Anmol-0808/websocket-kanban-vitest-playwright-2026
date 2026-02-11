import React, { useState } from "react";
import "./KanbanBoard.css";

function TaskModal({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("feature");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    onSubmit({
      title,
      priority,
      category,
    });

    setTitle("");
    setPriority("medium");
    setCategory("feature");
    onClose();
  };

  return (
    <div className="modal-overlay" data-testid="modal">
      <div className="modal">
        <h3>Create Task</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            data-testid="title-input"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            data-testid="priority-select"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            data-testid="category-select"
          >
            <option value="bug">Bug</option>
            <option value="feature">Feature</option>
            <option value="enhancement">Enhancement</option>
          </select>

          <div className="modal-actions">
            <button type="submit" data-testid="submit-btn">
              Create
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;

import React, { useEffect, useState } from "react";
import "./KanbanBoard.css";
import Select from "react-select";

function TaskModal({ isOpen, onClose, onSubmit, existingTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("feature");
  const [attachments, setAttachments] = useState([]);

  useEffect(() => {
  if (!isOpen) return;

  if (existingTask) {
    setTitle(existingTask.title);
    setDescription(existingTask.description || "");
    setPriority(existingTask.priority);
    setCategory(existingTask.category);
    setAttachments(existingTask.attachments || []);
  } else {
    
    setTitle("");
    setDescription("");
    setPriority("medium");
    setCategory("feature");
    setAttachments([]);
  }
}, [isOpen, existingTask]);


  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    onSubmit({
      title,
      description,
      priority,
      category,
      attachments,
    });

    onClose();
  };
const handleFileChange = async (e) => {
  const files = Array.from(e.target.files);

  const processedFiles = await Promise.all(
    files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            name: file.name,
            type: file.type,
            data: reader.result,
          });
        };
        reader.readAsDataURL(file);
      });
    })
  );

  setAttachments((prev) => [...prev, ...processedFiles]);
};

  return (
    <div className="modal-overlay" data-testid="modal">
      <div className="modal">
        <h3>{existingTask ? "Edit Task" : "Create Task"}</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            data-testid="title-input"
          />

          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            data-testid="description-input"
          />

              <Select
                value={{
                  value: priority,
                  label: priority.toUpperCase(),
                }}
                onChange={(option) => setPriority(option.value)}
                options={[
                  { value: "low", label: "LOW" },
                  { value: "medium", label: "MEDIUM" },
                  { value: "high", label: "HIGH" },
                ]}
                className="react-select"
                classNamePrefix="react"
              />
                <Select
              value={{
                value: category,
                label: category.toUpperCase(),
              }}
              onChange={(option) => setCategory(option.value)}
              options={[
                { value: "bug", label: "BUG" },
                { value: "feature", label: "FEATURE" },
                { value: "enhancement", label: "ENHANCEMENT" },
              ]}
              className="react-select"
              classNamePrefix="react"
            />
              <label className="file-label">
                Attach Files
              </label>
              <input
                type="file"
                multiple
                accept="image/*,.pdf"
                onChange={handleFileChange}
              />
          <div className="modal-actions">
            <button type="submit" data-testid="submit-btn">
              {existingTask ? "Update" : "Add"}
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

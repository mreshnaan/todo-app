// AddTodoForm.js
import React, { useState } from "react";

function AddTodoForm({ onAddTodo }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    onAddTodo(task.trim());
    setTask("");
  };

  return (
    <div className="add-todo-form">
      <h2 className="form-title">Add Todo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task..."
          className="todo-input"
        />
        <button type="submit" className="add-button">Add</button>
      </form>
    </div>
  );
}

export default AddTodoForm;

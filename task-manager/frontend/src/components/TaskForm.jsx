// src/components/TaskForm.jsx
import React, { useState } from "react";

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title) return;

    setLoading(true);
    try {
      await onCreate({ title, description, completed: false });
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        className="task-input"
        type="text"
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        className="task-textarea"
        placeholder="Descrição (opcional)"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Criando..." : "Criar Tarefa"}
      </button>
    </form>
  );
}

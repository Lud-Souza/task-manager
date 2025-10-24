// src/components/TaskList.jsx
import React, { useState } from "react";

function TaskItem({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(task.completed || false);

  async function save() {
    setLoading(true);
    try {
      await onUpdate(task.id, { title, description, completed });
      setEditing(false);
    } finally {
      setLoading(false);
    }
  }

  async function toggleComplete() {
    setLoading(true);
    const newStatus = !completed;
    try {
      // atualiza status local e no servidor
      await onUpdate(task.id, { title, description, completed: newStatus });
      setCompleted(newStatus);

      // se marcar como concluída, exclui a tarefa
      if (newStatus) {
        await onDelete(task.id);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`task-item card ${completed ? "completed" : "pending"}`}>
      {editing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="task-actions">
            <button onClick={save} disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </button>
            <button
              onClick={() => setEditing(false)}
              className="muted"
            >
              Cancelar
            </button>
          </div>
        </>
      ) : (
        <>
          <h4 className={completed ? "completed-text" : ""}>{title}</h4>
          {description && (
            <p className={completed ? "completed-text" : ""}>{description}</p>
          )}
          <div className="task-actions">
            <button onClick={() => setEditing(true)}>Editar</button>
            <button
              onClick={() => onDelete(task.id)}
              className="danger"
            >
              Excluir
            </button>
            <button onClick={toggleComplete}>
              {completed ? "Desmarcar" : "Concluir"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function TaskList({ tasks = [], onUpdate, onDelete }) {
  if (!tasks.length)
    return <p className="no-tasks">Nenhuma tarefa ainda.</p>;

  return (
    <div className="task-list">
      {tasks.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

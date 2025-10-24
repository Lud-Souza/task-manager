// src/App.jsx
import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { registerUser, loginUser, listTasks, createTask, updateTask, deleteTask } from "./api";
import "./assets/index.css";
import "./assets/app.css";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "null"));
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      loadTasks();
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setTasks([]);
    }
  }, [token]);

  async function onAuth(userObj, jwt) {
    setUser(userObj);
    setToken(jwt);
  }

  async function loadTasks() {
    setLoading(true);
    setError(null);
    try {
      const data = await listTasks(token);
      setTasks(data || []);
    } catch (err) {
      setError(err.message || JSON.stringify(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(payload) {
    await createTask(token, payload);
    await loadTasks();
  }

  async function handleUpdate(id, payload) {
    await updateTask(token, id, payload);
    await loadTasks();
  }

  async function handleDelete(id) {
    await deleteTask(token, id);
    await loadTasks();
  }

  async function handleComplete(id) {
    try {
      await deleteTask(token, id);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Erro ao concluir (excluir) tarefa:", error);
    }
  }

  function handleLogout() {
    setToken(null);
    setUser(null);
  }

  if (!token) {
    return (
      <div className="app">
        <div className="auth-container">
          <h1>Task Manager</h1>
          <div className="auth-forms">
            <Login onAuth={onAuth} />
            <Register onAuth={onAuth} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tasks-page">
      <header className="header">
        <h1>Minhas Tarefas</h1>
      </header>

      <main>
        <div className="task-creation">
          <p className="welcome">Olá, {user?.username}</p>
          <TaskForm onCreate={handleCreate} />
        </div>

        {loading ? <p className="loading">Carregando...</p> : (
          <TaskList tasks={tasks} onUpdate={handleUpdate} onDelete={handleDelete} />
        )}

        {error && <div className="error">{error}</div>}
      </main>

      <footer className="footer">
        <button className="logout-button" onClick={handleLogout}>Sair</button>
      </footer>
    </div>
  );
}

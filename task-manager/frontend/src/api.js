// src/api.js
const BASE = "http://localhost:5000";

// Usuário
export async function registerUser(userData) {
  const res = await fetch(`${BASE}/api/user/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
}

export async function loginUser(credentials) {
  const res = await fetch(`${BASE}/api/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return res.json();
}

// Helper para enviar token
function getAuthHeaders(token) {
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
}

// Tarefas
export async function listTasks(token) {
  const res = await fetch(`${BASE}/api/task`, {
    headers: getAuthHeaders(token),
  });
  if (!res.ok) throw new Error("Erro ao carregar tarefas");
  return res.json();
}

export async function createTask(token, data) {
  const res = await fetch(`${BASE}/api/task`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao criar tarefa");
  return res.json();
}

export async function updateTask(token, id, updates) {
  const res = await fetch(`${BASE}/api/task/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(token),
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error(`Erro ao atualizar: ${res.status}`);
  return res.json();
}

export async function deleteTask(token, id) {
  const res = await fetch(`${BASE}/api/task/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });
  if (!res.ok) throw new Error(`Erro ao deletar: ${res.status}`);
  return res.json();
}

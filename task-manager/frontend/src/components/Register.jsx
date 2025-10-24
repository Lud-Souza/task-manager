// src/components/Register.jsx
import React, { useState } from "react";
import { registerUser } from "../api";

export default function Register({ onAuth }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await registerUser({ username, email, password });
      if (res.token) {
        onAuth(res.user, res.token);
      } else {
        setError(res.message || "Erro no registro");
      }
    } catch (err) {
      setError(err.message || "Erro no registro");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar</h2>
      <input
        type="text"
        placeholder="Nome de usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Registrar</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

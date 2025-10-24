// src/components/Login.jsx
import React, { useState } from "react";
import { loginUser } from "../api";

export default function Login({ onAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await loginUser({ email, password });
      if (res.token) {
        onAuth(res.user, res.token);
      } else {
        setError(res.message || "Erro no login");
      }
    } catch (err) {
      setError(err.message || "Erro no login");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
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
      <button type="submit">Entrar</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

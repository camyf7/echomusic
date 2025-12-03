"use client";

import "./SignUp.css";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { useState } from "react";
import { signInWithGooglePopup } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import { doLogin } from "../../lib/authHandler";
import { useAuth } from "../../contexts/AuthContext";
import { API_URL } from "../../config/api";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setLogged, setUser } = useAuth();

  // =============================
  // 🔹 Função para atualizar inputs
  // =============================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // =============================
  // 🔹 Cadastro com API
  // =============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao criar conta.");

      alert("Usuário cadastrado com sucesso!");
      navigate("/signin"); // redireciona para login
    } catch (err) {
      console.error("Erro no cadastro:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // =============================
  // 🔹 Cadastro/Login com Google
  // =============================
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await signInWithGooglePopup();
      if (!result) throw new Error("Falha ao logar com o Google.");

      const token = await result.user.getIdToken();
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        uid: result.user.uid,
      };

      doLogin(token, userData);
      setUser(userData);
      setLogged(true);

      alert("Login com Google realizado!");
      navigate("/signin");
    } catch (err) {
      console.error("Erro no Google Sign-In:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // =============================
  // 🔹 Interface
  // =============================
  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <span className="logo-text">EchoMusic</span>

        <h2>Crie sua conta</h2>
        <p className="signup-subtitle">Entre no ritmo com a EchoMusic.</p>

        {/* FORMULÁRIO */}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nome Completo</label>
            <input
              type="text"
              name="name"
              placeholder="Seu nome"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="seuemail@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="signup-btn" type="submit" disabled={loading}>
            {loading ? "Criando..." : "Criar Conta"}
          </button>
        </form>

        {/* DIVISOR */}
        <div className="divider">
          <span>ou cadastre com</span>
        </div>

        {/* LOGIN SOCIAL */}
        <div className="social-login">
          <button
            className="social-btn google"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            <FaGoogle size={18} />
            <span>Google</span>
          </button>

          <button className="social-btn facebook" disabled>
            <FaFacebookF size={18} />
            <span>Facebook</span>
          </button>
        </div>

        {/* LINK PARA LOGIN */}
        <p className="signup-login">
          Já tem uma conta? <Link to="/signin">Entrar</Link>
        </p>

        {/* ERROS */}
        {error && <p style={{ color: "red", marginTop: "12px" }}>{error}</p>}
      </div>
    </div>
  );
}

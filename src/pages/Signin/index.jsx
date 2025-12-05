import React, { useState } from "react";
import "./SignIn.css";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { doLogin } from "../../lib/authHandler";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config/api";

export default function SignIn() {
  const { setUser, setLogged } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // =============================
  // 🔹 Atualizar inputs
  // =============================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // =============================
  // 🔹 Login normal com API Railway
  // =============================
  const handleLogin = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      setError("Preencha email e senha");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || "Erro ao fazer login");
        setLoading(false);
        return;
      }

      const token = data.token;
      const userData = {
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        avatar_url: data.user.avatar_url || null,
      };

      // Salva token + user
      doLogin(token, userData);
      setUser(userData);
      setLogged(true);

      setLoading(false);
      alert("Usuário logado com sucesso!");
      navigate("/profile");

    } catch (error) {
      console.error("Erro no login:", error);
      setError("Erro ao conectar ao servidor");
      setLoading(false);
    }
  };

  // =============================
  // 🔹 Login com Google
  // =============================
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const token = await user.getIdToken();

      const userData = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
      };

      doLogin(token, userData);
      setUser(userData);
      setLogged(true);

      alert("Usuário logado com sucesso!");
      navigate("/profile");
    } catch (error) {
      console.error("Erro no login com Google:", error);
      alert("Falha ao entrar com Google");
    }
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-card">
        <span className="logo-text">EchoMusic</span>

        <h2>Entrar na EchoMusic</h2>
        <p className="signin-subtitle">Bem-vindo de volta ao ritmo.</p>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="seuemail@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button
            type="button"
            className="signin-btn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="divider">
          <span>ou entre com</span>
        </div>

        <div className="social-login">
          <button className="social-btn google" onClick={handleGoogleSignIn}>
            <FaGoogle size={18} />
            <span>Google</span>
          </button>
          <button className="social-btn facebook">
            <FaFacebookF size={18} />
            <span>Facebook</span>
          </button>
        </div>

        <p className="signin-register">
          Ainda não tem conta? <a href="/signup">Cadastrar</a>
        </p>
      </div>
    </div>
  );
}

"use client";

import "./SignUp.css";
import logo from "../../assets/logo.png";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { useState } from "react";
import { signInWithGooglePopup } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { doLogin } from "../../lib/authHandler";
import { useAuth } from "../../contexts/AuthContext";

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

  // CADASTRO NO BACK-END
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 1 ▪ CADASTRA NO BACK-END
      const res = await fetch("http://localhost:3000/usuarios/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }

      // 2 ▪ FAZ LOGIN AUTOMATICAMENTE
      const loginRes = await fetch("http://localhost:3000/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const loginData = await loginRes.json();

      if (loginData.error) {
        setError(loginData.error);
        setLoading(false);
        return;
      }

      const token = loginData.token;

      const userData = {
        id: loginData.user.id,
        username: loginData.user.username,
        email: loginData.user.email,
        avatar_url: loginData.user.avatar_url,
      };

      doLogin(token, userData);
      setUser(userData);
      setLogged(true);

      navigate("/");

    } catch (error) {
      console.error("Erro no cadastro:", error);
      setError("Erro ao criar conta.");
    } finally {
      setLoading(false);
    }
  };

  // LOGIN COM GOOGLE (CONTINUA IGUAL)
  async function handleGoogleSignIn() {
    setLoading(true);
    setError(null);

    try {
      const result = await signInWithGooglePopup();
      if (!result) throw new Error("Falha ao obter informações do Google.");

      const token = await result.getIdToken();
      const userData = {
        name: result.displayName,
        email: result.email,
        photoURL: result.photoURL,
        uid: result.uid,
      };

      doLogin(token, userData);
      setUser(userData);
      setLogged(true);
      navigate("/");
    } catch (error) {
      console.error("Erro ao cadastrar com Google:", error);
      setError(error.message || "Erro ao fazer cadastro.");
    } finally {
      setLoading(false);
    }
  }

  // INPUT GENÉRICO
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <img src={logo} alt="EchoMusic Logo" className="signup-logo" />

        <h2>Crie sua conta</h2>
        <p className="signup-subtitle">Entre no ritmo com a EchoMusic.</p>

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

        <div className="divider">
          <span>ou cadastre com</span>
        </div>

        <div className="social-login">
          <button className="social-btn google" onClick={handleGoogleSignIn} disabled={loading}>
            <FaGoogle size={18} />
            <span>Google</span>
          </button>
          <button className="social-btn facebook">
            <FaFacebookF size={18} />
            <span>Facebook</span>
          </button>
        </div>

        <p className="signup-login">
          Já tem uma conta? <a href="/signin">Entrar</a>
        </p>

        {error && <p style={{ color: "red", marginTop: "12px" }}>{error}</p>}
      </div>
    </div>
  );
}
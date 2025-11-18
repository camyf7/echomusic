"use client";

import "./SignUp.css";
import logo from "../../assets/logo.png";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { useState } from "react";
import { signInWithGooglePopup } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
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

  // CADASTRO + LOGIN AUTOMÁTICO
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 1 ▪ Cadastro
      const res = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao criar conta");

      // 2 ▪ Login automático
      const loginRes = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const loginData = await loginRes.json();
      console.log("Login Data:", loginData); // log para depuração
      if (!loginRes.ok) throw new Error(loginData.error || "Erro ao logar");

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
    } catch (err) {
      console.error("Erro no cadastro/login:", err);
      setError(err.message || "Erro ao criar conta.");
    } finally {
      setLoading(false);
    }
  };

  // LOGIN COM GOOGLE
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await signInWithGooglePopup();
      if (!result) throw new Error("Falha ao obter informações do Google.");

      const token = await result.user.getIdToken(); // corrigido
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        uid: result.user.uid,
      };

      doLogin(token, userData);
      setUser(userData);
      setLogged(true);
      navigate("/");
    } catch (err) {
      console.error("Erro ao cadastrar com Google:", err);
      setError(err.message || "Erro ao fazer cadastro.");
    } finally {
      setLoading(false);
    }
  };

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

        <p className="signup-login">
          Já tem uma conta? <Link to="/signin">Entrar</Link>
        </p>

        {error && <p style={{ color: "red", marginTop: "12px" }}>{error}</p>}
      </div>
    </div>
  );
}
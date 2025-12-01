import React, { useState } from "react";
import "./SignIn.css";
import logo from "../../assets/logo.png";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { doLogin } from "../../lib/authHandler";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const { setUser, setLogged } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) return alert("Preencha email e senha");

    try {
      const res = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.error) return alert(data.error);

      const token = data.token;
      const userData = {
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        avatar_url: data.user.avatar_url || null,
      };

      doLogin(token, userData);
      setUser(userData);
      setLogged(true);

      // 🔹 Alerta não bloqueante
      setTimeout(() => {
        alert("Usuário logado com sucesso!");
        navigate("/profile"); // redireciona
      }, 10);

    } catch (error) {
      console.error("Erro no login:", error);
      alert("Erro ao tentar entrar");
    }
  };

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

      setTimeout(() => {
        alert("Usuário logado com sucesso!");
        navigate("/profile");
      }, 10);

    } catch (error) {
      console.error("Erro ao fazer login com Google:", error);
      alert("Falha ao entrar com Google");
    }
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-card">
        <img src={logo} alt="EchoMusic Logo" className="signin-logo" />
        <h2>Entrar na EchoMusic</h2>
        <p className="signin-subtitle">Bem-vindo de volta ao ritmo.</p>

        <form>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="seuemail@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="signin-btn"
            onClick={handleLogin}
          >
            Entrar
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

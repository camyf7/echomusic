import React from "react";
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

      // salva no localStorage
      doLogin(token, userData);

      // atualiza o contexto
      setUser(userData);
      setLogged(true);

      // redireciona para home
      navigate("/");
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
            <input type="email" placeholder="seuemail@email.com" />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input type="password" placeholder="••••••••" />
          </div>

          <button type="button" className="signin-btn">Entrar</button>
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

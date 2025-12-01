"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 🔹 para redirecionamento
import axios from "axios";
import "./EditProfile.css";
import defaultAvatar from "../../assets/users.jpg";

const EditProfile = () => {
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState(""); // 🔹 bio
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // 🔹 hook de navegação
  const token = localStorage.getItem("token"); // JWT armazenado

  // 🔹 Carrega dados do backend
  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = res.data.user; // backend envia { user }
        setUsername(user.username || "");
        setEmail(user.email || "");
        setAvatar(user.avatar_url || defaultAvatar);
        setBio(user.bio || ""); // 🔹 atualiza bio
      } catch (err) {
        console.error("Erro ao buscar perfil:", err);
        alert("Falha ao carregar perfil");
      }
    };

    fetchUser();
  }, [token]);

  // 🔹 Atualiza a imagem do avatar localmente
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  // 🔹 Salva alterações chamando o backend
  const handleSave = async (e) => {
    e.preventDefault();
    if (!token) return alert("Usuário não autenticado");

    setLoading(true);

    try {
      const res = await axios.put(
        "http://localhost:3000/user/update",
        { username, email, avatar_url: avatar, bio }, // envia bio
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // 🔹 Atualiza front com os dados retornados
      const updatedUser = res.data.user;
      setUsername(updatedUser.username);
      setEmail(updatedUser.email);
      setAvatar(updatedUser.avatar_url || defaultAvatar);
      setBio(updatedUser.bio || "");

      alert(res.data.message || "Perfil atualizado com sucesso!");

      // 🔹 Redireciona para a página de perfil após salvar
      navigate("/profile"); // substitua "/profile" pela rota real da página de perfil
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      alert(err.response?.data?.error || "Falha ao atualizar perfil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile-container">
      <div className="edit-header">
        <h1>Editar Perfil</h1>
        <p>Atualize suas informações pessoais e imagem de perfil</p>
      </div>

      <form onSubmit={handleSave} className="edit-form">
        <div className="avatar-section">
          <div className="avatar-preview">
            <img src={avatar} alt="Foto de perfil" />
          </div>
          <label htmlFor="avatar-upload" className="upload-btn">
            Trocar Foto
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: "none" }}
          />
        </div>

        <div className="input-group">
          <label>Nome de usuário</label>
          <input
            type="text"
            placeholder="@usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Biografia</label>
          <textarea
            rows="3"
            placeholder="Fale um pouco sobre você..."
            value={bio}
            onChange={(e) => setBio(e.target.value)} // 🔹 bio
          />
        </div>

        <div className="buttons">
          <button type="submit" className="btn-save" disabled={loading}>
            {loading ? "Salvando..." : "Salvar Alterações"}
          </button>
          <button
            type="button"
            className="btn-cancel"
            onClick={() => window.history.back()}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
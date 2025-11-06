"use client";

import { useState, useEffect } from "react";
import "./EditProfile.css";
import defaultAvatar from "../../assets/users.jpg";

const EditProfile = () => {
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [memberSince] = useState("Membro desde 2025");

  // 🔹 Carrega dados do localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("userProfile");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setAvatar(parsed.avatar || defaultAvatar);
      setName(parsed.name || "");
      setUsername(parsed.username || "");
      setBio(parsed.bio || "");
    }
  }, []);

  // 🔹 Atualiza a imagem do avatar (sem alterar banner)
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  // 🔹 Salva os dados e mantém o banner existente
  const handleSave = (e) => {
    e.preventDefault();
    try {
      const savedData = JSON.parse(localStorage.getItem("userProfile")) || {};
      const updatedProfile = {
        ...savedData, // mantém banner, data, etc.
        avatar,
        name,
        username,
        bio,
        memberSince,
      };

      localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
      alert("Perfil atualizado com sucesso!");
      window.location.href = "/profile";
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      alert("Falha ao salvar perfil (localStorage).");
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
          <label>Nome</label>
          <input
            type="text"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Usuário</label>
          <input
            type="text"
            placeholder="@usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Biografia</label>
          <textarea
            rows="3"
            placeholder="Fale um pouco sobre você..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div className="member-info">
          <p>{memberSince}</p>
        </div>

        <div className="buttons">
          <button type="submit" className="btn-save">
            Salvar Alterações
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

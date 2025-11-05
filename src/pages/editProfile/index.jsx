"use client"

import { useState } from "react"
import "./EditProfile.css"
import defaultAvatar from "../../assets/host_luana.jpeg"

const EditProfile = () => {
  const [avatar, setAvatar] = useState(defaultAvatar)
  const [name, setName] = useState("Clara Santos")
  const [username, setUsername] = useState("@clara.santt")
  const [bio, setBio] = useState("Apaixonado por música brasileira e internacional.")
  const [memberSince] = useState("Membro desde jan 2024")

  // Função de upload da imagem
  const handleAvatarChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setAvatar(imageUrl)
    }
  }

  const handleSave = (e) => {
    e.preventDefault()
    alert("Perfil atualizado com sucesso!")
  }

  return (
    <div className="edit-profile-container">
      <div className="edit-header">
        <h1>Editar Perfil</h1>
        <p>Atualize suas informações pessoais e imagem de perfil</p>
      </div>

      <form onSubmit={handleSave} className="edit-form">
        {/* Avatar */}
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

        {/* Informações */}
        <div className="input-group">
          <label>Nome</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="input-group">
          <label>Usuário</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className="input-group">
          <label>Biografia</label>
          <textarea rows="3" value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>

        <div className="member-info">
          <p>{memberSince}</p>
        </div>

        <div className="buttons">
          <button type="submit" className="btn-save">Salvar Alterações</button>
          <button type="button" className="btn-cancel" onClick={() => window.history.back()}>Cancelar</button>
        </div>
      </form>
    </div>
  )
}

export default EditProfile

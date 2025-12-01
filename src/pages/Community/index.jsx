 import { useState, useEffect } from "react";
import "./Community.css";
import {
  LuHeart,
  LuMessageCircle,
  LuShare2,
  LuPlay,
  LuPlus,
  LuSearch,
  LuStar,
  LuTrendingUp,
  LuMusic,
  LuUsers,
  LuCalendar,
  LuChevronRight,
  LuSend,
  LuTrash2,
  LuPencil,
} from "react-icons/lu";

const API_BASE = "http://localhost:3000/comments";

// GET comentários da comunidade
async function getComentarios(comunidadeId) {
  const res = await fetch(`${API_BASE}/comunidade/${comunidadeId}`);
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Erro ao buscar comentários: ${res.status} ${txt}`);
  }
  return res.json();
}

// POST criar comentário
async function criarComentario(texto, comunidadeId) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      texto: texto,
      comunidade_id: comunidadeId,
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Erro ao criar comentário (${res.status})`);
  }

  return res.json();
}

// PUT editar comentário
async function editarComentarioAPI(id, novoTexto) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ texto: novoTexto }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Erro ao editar comentário (${res.status})`);
  }

  return res.json();
}

// DELETE excluir comentário
async function excluirComentarioAPI(id) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Erro ao excluir comentário (${res.status})`);
  }

  return res.json();
}

const Communities = () => {
  const [likedPosts, setLikedPosts] = useState({});
  const [playing, setPlaying] = useState(null);
  const [activeTab, setActiveTab] = useState("recentes");
  const [newComment, setNewComment] = useState({}); // {postId: commentText}
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "João Santos",
      avatar: "🎸",
      time: "1h",
      type: "music",
      title: "Metamorfose",
      artist: "Banda Alternativa",
      cover: "🔥",
      likes: 23,
      comments: 8,
      commentsList: [],
    },
    {
      id: 2,
      user: "Maria Silva",
      avatar: "🎤",
      time: "2h",
      type: "text",
      content:
        "Qual foi o último show que vocês foram que mudou completamente sua perspectiva musical?",
      likes: 45,
      comments: 12,
      commentsList: [],
    },
    {
      id: 3,
      user: "MPB & Samba",
      avatar: "🥁",
      time: "3h",
      type: "event",
      title: "Roda de Samba Virtual – Quinta-feira às 20h",
      description:
        "Vamos nos reunir para uma roda de samba especial com participação do sambista João de Volta! Tragam seus instrumentos e vozes para uma noite inesquecível.",
      date: "Quinta, 29 Ago",
      participants: 47,
      likes: 15,
      comments: 5,
      commentsList: [],
    },
  ]);

  const [editingComment, setEditingComment] = useState(null);
  const [editingText, setEditingText] = useState("");

  const usuarioLogado = JSON.parse(localStorage.getItem("user") || "null");

  // 🔥 FUNÇÃO DE TEMPO RELATIVO
  const formatDate = (iso) => {
    try {
      const d = new Date(iso);
      const agora = new Date();
      const diff = (agora - d) / 1000; // segundos

      if (diff < 60) return "agora mesmo";
      if (diff < 3600) return `há ${Math.floor(diff / 60)} min`;
      if (diff < 86400) return `há ${Math.floor(diff / 3600)} h`;
      if (diff < 2592000) return `há ${Math.floor(diff / 86400)} dias`;
      if (diff < 31536000) return `há ${Math.floor(diff / 2592000)} meses`;

      return `há ${Math.floor(diff / 31536000)} anos`;
    } catch {
      return iso;
    }
  };

  // CARREGAR COMENTÁRIOS
  useEffect(() => {
    async function carregar() {
      try {
        const comentarios = await getComentarios(1);

        setPosts((prev) =>
          prev.map((post) => {
            const filtrados = comentarios.filter(
              (c) => c.comunidade_id === post.id
            );
            return {
              ...post,
              commentsList: filtrados,
              comments: filtrados.length,
            };
          })
        );
      } catch (err) {
        console.error("Erro ao carregar comentários:", err);
      }
    }
    carregar();
  }, []);

  const toggleLike = (id) => {
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const togglePlay = (id) => {
    setPlaying(playing === id ? null : id);
  };

  const handleCommentChange = (postId, text) => {
    setNewComment((prev) => ({ ...prev, [postId]: text }));
  };

  const submitComment = async (postId) => {
    const texto = (newComment[postId] || "").trim();
    if (!texto) return;

    try {
      const novo = await criarComentario(texto, postId);

      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? {
                ...post,
                commentsList: [...post.commentsList, novo],
                comments: post.comments + 1,
              }
            : post
        )
      );

      setNewComment((prev) => ({ ...prev, [postId]: "" }));
    } catch (err) {
      console.error("Erro ao criar comentário:", err);
      alert(err.message || "Não foi possível criar o comentário");
    }
  };

  const deleteComment = async (postId, commentId) => {
    if (!confirm("Deseja realmente excluir este comentário?")) return;

    try {
      await excluirComentarioAPI(commentId);

      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? {
                ...post,
                commentsList: post.commentsList.filter(
                  (c) => c.id !== commentId
                ),
                comments: Math.max(0, post.comments - 1),
              }
            : post
        )
      );
    } catch (err) {
      console.error("Erro ao excluir comentário:", err);
      alert(err.message || "Não foi possível excluir o comentário");
    }
  };

  const startEditing = (comment) => {
    setEditingComment(comment.id);
    setEditingText(comment.conteudo);
  };

  const saveEdit = async (postId, commentId) => {
    const texto = (editingText || "").trim();
    if (!texto) return;

    try {
      const atualizado = await editarComentarioAPI(commentId, texto);

      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? {
                ...post,
                commentsList: post.commentsList.map((c) =>
                  c.id === commentId ? atualizado : c
                ),
              }
            : post
        )
      );

      setEditingComment(null);
      setEditingText("");
    } catch (err) {
      console.error("Erro ao editar:", err);
      alert(err.message || "Erro ao editar comentário.");
    }
  };

  const filteredPosts = posts.filter((post) =>
    activeTab === "populares" ? post.likes > 30 : true
  );

  const communities = [
    { id: 1, name: "Rock Brasileiro", icon: "🎸", members: "12.5K membros" },
    { id: 2, name: "Indie & Alternativo", icon: "🌙", members: "8.2K membros" },
    { id: 3, name: "MPB & Samba", icon: "🎶", members: "11.3K membros" },
  ];

  const discoverCommunities = [
    {
      name: "Eletrônica Brasil",
      icon: "🎧",
      description:
        "Sons eletrônicos, techno, ambiente e a cena eletrônica brasileira",
    },
    {
      name: "Hip Hop Nacional",
      icon: "🎤",
      description: "Rap, trap e toda a cultura hip hop brasileira",
    },
  ];

  const trending = [
    "#NovoAlbumCaetano",
    "#RockInRio2025",
    "#IndieDescoberta",
    "#SambaModerno",
  ];

  return (
    <div className="communitiesPageContainer">
      {/* Header */}
      <div className="communitiesHeader">
        <div className="headerBackground">
          <div className="bgBlob bgBlob1"></div>
          <div className="bgBlob bgBlob2"></div>
          <div className="bgBlob bgBlob3"></div>
        </div>
        <div className="headerContent">
          <div className="headerInfo">
            <h1 className="headerTitle gradientText">
              Suas Comunidades Musicais
            </h1>
            <p className="headerDescription">
              Conecte-se com pessoas apaixonadas pelos mesmos sons que você.
              Descubra, discuta e compartilhe músicas em comunidades vibrantes.
            </p>
          </div>
          <div className="headerActions ctaButtons">
            <button className="btn btnPrimary">
              <LuPlus size={18} /> Criar Nova Comunidade
            </button>
            <button className="btn btnSecondary">
              <LuSearch size={18} /> Explorar Comunidades
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="communitiesContent">
        {/* Lado Esquerdo - Feed */}
        <div className="contentLeft">
          <section className="feedSection">
            <div className="sectionHeader">
              <h2 className="sectionTitleLeft">
                <LuMusic size={24} /> Feed das Comunidades
              </h2>
              <div className="feedTabs categoryTabs">
                <button
                  className={`categoryTab ${
                    activeTab === "recentes" ? "categoryTabActive" : ""
                  }`}
                  onClick={() => setActiveTab("recentes")}
                >
                  Recentes
                </button>
                <button
                  className={`categoryTab ${
                    activeTab === "populares" ? "categoryTabActive" : ""
                  }`}
                  onClick={() => setActiveTab("populares")}
                >
                  Populares
                </button>
              </div>
            </div>
            <div className="posts featuredGrid">
              {filteredPosts.map((post) => (
                <div key={post.id} className="postCard featuredCard">
                  <div className="cardGradient gradientBluePurple"></div>
                  <div className="postHeader cardHeader">
                    <div className="userInfo hostInfo">
                      <span className="avatar hostAvatar">{post.avatar}</span>
                      <div className="hostDetails">
                        <strong className="hostName">{post.user}</strong>
                        <span className="time hostLabel"> · {post.time}</span>
                      </div>
                    </div>
                  </div>

                  {post.type === "music" && (
                    <div className="musicPlayer currentTrack">
                      <div className="trackInfo">
                        <div className="musicCover trackIcon">{post.cover}</div>
                        <div className="musicInfo trackDetails">
                          <h4 className="trackSong">{post.title}</h4>
                          <p className="trackArtist">{post.artist}</p>
                        </div>
                        <button
                          className="playBtn"
                          onClick={() => togglePlay(post.id)}
                        >
                          <LuPlay
                            size={20}
                            fill={playing === post.id ? "white" : "none"}
                          />
                        </button>
                      </div>
                    </div>
                  )}

                  {post.type === "text" && (
                    <div className="postContent cardDescription">
                      <p>{post.content}</p>
                    </div>
                  )}

                  {post.type === "event" && (
                    <div className="eventCard">
                      <h4 className="cardTitle">{post.title}</h4>
                      <p className="cardDescription">{post.description}</p>
                      <div className="eventMeta cardFooter">
                        <span>
                          <LuCalendar size={14} /> {post.date}
                        </span>
                        <span>
                          <LuUsers size={14} /> {post.participants} confirmados
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Comments Section */}
                  <div className="commentsSection">
                    <div className="commentsList">
                      {post.commentsList.length === 0 && (
                        <div className="commentItem">
                          Seja o primeiro a comentar.
                        </div>
                      )}

                      {post.commentsList.map((comment) => (
                        <div key={comment.id} className="commentItem">
                          <div className="commentHeader">
                            <strong>
                              {comment.user?.username ||
                                "Usuário #" + comment.user_id}
                            </strong>
                            <span> · {formatDate(comment.created_at)}</span>

                            {usuarioLogado?.id === comment.user_id && (
                              <>
                                <button
                                  className="deleteCommentBtn"
                                  onClick={() => startEditing(comment)}
                                  title="Editar"
                                >
                                  <LuPencil size={14} />
                                </button>

                                <button
                                  className="deleteCommentBtn"
                                  onClick={() =>
                                    deleteComment(post.id, comment.id)
                                  }
                                  title="Excluir"
                                >
                                  <LuTrash2 size={14} />
                                </button>
                              </>
                            )}
                          </div>

                          {editingComment === comment.id ? (
                            <div className="editContainer">
                              <input
                                className="commentInput"
                                value={editingText}
                                onChange={(e) => setEditingText(e.target.value)}
                                onKeyDown={(e) =>
                                  e.key === "Enter" &&
                                  saveEdit(post.id, comment.id)
                                }
                                autoFocus
                              />
                              <button
                                className="submitCommentBtn"
                                onClick={() => saveEdit(post.id, comment.id)}
                              >
                                Salvar
                              </button>
                              <button
                                className="deleteCommentBtn"
                                onClick={() => setEditingComment(null)}
                              >
                                Cancelar
                              </button>
                            </div>
                          ) : (
                            <p className="commentText">{comment.conteudo}</p>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="newCommentInput">
                      <input
                        type="text"
                        placeholder="Adicione um comentário..."
                        value={newComment[post.id] || ""}
                        onChange={(e) =>
                          handleCommentChange(post.id, e.target.value)
                        }
                        onKeyDown={(e) =>
                          e.key === "Enter" && submitComment(post.id)
                        }
                        className="commentInput"
                      />
                      <button
                        className="submitCommentBtn"
                        onClick={() => submitComment(post.id)}
                      >
                        <LuSend size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="postActions cardFooter">
                    <div className="actionsLeft">
                      <button
                        className={`actionBtn heartIcon ${
                          likedPosts[post.id] ? "heartHovered" : ""
                        }`}
                        onClick={() => toggleLike(post.id)}
                      >
                        <LuHeart
                          size={18}
                          fill={likedPosts[post.id] ? "#ff4444" : "none"}
                        />
                        <span>
                          {(Number(post.likes) || 0) +
                            (likedPosts[post.id] ? 1 : 0)}
                        </span>
                      </button>
                      <button className="actionBtn">
                        <LuMessageCircle size={18} />
                        <span>{post.comments}</span>
                      </button>
                      <button className="actionBtn">
                        <LuShare2 size={18} />
                      </button>
                    </div>
                    {post.type === "event" && (
                      <div className="eventButtons">
                        <button className="btnParticipate enterBtn gradientBluePurple">
                          Participar
                        </button>
                        <button className="btnListen enterBtn gradientPurplePink">
                          <LuMusic size={16} /> Escutar ao Vivo
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="loadMoreContainer">
              <button className="loadMore loadMoreBtn">
                Carregar Mais Posts
              </button>
            </div>
          </section>
        </div>

        {/* Lado Direito - Sidebar */}
        <div className="contentRight">
          {/* Minhas Comunidades */}
          <section className="sidebarSection categorySection">
            <h3 className="sectionTitle">
              <LuUsers size={20} /> Minhas Comunidades
            </h3>
            <div className="categoryGrid">
              {communities.map((c) => (
                <div key={c.id} className="communityItem categoryCard">
                  <span className="communityIcon categoryCardHeader">
                    {c.icon}
                  </span>
                  <div>
                    <div className="communityName categoryCardTitle">
                      {c.name}
                    </div>
                    <div className="communityMembers categoryCardDescription">
                      {c.members}
                    </div>
                  </div>
                  <LuChevronRight size={16} />
                </div>
              ))}
            </div>
            <button className="viewAll viewAllBtn">Ver Todas</button>
          </section>

          {/* Descubra Comunidades */}
          <section className="sidebarSection discoverSection">
            <h3 className="sectionTitleDiscover">
              <LuSearch size={20} /> Descubra Comunidades
            </h3>
            {discoverCommunities.map((dc, i) => (
              <div key={i} className="discoverItem categoryCard">
                <div className="discoverHeader">
                  <div className="discoverIcon">{dc.icon}</div>
                  <div className="discoverText">
                    <div className="categoryCardTitle">{dc.name}</div>
                    <div className="categoryCardDescription">
                      {dc.description}
                    </div>
                  </div>
                </div>
                <button className="joinBtn categoryEnterBtn">Entrar</button>
              </div>
            ))}
          </section>

          {/* Tópicos em Alta */}
          <section className="sidebarSection trendingSection">
            <h3 className="sectionTitle">
              <LuTrendingUp size={20} /> Tópicos em Alta
            </h3>
            <div className="trendingList">
              {trending.map((topic, i) => (
                <div key={i} className="trendingItem">
                  <LuTrendingUp size={14} />
                  <span>{topic}</span>
                  <span className="postsCount">
                    {Math.floor(Math.random() * 1000) + 100} posts
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Desafio da Semana */}
          <section className="challengeSection featureCard">
            <div className="challengeHeader">
              <LuStar size={20} />
              <h3 className="featureTitle">Desafio da Semana</h3>
            </div>
            <p className="featureDescription">
              Compartilhe uma música que representa seu estado emocional atual
            </p>
            <button className="btnChallenge enterBtn gradientCyanBlue">
              Participar
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Communities;
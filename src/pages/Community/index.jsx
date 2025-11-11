import { useState } from "react";
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
} from "react-icons/lu";

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
      commentsList: [
        { id: 1, user: "Ana Oliveira", text: "Essa música é incrível! Me transporta para outro mundo.", time: "30min" },
      ],
    },
    {
      id: 2,
      user: "Maria Silva",
      avatar: "🎤",
      time: "2h",
      type: "text",
      content: "Qual foi o último show que vocês foram que mudou completamente sua perspectiva musical?",
      likes: 45,
      comments: 12,
      commentsList: [
        { id: 3, user: "Lucas Ferreira", text: "O show do Tash Sultana no Rock in Rio 2019. Nunca tinha ouvido nada igual!", time: "1h" },
      ],
    },
    {
      id: 3,
      user: "MPB & Samba",
      avatar: "🥁",
      time: "3h",
      type: "event",
      title: "Roda de Samba Virtual – Quinta-feira às 20h",
      description: "Vamos nos reunir para uma roda de samba especial com participação do sambista João de Volta! Tragam seus instrumentos e vozes para uma noite inesquecível.",
      date: "Quinta, 29 Ago",
      participants: 47,
      likes: 15,
      comments: 5,
      commentsList: [
        { id: 5, user: "Ricardo Lima", text: "Mal posso esperar! Vou levar meu cavaquinho.", time: "2h" },
      ],
    },
  ]);

  const toggleLike = (id) => {
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const togglePlay = (id) => {
    setPlaying(playing === id ? null : id);
  };

  const handleCommentChange = (postId, text) => {
    setNewComment((prev) => ({ ...prev, [postId]: text }));
  };

  const submitComment = (postId) => {
    const text = newComment[postId]?.trim();
    if (!text) return;

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments + 1,
              commentsList: [
                ...post.commentsList,
                {
                  id: Date.now(),
                  user: "Você", // Simulate current user
                  text,
                  time: "Agora",
                },
              ],
            }
          : post
      )
    );
    setNewComment((prev) => ({ ...prev, [postId]: "" }));
  };

  const deleteComment = (postId, commentId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: Math.max(0, post.comments - 1),
              commentsList: post.commentsList.filter((c) => c.id !== commentId),
            }
          : post
      )
    );
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
    { name: "Eletrônica Brasil", icon: "🎧", description: "Sons eletrônicos, techno, ambiente e a cena eletrônica brasileira" },
    { name: "Hip Hop Nacional", icon: "🎤", description: "Rap, trap e toda a cultura hip hop brasileira" },
  ];

  const trending = ["#NovoAlbumCaetano", "#RockInRio2025", "#IndieDescoberta", "#SambaModerno"];

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
            <h1 className="headerTitle gradientText">Suas Comunidades Musicais</h1>
            <p className="headerDescription">
              Conecte-se com pessoas apaixonadas pelos mesmos sons que você. Descubra, discuta e compartilhe músicas em comunidades vibrantes.
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
                  className={`categoryTab ${activeTab === "recentes" ? "categoryTabActive" : ""}`}
                  onClick={() => setActiveTab("recentes")}
                >
                  Recentes
                </button>
                <button
                  className={`categoryTab ${activeTab === "populares" ? "categoryTabActive" : ""}`}
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
                        <button className="playBtn" onClick={() => togglePlay(post.id)}>
                          <LuPlay size={20} fill={playing === post.id ? "white" : "none"} />
                        </button>
                      </div>
                    </div>
                  )}

                  {post.type === "text" && (
                    <div className="postContent cardDescription">
                      <p>{post.content}</p>
                      {post.commentsList.slice(0, 1).map((comment) => (
                        <div key={comment.id} className="reply commentItem">
                          <strong className="commentUser">{comment.user}</strong>: {comment.text}
                          <span className="commentTime"> · {comment.time}</span>
                        </div>
                      ))}
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

                  {/* Comments Input - Hidden in prototype, but functional */}
                  <div className="commentsSection">
                    <div className="commentsList">
                      {post.commentsList.slice(1).map((comment) => (
                        <div key={comment.id} className="commentItem">
                          <div className="commentHeader">
                            <strong className="commentUser">{comment.user}</strong>
                            <span className="commentTime"> · {comment.time}</span>
                            {comment.user === "Você" && (
                              <button
                                className="deleteCommentBtn"
                                onClick={() => deleteComment(post.id, comment.id)}
                              >
                                <LuTrash2 size={14} />
                              </button>
                            )}
                          </div>
                          <p className="commentText">{comment.text}</p>
                        </div>
                      ))}
                    </div>
                    <div className="newCommentInput">
                      <input
                        type="text"
                        placeholder="Adicione um comentário..."
                        value={newComment[post.id] || ""}
                        onChange={(e) => handleCommentChange(post.id, e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && submitComment(post.id)}
                        className="commentInput"
                      />
                      <button className="submitCommentBtn" onClick={() => submitComment(post.id)}>
                        <LuSend size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="postActions cardFooter">
                    <div className="actionsLeft">
                      <button
                        className={`actionBtn heartIcon ${likedPosts[post.id] ? "heartHovered" : ""}`}
                        onClick={() => toggleLike(post.id)}
                      >
                        <LuHeart size={18} fill={likedPosts[post.id] ? "#ff4444" : "none"} />
                        <span>{(Number(post.likes) || 0) + (likedPosts[post.id] ? 1 : 0)}</span>
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
                        <button className="btnParticipate enterBtn gradientBluePurple">Participar</button>
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
              <button className="loadMore loadMoreBtn">Carregar Mais Posts</button>
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
                  <span className="communityIcon categoryCardHeader">{c.icon}</span>
                  <div>
                    <div className="communityName categoryCardTitle">{c.name}</div>
                    <div className="communityMembers categoryCardDescription">{c.members}</div>
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
                    <div className="categoryCardDescription">{dc.description}</div>
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
                  <span className="postsCount">{Math.floor(Math.random() * 1000) + 100} posts</span>
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
            <p className="featureDescription">Compartilhe uma música que representa seu estado emocional atual</p>
            <button className="btnChallenge enterBtn gradientCyanBlue">Participar</button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Communities;
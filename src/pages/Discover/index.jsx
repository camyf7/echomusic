import "./Discover.css";
import React, { useState } from "react";
import { usePlayer } from "../../contexts/PlayerContext"; // 👈 Import do contexto global
import { HiLightBulb } from "react-icons/hi";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { LuMoon, LuDumbbell, LuPiano } from "react-icons/lu";
import { FcLike } from "react-icons/fc";
import { FaComment, FaHeadphonesAlt, FaUserFriends } from "react-icons/fa";
import { GiGuitar, GiSoundWaves } from "react-icons/gi";
import { LiaGuitarSolid } from "react-icons/lia";
import { FiPlus } from "react-icons/fi";
import { IoMdPlay, IoMdPause } from "react-icons/io";

// imagens
import usuario1 from "../../assets/usuario_larissa.png";
import usuario2 from "../../assets/usario_felipe.png";
import usuario3 from "../../assets/usario_mariana.png";
import musica1 from "../../assets/musica_starboy.png";
import musica2 from "../../assets/musica_adventure.png";
import musica3 from "../../assets/musica_miracle.png";
import musica4 from "../../assets/musica_2much.png";
import musica5 from "../../assets/musica_good.jpg";
import musica6 from "../../assets/musica_heat.png";
import musica7 from "../../assets/musica_levitating.png";
import musica8 from "../../assets/musica_harrystyles.png";
import musica9 from "../../assets/musica_die.png";
import musica10 from "../../assets/musica_papoulas.png";

export default function Discover() {
  const [recommendedSongs, setRecommendedSongs] = useState([
    { id: 1, img: musica5, title: "Good 4 U", artist: "Olivia Rodrigo", likes: 163, friends: 7 },
    { id: 2, img: musica7, title: "Levitating", artist: "Dua Lipa", likes: 203, friends: 7 },
    { id: 3, img: musica4, title: "2 Much", artist: "Justin Bieber", likes: 504, friends: 10 },
    { id: 4, img: musica6, title: "Heat Waves", artist: "Glass Animals", likes: 308, friends: 5 },
  ]);

  // 🎧 Usa o player global
  const { isPlaying, currentTrack, playTrack } = usePlayer();

  const handlePlay = (songKey) => {
    playTrack(songKey); // troca ou pausa a música
  };

  const updateRecommendations = () => {
    const shuffled = [...recommendedSongs].sort(() => Math.random() - 0.5);
    setRecommendedSongs(shuffled);
  };

  return (
    <>
      {/* Seção Descubra */}
      <section className="discover">
        <h2>Descubra Sua Próxima Música Favorita</h2>
        <div className="discover-grid">
          <div className="discover-card foco">
            <div className="discover-icon icon-foco">
              <HiLightBulb size={28} />
            </div>
            <h3>Foco</h3>
            <p>Música para concentração e produtividade.</p>
          </div>
          <div className="discover-card festa">
            <div className="discover-icon icon-festa">
              <IoMusicalNotesOutline size={28} />
            </div>
            <h3>Festa</h3>
            <p>Hits para animar qualquer ambiente.</p>
          </div>
          <div className="discover-card relaxar">
            <div className="discover-icon icon-relaxar">
              <LuMoon size={28} />
            </div>
            <h3>Relaxar</h3>
            <p>Sons suaves para momentos de paz.</p>
          </div>
          <div className="discover-card treino">
            <div className="discover-icon icon-treino">
              <LuDumbbell size={28} />
            </div>
            <h3>Treino</h3>
            <p>Energia para seus exercícios</p>
          </div>
        </div>
      </section>

      {/* Amigos ouvindo */}
      <section className="friends">
        <h2>Amigos Estão Ouvindo</h2>
        <div className="friends-grid">
          {/* STARBOY */}
          <div className="friend-card">
            <div className="friend-header">
              <div className="friend-profile">
                <img src={usuario1} alt="Larissa Moretti" />
                <div>
                  <h3>Larissa Moretti</h3>
                  <p>há 2 minutos</p>
                </div>
              </div>
              <span className="online-dot"></span>
            </div>

            <div className="song-info">
              <img src={musica1} alt="Starboy" className="song-cover" />
              <div className="song-details">
                <h4>Starboy</h4>
                <p>The Weeknd</p>
              </div>
            </div>

            <div className="song-actions">
              <div className="song-stats">
                <span><FcLike /> 23</span>
                <span><FaComment /> 5</span>
              </div>
              <button className="listen-btn" onClick={() => handlePlay("starboy")}>
                {isPlaying && currentTrack?.title === "Starboy" ? <IoMdPause /> : <IoMdPlay />} Ouvir
              </button>
            </div>
          </div>

          {/* ADVENTURE */}
          <div className="friend-card">
            <div className="friend-header">
              <div className="friend-profile">
                <img src={usuario2} alt="Felipe Barros" />
                <div>
                  <h3>Felipe Barros</h3>
                  <p>há 5 minutos</p>
                </div>
              </div>
            </div>

            <div className="song-info">
              <img src={musica2} alt="Adventure of a Lifetime" className="song-cover" />
              <div className="song-details">
                <h4>Adventure of a Lifetime</h4>
                <p>Coldplay</p>
              </div>
            </div>

            <div className="song-actions">
              <div className="song-stats">
                <span><FcLike /> 45</span>
                <span><FaComment /> 12</span>
              </div>
              <button className="listen-btn" onClick={() => handlePlay("adventure")}>
                {isPlaying && currentTrack?.title === "Adventure of a Lifetime" ? <IoMdPause /> : <IoMdPlay />} Ouvir
              </button>
            </div>
          </div>

          {/* MIRACLE */}
          <div className="friend-card">
            <div className="friend-header">
              <div className="friend-profile">
                <img src={usuario3} alt="Mariana Duarte" />
                <div>
                  <h3>Mariana Duarte</h3>
                  <p>há 12 minutos</p>
                </div>
              </div>
            </div>

            <div className="song-info">
              <img src={musica3} alt="Miracle" className="song-cover" />
              <div className="song-details">
                <h4>Miracle</h4>
                <p>The Score</p>
              </div>
            </div>

            <div className="song-actions">
              <div className="song-stats">
                <span><FcLike /> 45</span>
                <span><FaComment /> 12</span>
              </div>
              <button className="listen-btn" onClick={() => handlePlay("miracle")}>
                {isPlaying && currentTrack?.title === "Miracle" ? <IoMdPause /> : <IoMdPlay />} Ouvir
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gêneros */}
      <section className="generos">
        <h2>Explorar Gêneros</h2>
        <div className="generos-grid">
          <div className="genero-card rock"><div className="genero-icone-bg bg-rock"><GiGuitar size={24} /></div><h3>Rock</h3><p>2.3K ouvindo</p></div>
          <div className="genero-card pop"><div className="genero-icone-bg bg-pop"><FaHeadphonesAlt size={24} /></div><h3>Pop</h3><p>4.1K ouvindo</p></div>
          <div className="genero-card hiphop"><div className="genero-icone-bg bg-hiphop"><IoMdPlay size={24} /></div><h3>Hip Hop</h3><p>1.8K ouvindo</p></div>
          <div className="genero-card eletronica"><div className="genero-icone-bg bg-eletronica"><GiSoundWaves size={24} /></div><h3>Eletrônica</h3><p>3.2K ouvindo</p></div>
          <div className="genero-card jazz"><div className="genero-icone-bg bg-jazz"><LuPiano size={24} /></div><h3>Jazz</h3><p>882 ouvindo</p></div>
          <div className="genero-card mpb"><div className="genero-icone-bg bg-mpb"><LiaGuitarSolid size={24} /></div><h3>MPB</h3><p>1.5K ouvindo</p></div>
        </div>
      </section>

      {/* Recomendado */}
      <section className="recomendado">
        <div className="recomendado-header">
          <div>
            <h2>Recomendado Para Você</h2>
            <p>Baseado no seu gosto e atividade dos amigos</p>
          </div>
          <button className="btn-atualizar" onClick={updateRecommendations}>Atualizar</button>
        </div>

        <div className="recomendado-grid">
          {recommendedSongs.map((song) => (
            <div key={song.id} className="recomendado-card">
              <img src={song.img} alt={`${song.title} - ${song.artist}`} className="recomendado-img" />
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
              <div className="recomendado-info">
                <span><FcLike /> {song.likes}</span>
                <span><FaUserFriends /> {song.friends} amigos</span>
                <FiPlus className="add-icon" onClick={() => console.log(`Adicionando ${song.title}`)} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Em alta */}
      <section className="em-alta">
        <div className="em-alta-header">
          <h2>Em Alta Agora</h2>
          <div className="em-alta-buttons">
            <button className="btn-hoje">Hoje</button>
            <a href="#" className="ver-top">Ver Top 50</a>
          </div>
        </div>

        <div className="em-alta-lista">
          <div className="em-alta-item">
            <span className="ranking">1</span>
            <img src={musica8} alt="As It Was" className="em-alta-img" />
            <div className="em-alta-info">
              <h3>As It Was</h3>
              <p>Harry Styles</p>
            </div>
            <div className="em-alta-stats">
              <span><FcLike /> 2.3K</span>
              <span><FaComment /> 456</span>
              <span><IoMdPlay /> 1.2K</span>
              <span className="tempo">3:47</span>
            </div>
          </div>

          <div className="em-alta-item">
            <span className="ranking">2</span>
            <img src={musica9} alt="Die For You" className="em-alta-img" />
            <div className="em-alta-info">
              <h3>Die for You</h3>
              <p>Ariana Grande & The Weeknd</p>
            </div>
            <div className="em-alta-stats">
              <span><FcLike /> 4.5K</span>
              <span><FaComment /> 1006</span>
              <span><IoMdPlay /> 12.3K</span>
              <span className="tempo">3:57</span>
            </div>
          </div>

          <div className="em-alta-item">
            <span className="ranking">3</span>
            <img src={musica10} alt="Papoulas" className="em-alta-img" />
            <div className="em-alta-info">
              <h3>Papoulas</h3>
              <p>Yago Opróprio</p>
            </div>
            <div className="em-alta-stats">
              <span><FcLike /> 8.4K</span>
              <span><FaComment /> 306</span>
              <span><IoMdPlay /> 11.3K</span>
              <span className="tempo">3:23</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

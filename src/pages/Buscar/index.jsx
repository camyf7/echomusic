import React, { useEffect, useState } from "react";
import "./Buscar.css";
import { IoMdPlay, IoMdPause, IoMdHeartEmpty } from "react-icons/io";
import { MdPlaylistAdd } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { usePlayer } from "../../contexts/PlayerContext";

export default function Buscar() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("q") || location.state?.query || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const { playTrack, currentTrackIndex, isPlaying, setPlaylistTracks } = usePlayer();

  const backend = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // Normaliza tracks do backend
  const normalizeForPlayer = (tracks) =>
    tracks.map((t, index) => ({
      id: t.id,
      title: t.title,
      artist: t.artist,
      album: t.album,
      src: t.audio_url.startsWith("http") ? t.audio_url : `${backend}${t.audio_url}`,
      cover: t.cover.startsWith("http") ? t.cover : `${backend}${t.cover}`,
      number: index + 1,
    }));

  useEffect(() => {
    const fetchResults = async () => {
      if (!searchTerm.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`${backend}/tracks/search?q=${encodeURIComponent(searchTerm)}`);
        if (!response.ok) {
          console.error("HTTP Error:", response.status);
          setResults([]);
          return;
        }
        const data = await response.json();
        setResults(data);

        if (data.length > 0) {
          const normalized = normalizeForPlayer(data);
          setPlaylistTracks(normalized, 0); // só prepara a playlist
        }
      } catch (err) {
        console.error("Erro ao buscar:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchTerm]);

  const handlePlay = (index) => {
    playTrack(index); // toca ou dá toggle
  };

  return (
    <div className="search-page">
      <h1 className="search-title">
        Resultados para: <span className="highlight">"{searchTerm}"</span>
      </h1>

      {loading ? (
        <p>Carregando...</p>
      ) : results.length === 0 ? (
        <p>Nenhuma música encontrada.</p>
      ) : (
        <div className="search-results">
          <div className="sr-header">
            <div>#</div>
            <div>Título</div>
            <div>Artista</div>
            <div>Álbum</div>
            <div></div>
          </div>

          {results.map((track, index) => (
            <div
              key={track.id}
              className={`sr-item ${currentTrackIndex === index ? "playing" : ""}`}
            >
              <div className="sr-number" onClick={() => handlePlay(index)}>
                {currentTrackIndex === index && isPlaying ? <IoMdPause /> : <IoMdPlay />}
              </div>

              <div className="sr-title-info" onClick={() => handlePlay(index)}>
                <img
                  src={track.cover.startsWith("http") ? track.cover : `${backend}${track.cover}`}
                  alt={track.title}
                  className="sr-cover"
                />
                <div className="sr-details">
                  <h4>{track.title}</h4>
                  <p>{track.artist}</p>
                </div>
              </div>

              <div className="sr-artist">{track.artist}</div>
              <div className="sr-album">{track.album}</div>

              <div className="sr-actions">
                <IoMdHeartEmpty />
                <MdPlaylistAdd />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
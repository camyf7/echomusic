import React, { useEffect, useState } from "react";
import "./Buscar.css";
import { IoMdPlay, IoMdPause, IoMdHeartEmpty } from "react-icons/io";
import { MdPlaylistAdd } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { usePlayer } from "../../contexts/PlayerContext";

export default function Buscar() {
  const location = useLocation();
  
  // Suporta busca tanto por query params (?q=termo) quanto por state do navigate
  const queryParams = new URLSearchParams(location.search);
  const searchTermFromUrl = queryParams.get("q") || "";
  const searchTermFromState = location.state?.query || "";
  const resultsFromState = location.state?.results || null;
  
  const searchTerm = searchTermFromUrl || searchTermFromState;

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const { playTrack, currentTrackIndex, isPlaying, setIsPlaying, setPlaylistTracks } = usePlayer();

  useEffect(() => {
    // Se veio com resultados do state (do Topo.jsx), usa direto
    if (resultsFromState) {
      console.log("✅ Usando resultados do state:", resultsFromState);
      setResults(resultsFromState || []);
      
      // Configura o player
      setPlaylistTracks(
        (resultsFromState || []).map((track, i) => ({
          ...track,
          id: track.id || i,
          number: i + 1,
          album: track.album || "Resultado da Busca",
          cover: track.cover || "/default-cover.jpg",
        })),
        0
      );
      
      setLoading(false);
      return;
    }

    // Senão, faz a busca na API
    const fetchResults = async () => {
      if (!searchTerm || searchTerm.trim() === "") {
        setResults([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log("🔎 Buscando:", searchTerm);
        
        const backend = import.meta.env.VITE_API_URL || "http://localhost:3000";
        const url = `${backend}/music/search?q=${encodeURIComponent(searchTerm)}`;
        
        console.log("🌐 URL:", url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
          console.error("❌ Erro HTTP:", response.status);
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("📦 Dados recebidos:", data);
        console.log("📊 Total de resultados:", data?.length || 0);

        // Verifica se data é um array válido
        if (!Array.isArray(data)) {
          console.warn("⚠️ Resposta não é um array:", data);
          setResults([]);
          setLoading(false);
          return;
        }

        setResults(data);

        // Configura o player com os resultados
        if (data.length > 0) {
          setPlaylistTracks(
            data.map((track, i) => ({
              ...track,
              id: track.id || i,
              number: i + 1,
              album: track.album || "Resultado da Busca",
              cover: track.cover || "/default-cover.jpg",
            })),
            0
          );
        }
      } catch (err) {
        console.error("❌ Erro ao buscar músicas:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchTerm, resultsFromState]);

  const handlePlay = (index) => {
    if (index === currentTrackIndex) {
      setIsPlaying(!isPlaying);
    } else {
      playTrack(index);
    }
  };

  return (
    <div className="search-page">
      <h1 className="search-title">
        Resultados para: <span className="highlight">"{searchTerm}"</span>
      </h1>

      {loading ? (
        <p className="search-loading">Carregando...</p>
      ) : results.length === 0 ? (
        <div className="search-empty-container">
          <p className="search-empty">Nenhuma música encontrada.</p>
          <p className="search-empty-hint">
            Tente buscar por outro termo ou verifique se há músicas cadastradas no sistema.
          </p>
        </div>
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
              key={track.id || index}
              className={`sr-item ${currentTrackIndex === index ? "playing" : ""}`}
            >
              <div className="sr-number" onClick={() => handlePlay(index)}>
                {currentTrackIndex === index && isPlaying ? <IoMdPause /> : <IoMdPlay />}
              </div>

              <div className="sr-title-info" onClick={() => handlePlay(index)}>
                <img 
                  src={track.cover || "/default-cover.jpg"} 
                  alt={track.title || "Sem título"} 
                  className="sr-cover"
                  onError={(e) => {
                    e.target.src = "/default-cover.jpg";
                  }}
                />
                <div className="sr-details">
                  <h4>{track.title || "Sem título"}</h4>
                  <p>{track.artist || "Artista desconhecido"}</p>
                </div>
              </div>

              <div className="sr-artist">{track.artist || "Artista desconhecido"}</div>
              <div className="sr-album">{track.album || "Álbum desconhecido"}</div>

              <div className="sr-actions">
                <button className="sr-action-btn" title="Curtir">
                  <IoMdHeartEmpty />
                </button>
                <button className="sr-action-btn" title="Adicionar à playlist">
                  <MdPlaylistAdd />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Debug info - remova em produção */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          background: 'rgba(0,0,0,0.8)',
          color: '#0f0',
          padding: '10px',
          borderRadius: '4px',
          fontSize: '11px',
          maxWidth: '300px',
          zIndex: 9999
        }}>
          <div><strong>DEBUG:</strong></div>
          <div>Termo: {searchTerm}</div>
          <div>Resultados: {results.length}</div>
          <div>Loading: {loading ? 'sim' : 'não'}</div>
          <div>State results: {resultsFromState ? 'sim' : 'não'}</div>
        </div>
      )}
    </div>
  );
}

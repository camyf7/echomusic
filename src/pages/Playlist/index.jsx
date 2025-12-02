import React, { useEffect, useState } from "react";
import "./Playlist.css";
import {
  IoMdPlay,
  IoMdPause,
  IoMdHeartEmpty,
  IoMdSkipBackward,
  IoMdSkipForward,
  IoMdRepeat
} from "react-icons/io";
import { MdShare, MdPlaylistAdd } from "react-icons/md";
import { FiClock } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";

import { usePlayer } from "../../contexts/PlayerContext";
import capaBrasileira from "./../../assets/capa-playlist.png";

export default function Playlist() {
  const {
    playTrack,
    setIsPlaying,
    isPlaying,
    currentTrackIndex,
    setPlaylistTracks,
    tracks,
    playlistBR
  } = usePlayer();

  const [formattedTracks, setFormattedTracks] = useState([]);

  // 🎵 Carrega APENAS músicas brasileiras
  useEffect(() => {
    setPlaylistTracks(playlistBR, 0);
  }, []);

  useEffect(() => {
    setFormattedTracks(
      tracks.map((track, index) => ({
        ...track,
        id: index,
        number: index + 1,
      }))
    );
  }, [tracks]);

  const handlePlay = (index) => {
    if (index === currentTrackIndex) {
      setIsPlaying(!isPlaying);
    } else {
      playTrack(index);
    }
  };

  const playlistHeader = {
    title: "Vibes Brasileiras",
    description: "As melhores músicas nacionais para relaxar, dançar e curtir. Seleção especial de hits brasileiros.",
    creator: "EchoMusic",
    cover: capaBrasileira,
    followers: "980",
  };

  return (
    <div className="pl-page">
      <div className="pl-container">

        {/* HEADER */}
        <div className="pl-header">
          <div className="pl-cover">
            <img src={playlistHeader.cover} alt={playlistHeader.title} />
          </div>
          <div className="pl-info">
            <div className="pl-type">Playlist pública</div>
            <h1 className="pl-title">{playlistHeader.title}</h1>
            <p className="pl-description">{playlistHeader.description}</p>

            <div className="pl-meta">
              <span>{playlistHeader.creator}</span>
              <div className="pl-separator" />
              <span>{formattedTracks.length} músicas</span>
              <div className="pl-separator" />
              <span>
                {formattedTracks.reduce((acc, t) => {
                  const [min, sec] = t.duration.split(":").map(Number);
                  return acc + min * 60 + sec;
                }, 0)}s
              </span>
              <div className="pl-separator" />
              <span>{playlistHeader.followers} seguidores</span>
            </div>

            <div className="pl-actions">
              <button className="pl-action-btn pl-play-btn" onClick={() => handlePlay(0)}>
                {isPlaying && currentTrackIndex === 0 ? (
                  <>
                    <IoMdPause size={22} /> Pausar
                  </>
                ) : (
                  <>
                    <IoMdPlay size={22} /> Reproduzir
                  </>
                )}
              </button>

              <button className="pl-icon-btn" onClick={() => playTrack(currentTrackIndex - 1)}>
                <IoMdSkipBackward size={22} />
              </button>
              <button className="pl-icon-btn" onClick={() => playTrack(currentTrackIndex + 1)}>
                <IoMdSkipForward size={22} />
              </button>

              <button className="pl-icon-btn">
                <IoMdRepeat size={22} />
              </button>

              <button className="pl-icon-btn"><IoMdHeartEmpty size={20} /></button>
              <button className="pl-icon-btn"><MdShare size={20} /></button>
             
            </div>
          </div>
        </div>

        {/* TRACKS */}
        <div className="pl-tracks-section">
          <div className="pl-tracks-header">
            <div>#</div>
            <div>Título</div>
            <div>Álbum</div>
            <div style={{ textAlign: "center" }}><FiClock size={16} /></div>
            <div></div>
          </div>

          {formattedTracks.map((track) => (
            <div
              key={track.id}
              className={`pl-track-item ${currentTrackIndex === track.id ? "playing" : ""}`}
            >
              <div className="pl-track-number" onClick={() => handlePlay(track.id)}>
                <span className="number">{track.number}</span>
                <span className="play-indicator">
                  {currentTrackIndex === track.id && isPlaying ? (
                    <IoMdPause size={18} />
                  ) : (
                    <IoMdPlay size={18} />
                  )}
                </span>
              </div>

              <div className="pl-track-info" onClick={() => handlePlay(track.id)}>
                <div className="pl-track-cover">
                  <img src={track.cover} alt={track.title} />
                </div>
                <div className="pl-track-details">
                  <h4>{track.title}</h4>
                  <p>{track.artist}</p>
                </div>
              </div>

              <div className="pl-track-album">{track.album}</div>

              <div className="pl-track-duration">{track.duration}</div>

              <div className="pl-track-actions">
                <button className="pl-track-action-btn"><IoMdHeartEmpty size={18} /></button>
                <button className="pl-track-action-btn"><MdPlaylistAdd size={20} /></button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

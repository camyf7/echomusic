import React, { createContext, useState, useRef, useEffect, useContext } from "react";

// 🎵 Importa as músicas
import dieForYou from "../assets/die-for-you.mp3";
import starboy from "../assets/starboy.mp3";
import adventure from "../assets/adventure.mp3";
import miracle from "../assets/miracle.mp3";

// 🎨 Importa as capas
import capaDieForYou from "../assets/musica_die.png";
import capaStarboy from "../assets/musica_starboy.png";
import capaAdventure from "../assets/musica_adventure.png";
import capaMiracle from "../assets/musica_miracle.png";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  // 🎶 Lista de músicas disponíveis
  const tracks = [
    {
      title: "Die For You",
      artist: "The Weeknd e Ariana Grande",
      src: dieForYou,
      cover: capaDieForYou,
    },
    {
      title: "Starboy",
      artist: "The Weeknd",
      src: starboy,
      cover: capaStarboy,
    },
    {
      title: "Adventure of a Lifetime",
      artist: "Coldplay",
      src: adventure,
      cover: capaAdventure,
    },
    {
      title: "Miracle",
      artist: "Calvin Harris & Ellie Goulding",
      src: miracle,
      cover: capaMiracle,
    },
  ];

  // Estados principais
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(0);

  const currentTrack = tracks[currentTrackIndex];
  const audioRef = useRef(new Audio(currentTrack.src));

  // ▶️ Play/pause e volume
  useEffect(() => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }

    audio.volume = volume / 100;
  }, [isPlaying, volume]);

  // 🔄 Atualiza o áudio quando a faixa muda
  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(currentTrack.src);
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentTrackIndex]);

  // 🎚️ Atualiza o progresso
  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      const progressPercent = (audio.currentTime / audio.duration) * 100;
      setProgress(progressPercent || 0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, []);

  // ⏭️ Próxima faixa
  const nextTrack = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === tracks.length - 1 ? 0 : prevIndex + 1
    );
  };

  // ⏮️ Faixa anterior
  const prevTrack = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? tracks.length - 1 : prevIndex - 1
    );
  };

  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        volume,
        setVolume,
        progress,
        setProgress,
        audioRef,
        currentTrack,
        nextTrack,
        prevTrack,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}

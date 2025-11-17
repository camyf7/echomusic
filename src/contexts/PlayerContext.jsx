import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";

// 🎵 Importa as músicas
import dieForYou from "../assets/die-for-you.mp3";
import starboy from "../assets/starboy.mp3";
import adventure from "../assets/adventure.mp3";
import miracle from "../assets/miracle.mp3";


// 🎨 Importa capas
import capaDieForYou from "../assets/musica_die.png";
import capaStarboy from "../assets/musica_starboy.png";
import capaAdventure from "../assets/musica_adventure.png";
import capaMiracle from "../assets/musica_miracle.png";




const PlayerContext = createContext();

export function PlayerProvider({ children }) {
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

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(0);

  // 🔊 UMA ÚNICA INSTÂNCIA DE ÁUDIO
  const audioRef = useRef(new Audio(tracks[0].src));

  const currentTrack = tracks[currentTrackIndex];

  // ▶️ Função universal para trocar e tocar música
  const playTrack = async (index) => {
    const audio = audioRef.current;

    // Pausa áudio antigo
    audio.pause();

    // Troca a música
    setCurrentTrackIndex(index);

    // Troca o src do áudio SEM criar novo Audio()
    audio.src = tracks[index].src;
    audio.currentTime = 0;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      console.warn("Navegador bloqueou o autoplay:", err);
      setIsPlaying(false);
    }
  };

  // 🔄 Atualiza listeners quando troca de música
  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      if (!audio.duration) return;
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleEnded = () => {
      nextTrack();
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrackIndex]);

  // ▶️ Controlar play/pause
  useEffect(() => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.play().catch((err) => console.warn("Autoplay bloqueado", err));
    } else {
      audio.pause();
    }

    audio.volume = volume / 100;
  }, [isPlaying, volume]);

  // ⏭ Próxima música
  const nextTrack = () => {
    const next = (currentTrackIndex + 1) % tracks.length;
    playTrack(next);
  };

  // ⏮ Anterior
  const prevTrack = () => {
    const prev =
      currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1;
    playTrack(prev);
  };

  return (
    <PlayerContext.Provider
      value={{
        tracks,
        currentTrack,
        currentTrackIndex,
        isPlaying,
        setIsPlaying,
        volume,
        setVolume,
        progress,
        playTrack,
        audioRef,
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

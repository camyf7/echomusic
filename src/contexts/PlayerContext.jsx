import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";

// 🎵 Músicas internacionais
import dieForYou from "../assets/die-for-you.mp3";
import starboy from "../assets/starboy.mp3";
import adventure from "../assets/adventure.mp3";
import miracle from "../assets/miracle.mp3";

// 🎵 Brasileiras
import alianca from "../assets/alianca.mp3";
import exagerado from "../assets/exagerado.mp3";
import lisboa from "../assets/lisboa.mp3";
import seteMares from "../assets/o-descobridor-do-sete-mares.mp3";
import saudade from "../assets/quando-bate-aquela-saudade.mp3";
import sorriRei from "../assets/sorri-sou-rei.mp3";
import tempo from "../assets/tempo-perdido.mp3";
import amor from "../assets/um-amor-puro.mp3";

// 🎨 Capas internacionais
import capaDieForYou from "../assets/musica_die.png";
import capaStarboy from "../assets/musica_starboy.png";
import capaAdventure from "../assets/musica_adventure.png";
import capaMiracle from "../assets/musica_miracle.png";

// 🎨 Capas brasileiras
import capaAlianca from "../assets/musica_aliança.png";
import capaExagerado from "../assets/musica_exagerado.png";
import capaLisboa from "../assets/musica_lisboa.png";
import capaSeteMares from "../assets/musica_sete-mares.png";
import capaSaudade from "../assets/musica_quando-bate-aquela-saudade.png";
import capaSorriRei from "../assets/musica_sorri-sou-rei.png";
import capaTempo from "../assets/musica_tempo-perdido.png";
import capaAmor from "../assets/musica_um-amor-tao-puro.png";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const defaultTracks = [
    { title: "Die For You", artist: "The Weeknd & Ariana Grande", src: dieForYou, cover: capaDieForYou },
    { title: "Starboy", artist: "The Weeknd", src: starboy, cover: capaStarboy },
    { title: "Adventure of a Lifetime", artist: "Coldplay", src: adventure, cover: capaAdventure },
    { title: "Miracle", artist: "Calvin Harris & Ellie Goulding", src: miracle, cover: capaMiracle },
  ];

  const playlistBR = [
    { title: "Aliança", artist: "Tribalhistas", src: alianca, cover: capaAlianca },
    { title: "Exagerado", artist: "Cazuza", src: exagerado, cover: capaExagerado },
    { title: "Lisboa", artist: "Anavitoria", src: lisboa, cover: capaLisboa },
    { title: "O Descobridor dos Sete Mares", artist: "Tim Maia", src: seteMares, cover: capaSeteMares },
    { title: "Quando Bate Aquela Saudade", artist: "Rubel", src: saudade, cover: capaSaudade },
    { title: "Sorri, Sou Rei", artist: "Natiruts", src: sorriRei, cover: capaSorriRei },
    { title: "Tempo Perdido", artist: "Legião Urbana", src: tempo, cover: capaTempo },
    { title: "Um Amor Puro", artist: "Djavan", src: amor, cover: capaAmor },
  ];

  const [tracks, setTracks] = useState(defaultTracks);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [likedTracks, setLikedTracks] = useState([]);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef(new Audio(defaultTracks[0].src));
  const currentTrack = tracks[currentTrackIndex];

  // 🔥 Função para calcular duração automática
  const loadTrackDurations = async (trackList) => {
    const updatedTracks = await Promise.all(
      trackList.map((track) => {
        return new Promise((resolve) => {
          const audio = new Audio(track.src);
          audio.addEventListener("loadedmetadata", () => {
            const minutes = Math.floor(audio.duration / 60);
            const seconds = Math.floor(audio.duration % 60)
              .toString()
              .padStart(2, "0");
            resolve({ ...track, duration: `${minutes}:${seconds}` });
          });
        });
      })
    );
    return updatedTracks;
  };

  const setPlaylistTracks = async (newTracks, startIndex = 0) => {
    const audio = audioRef.current;
    audio.pause();
    const tracksWithDurations = await loadTrackDurations(newTracks);
    setTracks(tracksWithDurations);
    setCurrentTrackIndex(startIndex);

    audio.src = tracksWithDurations[startIndex].src;
    audio.currentTime = 0;
    audio.play().then(() => setIsPlaying(true));
  };

  const resetToDefaultTracks = async (startIndex = 0) => {
    const audio = audioRef.current;
    audio.pause();
    const tracksWithDurations = await loadTrackDurations(defaultTracks);
    setTracks(tracksWithDurations);
    setCurrentTrackIndex(startIndex);

    audio.src = tracksWithDurations[startIndex].src;
    audio.currentTime = 0;
    audio.play().then(() => setIsPlaying(true));
  };

  const playTrack = async (index) => {
    const audio = audioRef.current;
    audio.pause();
    setCurrentTrackIndex(index);

    audio.src = tracks[index].src;
    audio.currentTime = 0;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {}
  };

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      if (!audio.duration) return;
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleEnded = () => {
      if (repeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        nextTrack();
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [repeat, tracks, currentTrackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    isPlaying ? audio.play().catch(() => {}) : audio.pause();
    audio.volume = volume / 100;
  }, [isPlaying, volume]);

  const nextTrack = () => {
    playTrack((currentTrackIndex + 1) % tracks.length);
  };

  const prevTrack = () => {
    const prev = currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1;
    playTrack(prev);
  };

  const toggleLike = (index) => {
    setLikedTracks((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <PlayerContext.Provider
      value={{
        tracks,
        playlistBR,
        defaultTracks,
        currentTrack,
        currentTrackIndex,
        isPlaying,
        repeat,
        likedTracks,
        volume,
        progress,
        setIsPlaying,
        setVolume,
        playTrack,
        nextTrack,
        prevTrack,
        toggleLike,
        setRepeat,
        setPlaylistTracks,
        resetToDefaultTracks,
        audioRef,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}

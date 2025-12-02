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

// capas internacionais
import capaDieForYou from "../assets/musica_die.png";
import capaStarboy from "../assets/musica_starboy.png";
import capaAdventure from "../assets/musica_adventure.png";
import capaMiracle from "../assets/musica_miracle.png";

// 🎵 músicas brasileiras
import alianca from "../assets/alianca.mp3";
import exagerado from "../assets/exagerado.mp3";
import lisboa from "../assets/lisboa.mp3";
import seteMares from "../assets/o-descobridor-do-sete-mares.mp3";
import saudade from "../assets/quando-bate-aquela-saudade.mp3";
import sorriRei from "../assets/sorri-sou-rei.mp3";
import tempoPerdido from "../assets/tempo-perdido.mp3";
import amorPuro from "../assets/um-amor-puro.mp3";

// capas brasileiras
import capaAlianca from "../assets/musica_aliança.png";
import capaExagerado from "../assets/musica_exagerado.png";
import capaLisboa from "../assets/musica_lisboa.png";
import capaSeteMares from "../assets/musica_sete-mares.png";
import capaSaudade from "../assets/musica_quando-bate-aquela-saudade.png";
import capaSorriRei from "../assets/musica_sorri-sou-rei.png";
import capaTempoPerdido from "../assets/musica_tempo-perdido.png";
import capaAmorPuro from "../assets/musica_um-amor-puro.png";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const backend = "http://localhost:3000";

  // ✔ Corrigido: NÃO mexer em arquivos locais!
  const isLocalFile = (url) =>
    url.startsWith("/") ||
    url.startsWith("./") ||
    url.includes("assets") ||
    !url.startsWith("http");

  const fixUrl = (url) => {
    if (!url) return "";
    if (isLocalFile(url)) return url; // ✔ local → manter
    return url;
  };

  // 🎧 Músicas padrão
  const defaultTracks = [
    { title: "Die For You", artist: "The Weeknd", album: "Starboy (2016)", duration: "4:20", src: dieForYou, cover: capaDieForYou },
    { title: "Starboy", artist: "The Weeknd", album: "Starboy (2016)", duration: "3:50", src: starboy, cover: capaStarboy },
    { title: "Adventure of a Lifetime", artist: "Coldplay", album: "A Head Full of Dreams (2015)", duration: "4:23", src: adventure, cover: capaAdventure },
    { title: "Miracle", artist: "The Score", album: "Atlas (2017)", duration: "3:12", src: miracle, cover: capaMiracle },
  ];

  // 🎵 Playlist brasileira
  const playlistBR = [
    { title: "Aliança", artist: "Tribalistas", album: "Tribalistas", duration: "4:11", src: alianca, cover: capaAlianca },
    { title: "Exagerado", artist: "Cazuza", album: "Exagerado", duration: "3:45", src: exagerado, cover: capaExagerado },
    { title: "Lisboa", artist: "ANAVITÓRIA ft. Lenine", album: "COR", duration: "4:27", src: lisboa, cover: capaLisboa },
    { title: "O Descobridor dos Sete Mares", artist: "Tim Maia", album: "O Descobridor dos Sete Mares", duration: "4:23", src: seteMares, cover: capaSeteMares },
    { title: "Quando bate aquela saudade", artist: "Rubel", album: "Casas", duration: "4:00", src: saudade, cover: capaSaudade },
    { title: "Sorri, sou rei", artist: "Natiruts", album: "Povo Brasileiro", duration: "5:32", src: sorriRei, cover: capaSorriRei },
    { title: "Tempo Perdido", artist: "Legião Urbana", album: "Dois", duration: "5:01", src: tempoPerdido, cover: capaTempoPerdido },
    { title: "Um amor puro", artist: "Djavan", album: "Djavan ao Vivo", duration: "4:50", src: amorPuro, cover: capaAmorPuro },
  ];

  const [tracks, setTracks] = useState(defaultTracks);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef(new Audio(defaultTracks[0].src));

  const normalizeTracks = (list) =>
    list.map((t, i) => ({
      ...t,
      id: i,
      number: i + 1,
      src: fixUrl(t.src),
      cover: fixUrl(t.cover),
    }));

  const setPlaylistTracks = (list, startIndex = 0) => {
    const normalized = normalizeTracks(list);
    setTracks(normalized);
    setCurrentTrackIndex(startIndex);

    const audio = audioRef.current;
    audio.pause();
    audio.src = normalized[startIndex].src;
    audio.currentTime = 0;
    setIsPlaying(false);
  };

  const playTrack = async (index) => {
    const audio = audioRef.current;

    if (currentTrackIndex === index) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play().catch(() => {});
        setIsPlaying(true);
      }
      return;
    }

    setCurrentTrackIndex(index);
    audio.src = tracks[index].src;
    audio.currentTime = 0;

    audio.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  // progresso
  useEffect(() => {
    const audio = audioRef.current;

    const update = () => {
      if (!audio.duration) return;
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio.addEventListener("timeupdate", update);
    audio.addEventListener("ended", () => {
      const next = currentTrackIndex + 1;
      if (tracks[next]) playTrack(next);
      else setIsPlaying(false);
    });

    return () => {
      audio.removeEventListener("timeupdate", update);
    };
  }, [tracks, currentTrackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume / 100;
    if (isPlaying) audio.play().catch(() => {});
    else audio.pause();
  }, [isPlaying, volume]);

  return (
    <PlayerContext.Provider
      value={{
        tracks,
        currentTrackIndex,
        isPlaying,
        progress,
        volume,
        setIsPlaying,
        setVolume,
        playTrack,
        setPlaylistTracks,
        playlistBR,
        audioRef,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);

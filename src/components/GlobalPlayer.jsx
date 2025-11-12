import { useEffect } from "react"
import { usePlayer } from "../contexts/PlayerContext"

export default function GlobalPlayer() {
  const { audioRef, currentTrack } = usePlayer()

  // Efeito para trocar a música quando `currentTrack` mudar.
  // No futuro, você pode expandir isso para carregar a URL da nova música.
  useEffect(() => {
    if (currentTrack) {
      console.log("Now playing:", currentTrack.title)
      // Exemplo: audioRef.current.src = currentTrack.url;
      // audioRef.current.play();
    }
  }, [currentTrack, audioRef])

  // Este componente não renderiza nada na tela.
  return null
}

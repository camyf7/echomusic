import './Notfound.css'; 
import { Link } from "react-router-dom";

import React, { useState, useEffect } from 'react';
import { Music, Home, Search, Disc3, Headphones } from 'lucide-react';

export default function NotFound404() {
  const [rotation, setRotation] = useState(0);
  const [notePositions, setNotePositions] = useState([]);

  useEffect(() => {
    // Rotação contínua do disco
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);

    // Gerar posições aleatórias para notas musicais
    const notes = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4
    }));
    setNotePositions(notes);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c1e] via-[#1a0933] to-[#0f0c1e] text-white flex items-center justify-center p-4 overflow-hidden relative">
      
      {/* Blobs de fundo animados */}
      <div
        className="absolute w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 -top-20 -left-20 animate-pulse"
        style={{ animationDuration: '4s' }}
      ></div>

      <div
        className="absolute w-80 h-80 bg-pink-600 rounded-full blur-3xl opacity-20 -bottom-20 -right-20 animate-pulse"
        style={{ animationDuration: '6s' }}
      ></div>

      {/* Container principal */}
      <div className="relative z-10 text-center max-w-2xl space-y-10">
        
        {/* Disco de vinil animado */}
        <div className="mb-10 flex justify-center">
          <div className="relative">
            <div
              className="w-64 h-64 rounded-full bg-gradient-to-br from-purple-900 to-pink-900 flex items-center justify-center shadow-2xl"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {/* Ranhuras do disco */}
              <div className="absolute inset-4 rounded-full border-4 border-purple-700 opacity-40"></div>
              <div className="absolute inset-8 rounded-full border-4 border-purple-600 opacity-30"></div>
              <div className="absolute inset-12 rounded-full border-4 border-purple-500 opacity-20"></div>

              {/* Centro do disco */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-black to-gray-900 flex items-center justify-center border-4 border-purple-500 shadow-lg">
                <Disc3 size={32} className="text-purple-400" />
              </div>
            </div>

            <br></br>
        <br></br>

            {/* Braço do toca-discos */}
            <div
              className="absolute -right-8 top-8 w-32 h-2 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full origin-left"
              style={{
                transform: 'rotate(-25deg)',
                boxShadow: '0 4px 20px rgba(147, 51, 234, 0.3)'
              }}
            >
              <div className="absolute right-0 w-6 h-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full -translate-y-2"></div>
            </div>
          </div>
        </div>

        {/* Código 404 */}
        <div className="mb-6 relative">
          <h1
            className="text-9xl font-black bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-pulse"
            style={{
              textShadow: '0 0 40px rgba(147, 51, 234, 0.5)',
              backgroundSize: '200% 200%',
              animation: 'gradient 3s ease infinite, pulse 2s ease-in-out infinite'
            }}
          >
            404
          </h1>
        </div>

        <br></br>
        <br></br>

        {/* Título principal */}
        <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
          Essa Música Não Toca Aqui
        </h2>
        <br></br>
        <br></br>
        {/* Descrição */}

        <p className="text-lg md:text-xl text-purple-300 mb-8">
          Ops! A página que você está procurando não foi encontrada. 
        </p>

        <br></br>
        <br></br>
        


        {/* Cards com sugestões */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
  
  {/* Card - Início */}
  <Link 
    to="/" 
    className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 hover:border-purple-400/60 transition-all duration-300 hover:scale-105 cursor-pointer group block"
  >
    <Home size={48} className="mx-auto mb-4 text-purple-400 group-hover:scale-110 transition-transform" />
    <h3 className="font-bold text-xl mb-2 text-center">Início</h3>
    <p className="text-sm text-purple-300/80 text-center">Voltar para home</p>
  </Link>

  {/* Card - Playlists */}
  <Link 
    to="/profile" 
    className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 hover:border-blue-400/60 transition-all duration-300 hover:scale-105 cursor-pointer group block"
  >
    <Headphones size={48} className="mx-auto mb-4 text-blue-400 group-hover:scale-110 transition-transform" />
    <h3 className="font-bold text-xl mb-2 text-center">Playlists</h3>
    <p className="text-sm text-blue-300/80 text-center">Explorar playlists</p>
  </Link>

</div>

       <br></br>
       <br></br>
       <br></br>
       <br></br>
       <br></br>
        

        {/* Mensagem extra */}
        <p className="mt-10 text-sm text-purple-400/60 italic">
          "A vida sem música seria um erro." - Friedrich Nietzsche
        </p>
      </div>
    </div>
  );
}

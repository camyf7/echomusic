// src/pages/LoginPage/index.jsx
import React, { useState } from "react";
import { ArrowRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Senha:", senha);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Concert image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900">
        <img
          src="/src/assets/images/concert.jpg" // substitua pelo caminho da sua imagem
          alt="Concert"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Boas-vindas!</h2>
          <p className="text-sm leading-relaxed opacity-90">
            O lugar onde a sua música encontra sua rede!<br />
            Aqui você pode ouvir suas faixas favoritas, descobrir novos artistas,<br />
            compartilhar playlists com seus amigos e criar o mesmo gosto musical que você.<br /><br />
            No EchoMusic, cada batida é uma conexão e cada música é uma história.<br />
            Crie seu perfil, siga seus amigos, comente sobre as músicas do momento e entre nas tendências musicais.
          </p>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex flex-col">
        {/* Close button */}
        <div className="flex justify-end p-6">
          <button className="text-white hover:bg-white/10 p-2 rounded-full">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Form container */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="w-full max-w-sm space-y-6">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                    <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-sm"></div>
                  </div>
                </div>
              </div>
              <h1 className="text-white text-sm font-medium tracking-wider">ECHOMUSIC</h1>
            </div>

            {/* Google login button */}
            <button className="w-full bg-white text-gray-700 hover:bg-gray-50 font-medium py-3 flex items-center justify-center rounded-md transition-colors">
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Entrar com o Google
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-white/70">Ou faça com seu e-mail</span>
              </div>
            </div>

            {/* Email and password inputs */}
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Insira seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/40"
              />
              <input
                type="password"
                placeholder="Insira sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/40"
              />
            </div>

            {/* Login button */}
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-3 rounded-md flex items-center justify-center transition-all"
            >
              Entrar
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </button>

            {/* Links */}
            <div className="text-center space-y-2">
              <p className="text-white/70 text-sm">
                Não tem uma conta?{" "}
                <NavLink to="/signup" className="text-white hover:underline font-medium">
                  Criar conta grátis
                </NavLink>
              </p>
              <NavLink to="/recuperar" className="text-white/70 hover:text-white text-sm hover:underline block">
                Esqueceu sua senha?
              </NavLink>
            </div>

            {/* Footer text */}
            <p className="text-xs text-white/50 text-center leading-relaxed mt-8">
              Ao utilizar os serviços da Echomusic você concorda com nossas{' '}
              <a href="#" className="underline hover:text-white/70">políticas de privacidade</a>{' '}
              e{' '}
              <a href="#" className="underline hover:text-white/70">termos de uso</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}






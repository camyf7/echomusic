import React from "react";
import { Routes, Route } from "react-router-dom";

import Topo from "./components/Topo";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Discover from "./pages/Discover";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import SalasAoVivo from "./pages/Rooms";

import "./index.css";
import Rooms from "./pages/Rooms";

function App() {
  return (
    <>
      <header>
        <Topo />
      </header>

      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/descobrir" element={<Discover />} />
          <Route path="/salas" element={<SalasAoVivo />} />
          <Route path="/sobre" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;

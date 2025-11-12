import React from "react"
import { Routes, Route } from "react-router-dom"
import Topo from "./components/Topo"
import Footer from "./components/Footer"
import GlobalPlayer from "./components/GlobalPlayer"

import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import Discover from "./pages/Discover"
import About from "./pages/About"
import NotFound from "./pages/NotFound"
import Profile from "./pages/Profile"
import Community from "./pages/Community"
import SignUp from "./pages/SignUp"
import Signin from "./pages/Signin"
import Rooms from "./pages/Rooms"
import EditProfile from "./pages/editProfile"

function App() {
  return (
    <>
      <header>
        <Topo />
      </header>

      {/* 🔥 Player sempre ativo */}
      <GlobalPlayer />

      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/descobrir" element={<Discover />} />
          <Route path="/salas" element={<Rooms />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/comunidades" element={<Community />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default App

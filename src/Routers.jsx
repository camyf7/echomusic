import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Discover from './pages/Discover';
import Community from "./pages/Community";
import NotFound from './pages/NotFound';
import About from './pages/About';
import Profile from './pages/Profile';
import EditProfile from './pages/editProfile';

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/about" element={<About />} />
      <Route path="/comunidades" element={<Community />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/editprofile" element={<EditProfile />} />
      <Route path="*" element={<NotFound />} /> 
    </Routes>
  );
}

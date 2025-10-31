import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';   // nome alinhado
import Discover from './pages/Discover'; // nome alinhado
import Community from "./pages/Community";
import NotFound from './pages/NotFound';
import About from './pages/About';


export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/about" element={<About />} />
      <Route path="/comunidades" element={<Community />} />

      {/* Rota coringa para 404 */}
      <Route path="*" element={<NotFound />} /> 
    
    </Routes>
  );
}



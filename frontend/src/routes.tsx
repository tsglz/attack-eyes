import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Diagram from "./pages/Diagram";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/diagram" element={<Diagram />} />
  </Routes>
);

export default AppRoutes;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Generate from "./pages/Generate";
import Explore from "./pages/Explore";
import Edit from "./pages/Edit";
import Creations from "./pages/Creations";
import About from "./pages/About";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/creations" element={<Creations />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Legal type="privacy" />} />
          <Route path="/cookies" element={<Legal type="cookies" />} />
          <Route path="/terms" element={<Legal type="terms" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

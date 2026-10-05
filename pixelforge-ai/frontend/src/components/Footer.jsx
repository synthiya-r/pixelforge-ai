import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div>
          <Link to="/" className="brand footer-brand"><span className="brand-mark">P</span><span>PIXELFORGE</span></Link>
          <p className="footer-copy">A focused creative workspace for turning ideas into visuals.</p>
        </div>
        <div className="footer-links">
          <div>
            <span className="footer-label">Product</span>
            <Link to="/generate">Generate</Link>
            <Link to="/explore">Explore</Link>
            <Link to="/edit">Edit image</Link>
            <Link to="/creations">My creations</Link>
          </div>
          <div>
            <span className="footer-label">Company</span>
            <Link to="/about">About</Link>
            <Link to="/privacy">Privacy policy</Link>
            <Link to="/cookies">Cookie policy</Link>
            <Link to="/terms">Terms & conditions</Link>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} PixelForge AI. All rights reserved.</span>
        <span>12 free generations per day.</span>
      </div>
    </footer>
  );
}

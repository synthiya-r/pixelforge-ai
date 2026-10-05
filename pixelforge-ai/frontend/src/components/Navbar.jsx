import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  ["/generate", "Generate"],
  ["/explore", "Explore"],
  ["/edit", "Edit"],
  ["/creations", "Creations"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="navbar">
      <div className="nav-inner container">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">P</span>
          <span>PIXELFORGE</span>
        </Link>

        <nav className="desktop-nav">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
              {label}
            </NavLink>
          ))}
          <NavLink to="/about" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>About</NavLink>
        </nav>

        <div className="nav-actions desktop-nav">
          <Link to="/generate" className="button button-dark button-small">
            Start creating <ArrowUpRight size={15}/>
          </Link>
        </div>

        <button className="mobile-menu-button" aria-label="Open menu" onClick={() => setOpen(!open)}>
          {open ? <X size={21}/> : <Menu size={21}/>}
        </button>
      </div>

      {open && (
        <div className="mobile-menu">
          <div className="container mobile-menu-inner">
            {links.map(([to, label]) => (
              <NavLink key={to} to={to} onClick={() => setOpen(false)} className="mobile-link">{label}</NavLink>
            ))}
            <NavLink to="/about" onClick={() => setOpen(false)} className="mobile-link">About</NavLink>
            <Link to="/generate" onClick={() => setOpen(false)} className="button button-dark">Start creating <ArrowUpRight size={16}/></Link>
          </div>
        </div>
      )}
    </header>
  );
}

"use client";
import "./Header.css";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [background, setBackground] = useState("transparent");
  const [blur, setBlur] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrollPosition > 0) {
      setBackground("rgba(0, 0, 0, 0.1)");
      setBlur(20);
    } else {
      setBackground("transparent");
      setBlur(0);
    }
  }, [scrollPosition]);

  return (
    <div>
      {/* MENU */}
      <div className={`MENU ${open ? "show" : ""}`}>
        <a href="#uvod">Domů</a>
        <a href="#o-nas">O nás</a>
        <a href="#sluzby">Služby</a>
        <a href="#galerie">Galerie</a>
        <a href="#kontakt">Kontakt</a>
      </div>

      {/* HEADER */}
      <header
        className="HEADER"
        style={{ background, backdropFilter: `blur(${blur}px)` }}
      >
        {/* BURGER */}
        <label className="burger">
          <input
            type="checkbox"
            checked={open}
            onChange={() => setOpen(!open)}
          />
          <span></span>
          <span></span>
          <span></span>
        </label>

        {/* DESKTOP NAV */}
        <div className="NAV-BAR">
          <a href="#uvod">Domů</a>
          <a href="#o-nas">O nás</a>
          <a href="#sluzby">Služby</a>
          <a href="#galerie">Galerie</a>
          <a href="#kontakt">Kontakt</a>
        </div>

        <a href="/">
          <img
            className="LOGO"
            src="./logo-white.png"
            alt="logo white DH - Gravirování"
          />
        </a>
      </header>
    </div>
  );
}

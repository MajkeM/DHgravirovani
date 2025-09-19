// page.tsx

"use client";
import Image from "next/image";
import "./globals.css";
import About from "./components/About";
import Services from "./components/Services";
import { useState, useEffect, useRef } from "react"; // Uistite sa, že máte useRef
import Gallery from "./components/Gallery";
import Contacts from "./components/Contacts";
import Form from "./components/Form";
import Footer from "./components/Footer";
import Intro from "./components/Intro";

export default function Home() {
  const [blur, setBlur] = useState(0);
  const [brightness, setBrightness] = useState(0.8);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [background, setBackground] = useState("none");
  const [isLoading, setIsLoading] = useState(true); 
  const [introAnimationClass, setIntroAnimationClass] = useState(""); 
  
  // 1. Vytvoríme referenciu pre video element
  const videoRef = useRef<HTMLVideoElement>(null);

  // ... (useEffect pre scroll a background zostávajú rovnaké)
  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrollPosition > 0) setBackground("rgba(0, 0, 0, 0.1)");
    else setBackground("none");
  }, [scrollPosition]);

  useEffect(() => {
    if (scrollPosition < 1000) {
      setBlur(scrollPosition * 0.01);  
      setBrightness(Math.max(0.8 - scrollPosition * 0.001, 0.2));
    }
  }, [scrollPosition]);
  
  // 2. Nový useEffect, ktorý riadi intro na základe načítania videa
  useEffect(() => {
    const videoElement = videoRef.current;

    const handleVideoReady = () => {
      // Keď je video pripravené, spustíme animáciu miznutia
      setIntroAnimationClass("effect-fadeout");
      
      // A po skončení animácie (2 sekundy) odstránime komponent
      setTimeout(() => {
        setIsLoading(false);
      }, 2000); // Dĺžka CSS animácie
    };

    if (videoElement) {
      // Poistka: Ak je video už načítané z cache, spustíme funkciu hneď
      if (videoElement.readyState >= 3) { // 3 = HAVE_FUTURE_DATA, 4 = HAVE_ENOUGH_DATA
        handleVideoReady();
      } else {
        // Inak pridáme event listener, ktorý počká na udalosť 'canplaythrough'
        videoElement.addEventListener('canplaythrough', handleVideoReady);
      }
    }

    // Funkcia na upratanie: odstráni listener, keď sa komponent odpojí
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('canplaythrough', handleVideoReady);
      }
    };
  }, []); // Spustí sa iba raz po prvom renderovaní


  return (
    <div>
      {isLoading && <Intro animationClass={introAnimationClass} />}
      <div id="uvod"></div>
      
      {/* 3. Prepojíme ref s video elementom */}
      <video 
        ref={videoRef}
        className = "VIDEO-BG"
        src="/DH-intro-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{filter: `brightness(${brightness}) blur(${blur}px)`}}
      ></video>
      
      <div className = "uvod-con">
        <h1 className="uvod-1">D.H.</h1>
        <h2 className="uvod-2" >GRAVÍROVÁNÍ</h2>
        <div className="UVOD-last">
          <p className="uvod-3" >Váš nápad. Náš laser. Jeden originál.</p>
          <a href="#kontakt" className="uvod-kontakt" >Kontaktujte nás</a>
        </div>
      </div>
      
      {/* ... (zvyšok stránky) ... */}
      <div id = "o-nas"></div>
      <About />
      <div id = "sluzby"></div>
      <Services />
      <div id = "galerie"></div>
      <Gallery />
      <div id = "kontakt"></div>
      <Contacts />
      <p className = "NEBO">NEBO</p>
      <div id ="form"></div>
      <Form />
      <Footer />
    </div>
  );
}
// page.tsx

"use client";
import Image from "next/image";
import "./globals.css";
import About from "./components/About";
import Services from "./components/Services";
import { useState, useEffect, useRef } from "react";
import Gallery from "./components/Gallery";
import Contacts from "./components/Contacts";
import Form from "./components/Form";
import Footer from "./components/Footer";
import Intro from "./components/Intro";
// KROK 3.1: Importujeme nas novy hook
import { useAnimationOnScroll } from "./hooks/useAnimationOnScroll";

export default function Home() {
  const [blur, setBlur] = useState(0);
  const [brightness, setBrightness] = useState(0.8);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [background, setBackground] = useState("none");
  const [isLoading, setIsLoading] = useState(true); 
  const [introAnimationClass, setIntroAnimationClass] = useState(""); 

  // --- OBSERVER PRO ANIMACE ---
  // KROK 3.2: Vytvorime instanci hooku pro kazdou sekci
  const [aboutRef, isAboutVisible] = useAnimationOnScroll<HTMLDivElement>();
  const [servicesRef, isServicesVisible] = useAnimationOnScroll<HTMLDivElement>();
  const [galleryRef, isGalleryVisible] = useAnimationOnScroll<HTMLDivElement>();
  const [contactsRef, isContactsVisible] = useAnimationOnScroll<HTMLDivElement>();
  const [formRef, isFormVisible] = useAnimationOnScroll<HTMLDivElement>();
  
  
  // Ref pre video zustava
  const videoRef = useRef<HTMLVideoElement>(null);

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
  
  useEffect(() => {
    const videoElement = videoRef.current;
    const handleVideoReady = () => {
      setIntroAnimationClass("effect-fadeout");
      setTimeout(() => setIsLoading(false), 2000);
    };

    if (videoElement) {
      if (videoElement.readyState >= 3) {
        handleVideoReady();
      } else {
        videoElement.addEventListener('canplaythrough', handleVideoReady);
      }
    }
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('canplaythrough', handleVideoReady);
      }
    };
  }, []);


  return (
    <div>
      {isLoading && <Intro animationClass={introAnimationClass} />}
      <div id="uvod"></div>
      
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
      
      {/* KROK 3.3: Obalime komponenty a priradime refy a tridy */}
      <div id="o-nas"></div>
      <div ref={aboutRef} className={`hidden-element ${isAboutVisible ? 'visible-element' : ''}`}>
        <About />
      </div>

      <div id="sluzby"></div>
      <div ref={servicesRef} className={`hidden-element ${isServicesVisible ? 'visible-element' : ''}`}>
        <Services />
      </div>

      <div id="galerie"></div>
      <div ref={galleryRef} className={`hidden-element ${isGalleryVisible ? 'visible-element' : ''}`}>
        <Gallery />
      </div>
      
      <div id="kontakt"></div>
      <div ref={contactsRef} className={`hidden-element ${isContactsVisible ? 'visible-element' : ''}`}>
        <Contacts />
      </div>

      <p className = "NEBO">NEBO</p>
      
      <div id ="form"></div>
      <div ref={formRef} className={`hidden-element ${isFormVisible ? 'visible-element' : ''}`}>
        <Form />
      </div>
      
      <Footer />
    </div>
  );
}
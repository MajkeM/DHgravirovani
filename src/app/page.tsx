"use client";
import Image from "next/image";
import "./globals.css";
import About from "./components/About";
import Services from "./components/Services";
import { useState, useEffect } from "react";
import Gallery from "./components/Gallery";
import Contacts from "./components/Contacts";
import Form from "./components/Form";
import Footer from "./components/Footer";


export default function Home() {
  const [blur, setBlur] = useState(0);
  const [brightness, setBrightness] = useState(0.8);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [background, setBackground] = useState("none");


  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  })

  useEffect(() => {
    if (scrollPosition > 0){
      setBackground("rgba(0, 0, 0, 0.1)");
    }
    else {
      setBackground("none");
    }
  }, [scrollPosition])

  useEffect(() => {
    if (scrollPosition < 1000) {
        setBlur(scrollPosition * 0.01);  
        setBrightness(Math.max(0.8 - scrollPosition * 0.001, 0.2));

    }
    
  }, [scrollPosition])

  return (
    <div>
      <div id="uvod"></div>
      <video 
        className = "VIDEO-BG"
        src="./DH-intro-video.mp4"
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

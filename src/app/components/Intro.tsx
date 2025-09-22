// components/Intro.tsx
"use client";
import React from "react";
import "./Intro.css";

// Komponent teraz prijíma 'animationClass' ako prop
export default function Intro({ animationClass }: { animationClass: string }) {
  return (
    <div>
        {/* Použijeme prijatú triedu */}
        
        <div className={"intro " + animationClass}>
            <div className="dot-spinner">
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
            </div>
        </div>
    </div>
  );
}
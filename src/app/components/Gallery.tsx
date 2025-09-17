"use client";
import { useState, useEffect } from "react";
import "./Gallery.css";

const images = [
  "/gallery/1.jpg",
  "/gallery/2.jpg",
  "/gallery/3.jpg",
  "/gallery/4.jpg",
  "/gallery/5.jpg",
  "/gallery/6.jpg",
  "/gallery/7.jpg",
  "/gallery/8.jpg",
  "/gallery/9.jpg",
  "/gallery/10.jpg",
  "/gallery/11.jpg",
  "/gallery/12.jpg",
  "/gallery/13.jpg",
  "/gallery/14.jpg",
];

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (currentIndex !== null) {
      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) =>
          prev !== null ? (prev + 1) % images.length : 0
        );
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) =>
          prev !== null ? (prev - 1 + images.length) % images.length : 0
        );
      } else if (e.key === "Escape") {
        setCurrentIndex(null);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  return (
    <section className="gallery">
      <h2 className="gallery-title">Galerie</h2>
      <div className="gallery-grid">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Gallery ${index + 1}`}
            className="gallery-item"
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {currentIndex !== null && (
        <div className="modal" onClick={() => setCurrentIndex(null)}>
          <span
            className="modal-close"
            onClick={() => setCurrentIndex(null)}
          >
            &times;
          </span>
          <img
            src={images[currentIndex]}
            alt="Modal"
            className="modal-image"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="modal-prev"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(
                (currentIndex - 1 + images.length) % images.length
              );
            }}
          >
            &#10094;
          </button>
          <button
            className="modal-next"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((currentIndex + 1) % images.length);
            }}
          >
            &#10095;
          </button>
        </div>
      )}
    </section>
  );
}

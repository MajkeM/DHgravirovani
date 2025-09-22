"use client";

import { useState, useEffect, useRef } from 'react';

// Tento hook vezme libovolny HTML element, sleduje jeho viditelnost
// a vraci referenci a stav, zda je viditelny.
export function useAnimationOnScroll<T extends HTMLElement>() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const currentRef = elementRef.current;

    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        // Kdyz je prvek v zornem poli, nastavime stav na true
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Animace se spusti jen jednou
        }
      },
      {
        threshold: 0.1, // Spusti se, kdyz je viditelnych 10% prvku
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return [elementRef, isVisible] as const;
}
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { carouselSlides } from '../mockData';

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const length = carouselSlides.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [length]);

  const handleNext = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const handlePrev = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(carouselSlides) || carouselSlides.length <= 0) {
    return null;
  }

  return (
    <div className="hero-carousel">
      <button className="carousel-arrow prev" onClick={handlePrev} aria-label="Previous Slide">
        <ChevronLeft size={24} />
      </button>
      
      <button className="carousel-arrow next" onClick={handleNext} aria-label="Next Slide">
        <ChevronRight size={24} />
      </button>

      {carouselSlides.map((slide, index) => (
        <div
          className={`carousel-slide ${index === current ? 'active' : ''}`}
          key={slide.id}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="carousel-slide-overlay"></div>
          <div className="carousel-content">
            <span className="carousel-tag">{slide.tag}</span>
            <h1 className="carousel-title">{slide.title}</h1>
            <p className="carousel-desc">{slide.desc}</p>
            <button className="carousel-cta">{slide.cta}</button>
          </div>
        </div>
      ))}

      <div className="carousel-dots">
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === current ? 'active' : ''}`}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

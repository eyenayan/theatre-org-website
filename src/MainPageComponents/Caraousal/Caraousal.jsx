import React, { useEffect, useState } from 'react';
import jnlg from "../../assets/jnlg.png";
import alk from "../../assets/alk.png";
import hj from "../../assets/hj.png";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [jnlg, alk, hj];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // 5 seconds interval

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div id="carouselExampleIndicators" className="relative h-66">
      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 flex space-x-3 -translate-x-1/2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-white' : 'bg-yellow-300'
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Slides */}
      <div className="relative w-full h-full overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="carousel-item flex-none w-full h-full">
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <button
        type="button"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 z-10"
        onClick={() => setCurrentIndex((currentIndex - 1 + slides.length) % slides.length)}
      >
        <span className="hidden">Previous</span>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
      </button>
      <button
        type="button"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 z-10"
        onClick={() => setCurrentIndex((currentIndex + 1) % slides.length)}
      >
        <span className="hidden">Next</span>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Carousel;

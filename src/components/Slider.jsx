import React, { useState } from 'react';
import BussinessMan from '../assets/MovieImages/BussinessMan.jpg';
import KGF from '../assets/MovieImages/KGF.jpg';
import Pushpa from '../assets/MovieImages/Pushpa-1.jpg';
import Rangasthalam from '../assets/MovieImages/Rangasthalam.jpg';
const locations = [
  {
    name: 'BusinessMan',
    country: 'India',
    image: BussinessMan,
    bgImage: BussinessMan
  },
  {
    name: 'KGF',
    country: 'Indonesia',
    image: KGF,
    bgImage: KGF
  },
  {
    name: 'Pushpa',
    country: 'Switzerland',
    image: Pushpa,
    bgImage: Pushpa
  },
  {
    name: 'Rangasthalam',
    country: 'Turkey',
    image: Rangasthalam,
    bgImage: Rangasthalam
  }
];

function Card({ location, onClick }) {
  return (
    <div
      className="flex-shrink-0 mx-2 w-64 h-70 rounded-lg overflow-hidden relative cursor-pointer"
      onClick={onClick}
    >
      <img src={location.image} className="w-full h-full object-cover" alt={location.name} />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-xl font-semibold">{location.name}</h3>
        <p>{location.country}</p>
      </div>
    </div>
  );
}

function AdvancedSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % locations.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + locations.length) % locations.length);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url('${locations[currentIndex].bgImage}')`, width: '100%', height: '100%' }}
      ></div>

      <div className="absolute inset-0 bg-black bg-opacity-30">
        <div className="absolute left-20 top-1/4 w-1/3">
          <h1 className="text-5xl font-bold text-white mb-4">{locations[currentIndex].name}</h1>
          <p className="text-white mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded cursor-pointer">Explore</button>
        </div>

        <div className="absolute right-20 top-1/4 w-1/2 flex space-x-4 overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 256}px)` }}
          >
            {locations.map((location, index) => (
              <Card
                key={location.name}
                location={location}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>

        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2">
          {locations.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full bg-white cursor-pointer ${index === currentIndex ? 'w-4 bg-blue-500' : ''}`}
              onClick={() => goToSlide(index)}
            ></div>
          ))}
        </div>

        <div className="absolute bottom-8 right-8 flex space-x-4">
          <button onClick={prevSlide} className="bg-white bg-opacity-20 p-2 rounded-full cursor-pointer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button onClick={nextSlide} className="bg-white bg-opacity-20 p-2 rounded-full cursor-pointer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdvancedSlider;

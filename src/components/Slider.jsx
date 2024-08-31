import  { useEffect, useState } from 'react';
import axios from 'axios';

function Card({ location, onClick, isActive }) {
  return (
    <div
      className={`flex-shrink-0 w-64 h-70 rounded-lg overflow-hidden relative cursor-pointer transition-all duration-300 ${isActive ? 'scale-105' : 'scale-90 opacity-70'}`}
      onClick={onClick}
    >
      <img src={location.image} className="w-full h-full object-cover" alt={location.title} style={{ objectFit: 'cover' }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-xl font-semibold">{location.title}</h3>
        <p>{location.language}</p>
      </div>
    </div>
  );
}

function AdvancedSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [locations, setLocations] = useState([]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % locations.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + locations.length) % locations.length);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:4000/movie/gettopmovies');
        setLocations(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url('${locations[currentIndex]?.image}')` }}
      ></div>

      <div className="absolute inset-0 bg-black bg-opacity-30">
        <div className="absolute left-4 top-1/4 md:left-20 md:top-1/4 lg:left-20 lg:top-1/4 md:w-1/3 lg:w-1/3 p-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{locations[currentIndex]?.title}</h1>
          <p className="text-sm md:text-base lg:text-lg text-white mb-6">{locations[currentIndex]?.description}</p>
          <button className="bg-blue-600 text-white px-4 md:px-6 py-2 rounded cursor-pointer">Explore</button>
        </div>

        <div className="hidden md:block absolute right-4 top-20 md:right-20 md:top-1/4 lg:right-20 lg:top-20 md:w-1/2 lg:w-1/2 overflow-hidden">
       
          <div className="flex w-full transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 30}%)` }}>
            {locations.map((location, index) => (
              <Card
                key={location._id}
                location={location}
                onClick={() => goToSlide(index)}
                isActive={index === currentIndex}
                />
            ))}
          </div>
        </div>

        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2 md:left-8 lg:left-8">
          {locations.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full bg-white cursor-pointer ${index === currentIndex ? 'w-4 bg-blue-500' : ''}`}
              onClick={() => goToSlide(index)}
              ></div>
          ))}
        </div>

        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex space-x-4">
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

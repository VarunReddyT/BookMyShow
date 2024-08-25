import React from 'react';
import './css/home.css';
import BussinessMan from '../assets/MovieImages/BussinessMan.jpg';
import KGF from '../assets/MovieImages/KGF.jpg';
import Pushpa from '../assets/MovieImages/Pushpa-1.jpg';
import Rangasthalam from '../assets/MovieImages/Rangasthalam.jpg';
import ExpandableCardDemo from './blocks/expandable-card-demo-grid';
import AdvancedSlider from './Slider';
const movies = [BussinessMan, KGF, Pushpa, Rangasthalam];

export default function Home() {
  return (
    <div className="scroller">
      <AdvancedSlider />
      <ExpandableCardDemo />
      <ul className='movie-list scroller_inner'>
        {movies.map((movie, index) => (
          <li key={index}><img src={movie} alt={`Movie ${index}`} /></li>
        ))}
      </ul>
    </div>
  );
}

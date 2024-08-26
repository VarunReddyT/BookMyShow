import React from 'react';
import './css/home.css';
import ExpandableCardDemo from './blocks/expandable-card-demo-grid';
import AdvancedSlider from './Slider';
export default function Home() {
  return (
    <div className="">
      <AdvancedSlider />
      <ExpandableCardDemo />
    </div>
  );
}

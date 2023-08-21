import React from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';
import heroimg from '../assets/Hero.png';
import logoText from '../assets/Logo-text.png';

function Hero() {
  return (
    <div className='hero-section'>
      <div className='heroimg'>
        <img src={heroimg} alt='fairytale Kingdom' />
        <div className='overlay'>
          <p>Embark on a magical journey through the world of stories and imagination.</p>
          <Link to='/register' className='get-started-button'>
            Get Started Here!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;

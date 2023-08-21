import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import react-icons components
import './LandingPage.css';
import logo from '../assets/icon.png'

function Footer() {
  return (
    <div className='footer'>
      <div className="column">
        <div className="icon">
          <img src={logo} alt="Icon" />
        </div>
      </div>
      <div className="column">
        <div className="social-media">
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaInstagram /></a>
        </div>
      </div>
      <div className="copyright">
        &copy; 2023 LexiRealm. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;

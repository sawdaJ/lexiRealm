import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import feature1 from '../assets/feature1.png'
import feature2 from '../assets/feature2.png'
import feature3 from '../assets/feature3.png'
import './LandingPage.css'

function Features() {
  return (
    <div className='features'>
       <div className="heading">
          Features
        </div>
      <Carousel showThumbs={false} className="carousel-container">
      <div className="feature">
        <div className="left">
         <img src={feature1} alt="" />
        </div>
        <div className="right">
          <div className="title">
          Library of Engaging Ebooks
          </div>
          <div className="description">
          Dive into a world of captivating stories curated for children of all ages. Our expansive collection features a diverse range of genres, from adventurous tales to heartwarming classics, fostering a love for reading in your child
          </div>
        </div>
      </div>

      <div className="feature">
        <div className="left">
        <div className="title">Quizzes for Comprehension</div>
          <div className="description">Boost your child's comprehension skills with our interactive quizzes. These thoughtfully designed assessments not only test their understanding of the stories but also make reading an engaging learning experience.</div>
        
        </div>
        <div className="right">
          <img src={feature2} alt="" />
        </div>
      </div>

      <div className="feature">
        <div className="left">
         <img src={feature3} alt="" />
        </div>
        <div className="right">
          <div className="title">Comprehensive Parent Dashboard</div>
          <div className="description">Stay actively involved in your child's learning journey through our intuitive parent dashboard. Monitor their progress, track quiz scores, and gain insights into their reading habits. It's never been easier to be part of your child's educational growth.</div>
        </div>
      </div>

    </Carousel>
    </div>
  )
}

export default Features

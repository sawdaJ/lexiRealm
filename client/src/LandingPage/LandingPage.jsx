import React from 'react'
import Header from '../Navigation/Header'
import Hero from './Hero'
import Features from './Features'
import Booklist from '../Books/BookList'
import Footer from './Footer'

function LandingPage() {
  return (
    <div>
        <Header />
        <Hero />
        <Features />
        <Booklist />
        <Footer />
      
    </div>
  )
}

export default LandingPage


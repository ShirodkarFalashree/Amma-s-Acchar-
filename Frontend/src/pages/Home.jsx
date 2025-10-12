import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../Sections/Hero'
import TopRated from '../Sections/TopProducts'
import OverallTestimonials from '../Sections/OverallTestimonials'
import Contact from '../Sections/Contact'

const Home = () => {
  return (
    <div>
    <Hero/>
    <TopRated/>
    <OverallTestimonials/>
    <Contact/>
    </div>
  )
}

export default Home
import React from 'react'
import HeroSection from './HeroSection'
import FlashSale from './FlashSale'
import Categories from './Categories'
import Products from './Products'

const HomePageSection = () => {
  return (
    <div>
        <HeroSection/>
        <FlashSale/>
        <Categories/>
        <Products/>
    </div>
  )
}

export default HomePageSection
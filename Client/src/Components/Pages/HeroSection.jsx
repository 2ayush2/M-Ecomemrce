import React from 'react'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import banner1 from '../../assets/banner/cars.svg'
import banner2 from '../../assets/banner/cloth.jpg'
import banner3 from '../../assets/banner/electronics.jpg'
import banner4 from '../../assets/banner/online shop.jpg'
import banner5 from '../../assets/banner/sale.jpg'



const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '500px',
  width: '1400px'
}
const slideImages = [
  {
    url: `${banner1}`
  },
  {
    url: `${banner2}`
  },
  {
    url: `${banner3}`
  },
  {
    url: `${banner4}`
  },
  {
    url: `${banner5}`
  },
];

const HeroSection = () => {
    return (
      <div className="slide-container py-4">
        <Slide>
         {slideImages.map((slideImage, index)=> (
            <div key={index}>
              <div className='mx-auto' style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
              </div>
            </div>
          ))} 
        </Slide>
      </div>
    )
}

export default HeroSection;
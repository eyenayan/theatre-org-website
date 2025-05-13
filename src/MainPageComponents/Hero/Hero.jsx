import React from 'react'
import blackLogo from "../../assets/side-image.png"
import goldenLogo from "../../assets/logo.png"
const Hero = ({theme}) => {
  return (

    <div className="dark:bg-black
    dark:text-white duration-300 relative-z-20">

        <div className="container min-h-300px flex">

        <div className="grid place-items-center grid-cols-1
        sm:grid-cols-2 mb-7 mt-7">

<div 
 className={`order-1 sm:order-2 ${theme === "dark" ? "relative" : "relative"}`}>
  <img data-aos = "zoom-in"
data-aos-duration="1500"
    src={theme === "dark" ? goldenLogo : blackLogo}
    alt=""
    className="max-h-[170px] sm:scale-125 drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)]"
  />
</div>

<>
        <div className='order-2 sm:order-1 space-y-5 sm:pr-32'>
            <p data-aos="fade-up"
            data-aos-delay="600"
            className='text-primary text-2xl font-sugar-magic'>Ruia Natyavalay</p>
            <h1 data-aos="fade-up"
            data-aos-delay="500"
            className='text-3xl lg:text-7xl font-semibold font-sans'>रुईया नाट्यवलय</h1>
            <p data-aos="fade-right" 
            data-aos-delay="500" className='font-sans'>
             89 years of legacy in Theatre & Performing Arts.<br/> Theatre Organisation of Ruia College.</p>
            {/*<button
            data-aos="fade-up"
            data-aos-duration="1500"
             className='btn bg-primary text-black px-6 py-2
            rounded-md hover:bg-primary/80 duration-300 mb-6'></button>*/}
            
            </div>
            </>
        </div>
      </div>
    </div>
    
  )
}

export default Hero
import React from 'react'
import goldenLogo from "../../assets/logo.png"
import { useNavigate } from "react-router-dom";

const About = () => {
    const navigate = useNavigate();
const handleClick = () => {
    navigate("/aboutus");
  };
  return (
    <div className='dark:bg-dark bg-slate-100
     dark:text-white duration-300
    sm:min-h-[400px] sm:grid sm:place-items-center'>
        <div className="container">
            <div className="grid grid-cols-1
            sm:grid-cols-2 place-items-center">
                <div
                data-aos="slide-right"
                data-aos-duration="1500"
                >
                    <img src={goldenLogo} alt=''
                    className='sm:scale-105
                    sm:-translate-x-11 max-h-[200px] 
                    drop-shadow-[2px_8px_5px_rgba(0,0,0,1)]' />
                </div>
                <div>
                    <div className='space-y-4 sm:p-16 pb-4'>
                        <h1 data-aos="fade-up" className='text-3xl
                        sm:text-4xl font-bold
                        font-sans'>
                            About us</h1>
                            <p data-aos="fade-up">
                                Ruia Natyavalay is an 89+ year old esteemed theatre Organisation of the Ramnarain Ruia Autonomous College, Matunga. 
                            </p>

                            <p data-aos="fade-up">
                                The rich legacy allows us to maintain industry level standards in our production and provide first hand experience to theatre ethusiasts.
                            </p>
                            <button onClick={handleClick} data-aos="fade-up"
                            className='button-outline  '>Know more</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About
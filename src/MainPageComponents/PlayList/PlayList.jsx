import React, { useEffect } from 'react';
import level from "../../assets/level.png";
import tappa from "../../assets/tappa.png";
import steps from "../../assets/steps.png";
import door from "../../assets/door.png";
import flat from "../../assets/flat.png";
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles
import { useNavigate } from "react-router-dom";

const SetListData = [
  {
    name: "Level",
    price: 300,
    image: level,
    aosDelay: "0",
    link : "/set",
  },
  {
    name: "Tappa",
    price: 150,
    image: tappa,
    aosDelay: "500",
    link : "/set",
  },
  {
    name: "Flat",
    price: 300,
    image: flat,
    aosDelay: "1000",
    link : "/set",
  },
  {
    name: "Door Frame",
    price: 200,
    image: door,
    aosDelay: "0",
    link : "/set",
  },
  {
    name: "Door frame(doors)",
    price: 300,
    image: door,
    aosDelay: "500",
    link : "/set",
  },
  {
    name: "Steps",
    price: 300,
    image: steps,
    aosDelay: "1000",
    link : "/set",
  },
];

const PlayList = () => {
  useEffect(() => {
    AOS.init(); // Initialize AOS when the component mounts
  }, []);

const navigate = useNavigate();
const Navset = () => {
    navigate("/set");
  };

  return (
    <div className='pb-24 pt-12 bg-white dark:bg-dark dark:text-white'>
      <div className="container">
        <h1 data-aos="fade-up" className='text-3xl sm:text-4xl font-semibold font-sans mb-3'>
          Get set, Rent your Set!
        </h1>
        <p data-aos="fade-up" className='text-sm pb-10'>
          We provide set on rent for other open theatre organisations at reasonable rates.{" "}
          <a className="text-blue-500" href='https://mail.google.com/mail/u/0/?fs=1&to=nayansrchavare@gmail.com&tf=cm'>Contact</a> for any queries!
        </p>

        <div>
          
          <a href="/set"  className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 '>
            {SetListData.map((data, index) => {
              return (
                <div
                  key={index}
                  className='space-y-3 border-2 border-gray-300 hover:border-primary p-3 rounded-xl relative group'
                  data-aos="fade-up"
                  data-aos-delay={data.aosDelay} // Apply the aosDelay here
                >
                  <div className='w-full h-[120px]'>
                    <img
                      className='w-full h-[120px] object-contain sm:translate-x-8 group-hover:sm:translate-x-16 duration-700'
                      src={data.image}
                      alt={data.name}
                    />
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-primary font-semibold">{data.name}</h1>
                    <div className="flex justify-between items-center text-xl font-semibold">
                      <p>₹{data.price}/Day</p>
                      <a href="/set" className='text-blue-300 hover:text-red-500'>Details</a>
                    </div>
                  </div>
                  
                </div>
              );
            })}
          </a>
        </div>

        <div className='grid place-items-center mt-8'>
          <button onClick={Navset} data-aos="fade-up" className='button-outline'>
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayList;

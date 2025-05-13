import React from 'react'
import { BsAwardFill } from "react-icons/bs";;
import { GiWoodenChair } from "react-icons/gi";
import { FaFileArchive } from "react-icons/fa";

const skillsData = [
    {
       name: "Our Rich Legacy",
       icon: (
        <BsAwardFill className="text-5xl
        text-primary group-hover:text-black
        duration-300" />
       ),
       link: "/aboutus",
       description: "Have a Look at our Glorious past",
       aosDelay: "0",
    },
    {
        name: "Set Renting",
        icon: (
         <GiWoodenChair className="text-5xl
         text-primary group-hover:text-black
         duration-300" />
        ),
        link: "/set",
        description: "Rent set to get set!",
        aosDelay: "500",
     },
     {
        name: "Archives",
        icon: (
         <FaFileArchive
          className="text-5xl
         text-primary group-hover:text-black
         duration-500" />
        ),
        link: "/archive",
        description: "Reference intact, real infact! ",
        aosDelay: "1000",
     }

]
const Services = () => {
  return (
    <>
      <span id="about"></span>
    <div className='py-14 dark:bg-black
    dark:text-white sm:min-h-[600px] sm:grid
    sm:place-items-center'>
        <div className="container">
            <div className="pb-12">
                <h1 className='text-3xl font-semibold
                text-center font-sans sm:text-4xl'>
                    We, at Ruia Natyavalay 
                </h1>
            </div>
            <div className="grid grid-cols-1
            sm:grid-cols-2 md:grid-cols-3 gap-4">
                {skillsData.map((skill) => (
                <div
                    key={skill.name}
                    data-aos="fade-up"
                    data-aos-delay={skill.aosDelay}
                    className='card text-center group space-y-3 sm:space-y-6 p-4
                    sm:py-16 bg-dark hover:bg-primary
                    duration-300 text-white hover:text-black
                    rounded-lg'
                    >
                        <div className='grid place-items-center'>{skill.icon}</div>
                        <h1>{skill.name}</h1>
                        <p>{skill.description}</p>
                        <a
                  href={skill.link}
                  className="inline-block text-lg font-semibold py-3 text-primary group-hover:text-black duration-300"
                >
                  Learn more
                </a>
                    </div>
                ))}
            </div>
        </div>
    </div>
    </>
  )
}

export default Services
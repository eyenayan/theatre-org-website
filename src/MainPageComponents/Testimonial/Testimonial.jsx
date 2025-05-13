import React from "react";
import ratnudada from "../../assets/ratnudada.png";
import bhojudada from "../../assets/bhojudada.png";
import shiryadada from "../../assets/shiryadada.png";
import prajaktdada from "../../assets/prajaktdada.png";
import chattydada from "../../assets/chattydada.png";
import kshiteejog from "../../assets/kshiteejog.png"

const testimonialData = [
  {
    name: "Ramchandra Gaonkar",
    image: ratnudada,
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    aosDelay: "0",
  },
  {
    name: "Aniket Patil",
    image: shiryadada,
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    aosDelay: "400",
  },
  {
    name: "Rajratna Bhojane",
    image: bhojudada,
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    aosDelay: "1000",
  },
  {
    name: "Prajakt Deshmukh",
    image: prajaktdada,
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    aosDelay: "0",
  },
  {
    name: "Shubhankar Tawade",
    image: chattydada,
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    aosDelay: "400",
  },
  {
    name: "Kshitee Jog",
    image: kshiteejog,
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    aosDelay: "1000",
  },
];

const Testimonial = () => {
  return (
    <div className="dark:bg-black dark:text-white py-14 sm:pb-24">
      <div className="container">
        {/* Header Section */}
        <div className="space-y-4 pb-12">
          <p
            data-aos="fade-up"
            className="text-3xl font-semibold text-center sm:text-4xl font-sans"
          >
            What Professionals Say About Us!
          </p>
          <p data-aos="fade-up" className="text-center sm:px-44">
            Industry Professionals who actively interact with Ruia Natyavalay
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-black dark:text-white">
          {testimonialData.map((testimonial) => (
            <div
              key={testimonial.name}
              data-aos="fade-up"
              data-aos-delay={testimonial.aosDelay}
              className="card text-center group space-y-4 sm:space-y-6 p-6 sm:py-12 dark:bg-white/20 bg-gray-100 duration-300 rounded-lg shadow-lg"
            >
              {/* Image */}
              <div className="grid place-items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="rounded-full w-28 h-28 border-4 border-primary shadow-md"
                />
              </div>

              {/* Description */}
              <p className="text-lg italic text-gray-700 dark:text-gray-300">
                "{testimonial.description}"
              </p>

              {/* Name */}
              <p className="text-lg font-semibold text-primary">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;

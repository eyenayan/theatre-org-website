import React from "react";

const Contact = () => {

  const handleContactClick = () => {
    const gmailComposeURL = 'https://mail.google.com/mail/?view=cm&fs=1&to=nayansrcavare@gmail.com';
  window.open(gmailComposeURL, '_blank');
};

  return (
    <>
      <span id="contact"></span>
      <div data-aos="fade-right" className="dark:bg-black dark:text-white py-14">
        <div className="container ">
          <div className="grid grid-cols-1 sm:grid-cols-3 
          gap-6 bg-gray-900 py-8 px-6">
            <div className="col-span-2 space-y-3">
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                Want to collaborate on your upcoming Projects? Connect to us!
              </h1>
              <p className="text-gray-400">
                Mail us your resume, script, ideas, concepts right here!{" "}
              </p>
            </div>
            <div className="flex justify-center items-center">
      <button
        onClick={handleContactClick}
        className="inline-block font-semibold py-2 px-6 bg-primary
                 text-white hover:bg-primary/80 hover:text-black 
                 duration-200 tracking-widest uppercase "
      >
        Contact
      </button>
    </div>
              
          
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
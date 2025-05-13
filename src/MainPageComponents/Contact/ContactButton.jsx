import React from 'react';

const ContactButton = () => {
  const handleContactClick = () => {
    const gmailComposeURL = 'https://mail.google.com/mail/?view=cm&fs=1&to=nayansrchavare@gmail.com';
  window.open(gmailComposeURL, '_blank');
};

  return (
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
  );
};

export default ContactButton;

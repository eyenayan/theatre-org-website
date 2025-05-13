import React, { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from "../../MainPageComponents/Navbar/Navbar";

// Sample Timeline Data
const timelineData = [
  { year: ("1953-54"), title: 'Foundation of Dramatic Association', description: 'The dramatic association was founded by V.H.Kulkarni and the Chairman was Prof.Yardi. Did an English Play named - "Mrs. Adis"' },
  { year: ("1954-55"), title: 'Inauaragation on 19th Aug 1954', description: 'Inaugaration was done by Shri Raj Kapoor.Mono-acting and singing competetions only held! No plays were directed this year.' },
  { year: ("1976-77"), title: 'Now Called "Dramatic Circle" of Ruia!', description: 'Started of with Performing at Youth Fest! "Pidi","Murder of God" was presented there. Stood 1st and 2nd at Youth Fest Respectively,while Pidi stood 3rd at INT.' },
  { year: ("1977"), title: 'Play - "Pundalik Shettiwar"', description: 'Won 2nd prize in INT and Unmesh' },
  { year: ("1985-86"), title: 'A Rewarding Year indeed!', description:'"Koleeya Raja" a play won 1st prizes in INT,Unmesh,Youth respectively and was telecasted on Doordarshan!' },
  { year: ("1990-91"), title: 'Play - "Sati" One of the Ruia`s most iconic plays! ', description: 'Ruias Sawai Winning play and INT,Unmesh and others best ekankika plus actor & actress prizes (Sanjay Narvekar & Sonia Mule).' },
  { year: ("1996-97"), title: 'Kedar Shinde written and Directed Play - "Sangovangi', description: 'Won 2nd prize in INT & Mrugjal and 1st in Unmesh' },
  { year: ("1998-99"), title: '2 Play - "Thamb Thamb Mhanatana & Rajayacha Putra Aparaadhi dekha"', description: 'Kshitee Jog won Actng prize in first, while 2nd play Written and Directed by Sanjay Narvekar come 1st in Sawali Ekankika Spardha. ' },
  { year: ("2000-2001"), title: '25 Years of Ruia Natyavalay!', description: 'Not Only Plays, but Natyavachan Mohotsav, Natyatriveni etc Programmes at Ruia Natyavalay added the Golden Covering to Natayavalays Aura' },
  { year: ("2004-2005"), title: 'Nishikant Kamat Directed Play - "Bhai sange Annala" and "Daughters of Maharashtra"', description: '3rd prize for Writer Director awards and 2nd best actor to Shrikant Kelkar' },
  { year: ("2006-2007"), title: 'The Very Iconic - GA.MA.BHA.NA.', description: 'written by Hemant Mahajan (the then FYBA student of Ruia)and directed by Santosh Verulkar is one of the most iconic and legendary plays of Ruia Natyavalay. Won almost all prizes of the entire year with Ruia winning SAWAI after almost 17 years!' },
  { year: ("2008-2009"), title: 'Play - "Mukidham"', description: 'Already defining the olden period of Ruia natyavalay yet another Ruias most successful play. Written by Ambar Hadap and directed by Abhijeet Khade. Won Many Many Prizes.' },
  { year: ("2009-2010"), title: 'Play - "Ananya"', description: 'Rajesh Shinde written and Pratap Phad directed won 1st place in Mrugjal and 2nd in Sawai and Sakal Karandak with lot many prizes' },
  { year: ("2018-2019"), title: 'Play - "Ekadashavtar"', description: 'Ruias New age icon play- Written by Prajakt Deshmukh and Directed by Ranjit Patil won many prizes and was selected to be performed at META, Delhi.' },
  { year: 2019, title: 'Ruiank', description: 'Ruia Natyavalay held its one of a kind Drama Festival which turned out to be a very Celebrated initiative!' },
  { year: ("2019-2020"), title: 'Play - "Budrukwadicha Maruti Baatla"', description: '!st at INT, Loksatta Lokankika and 2nd at Sawai Ekankika Spardha happened mantaining the legacy of Ekadashavtar' },
];

const AboutUs = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [activeIndex, setActiveIndex] = useState(0);

  const timelineRef = useRef(null);

  useEffect(() => {
    const element = document.documentElement;
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  useEffect(() => {
    AOS.init({ duration: 1500, delay: 200 });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".timeline-section");
      let index = 0;

      sections.forEach((section, i) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5) {
          index = i;
        }
      });

      setActiveIndex(index);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />
      <div className="bg-gray-100 dark:bg-dark text-gray-900 dark:text-white relative">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-8" data-aos="fade-up">
            Take a Look at Ruia Natyavalay's Legendary Past!
          </h1>
          <div className="relative flex">
            {/* Timeline */}
            <div className="w-1 bg-gray-300 dark:bg-gray-600 absolute top-0 left-8 h-full">
              <div
                ref={timelineRef}
                className="absolute bg-yellow-500 w-1 transition-all duration-500 ease-linear"
                style={{
                  height: `${((activeIndex + 1) / timelineData.length) * 100}%`,
                }}
              ></div>
            </div>

            {/* Timeline Content */}
            <div className="pl-20 space-y-16">
              {timelineData.map((data, index) => (
                <div
                  key={index}
                  className="timeline-section min-h-[80vh] flex items-center"
                  data-aos="fade-up"
                  style={{ animationDelay: `${index * 300}ms` }}
                >
                  <div
                    className={`p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out ${
                      activeIndex === index ? "scale-105" : "scale-100"
                    }`}
                  >
                    <h2 className="text-2xl font-semibold">{data.year}</h2>
                    <h3 className="text-3xl mt-2 text-yellow-400">{data.title}</h3>
                    <p className="text-lg mt-4 text-yellow-100">{data.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;

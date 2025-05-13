import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../../MainPageComponents/Navbar/Navbar";

const archiveData = [
  {
    year: 2024,
    title: "Janata Nagarche Langde Ghode",
    director : "Ramchandra Gaonkar, Akash Shinde",
    description: "JNLG is a musical satire where 2 slumdog kids fight for their rights and their struggle to earn a good living against the millionaires and rulers of the nation.",
    images: [
      "https://via.placeholder.com/800x400?text=2024+Image+1",
      "https://via.placeholder.com/800x400?text=2024+Image+2",
    ],
    youtubeLinks: ["https://www.youtube.com/embed/IqlEQ2yvbNQ?si=LS5u7QbhWZwUMitp"],
    localVideos: ["/videos/2024/play.mp4"],
  },
  {
    year: 2023,
    title: "Vaari",
    director : "Aniket Patil",
    description: "When Rakhma (orphan child) and her grandfather Aaba are pursuaded to go for Vari this time, The play dwells around the importance of various relations in a family and as Aaba and rakhma visit Vari, the drama unfolds!",
    images: [
      "https://via.placeholder.com/800x400?text=2023+Image+1",
      "https://via.placeholder.com/800x400?text=2023+Image+2",
    ],
    youtubeLinks: [],
    localVideos: [],
  },
  {
    year: 2023,
    title: "Hail Jungistan",
    director : "Omkar Masurkar",
    description: "A Fiction-Thriller play that portrays the condition of three brainwashed soldiers sent on a mission in the midst of a war between Sangrami and Jungistan unknown about the fact that the War ended 25 years ago! ",
    images: [
      "https://via.placeholder.com/800x400?text=2023+Image+1",
      "https://via.placeholder.com/800x400?text=2023+Image+2",
    ],
    youtubeLinks: ["https://www.youtube.com/embed/9BuUqLnj0d0?si=r31fzvAZNNNKSvvn"],
    localVideos: [],
  },
  {
    year: 2022,
    title: "Are La Kare",
    director : "Rajratna Bhojane",
    description: "A Horror-Thriller Play that revolves around an Adivasi Settlement who retaliate with a mysterious masterplan just to claim their land and preserve their God (trees of the forest) while an housing ministry officer strugging with claiming the land for new Project!",
    images: [
      "https://via.placeholder.com/800x400?text=2023+Image+1",
      "https://via.placeholder.com/800x400?text=2023+Image+2",
    ],
    youtubeLinks: ["https://www.youtube.com/embed/DWML1Yu2VjY?si=5rccLVAfcOrpy0rh"],
    localVideos: [],
  },

  {
    year: 2019,
    title: "Budrukwadicha Maruti Batla",
    director : "Ranjit Patil, Ajay Kamble",
    description: "A mysterious tragic death of a school going boy 'Maruti', leads to a bumper drama in Budrukwadi as the 13th day death rituals of Maruti and`'Conflict-free Village award ceremony`' collides on the same day, and the real reason of Maruti's death unfolds!",
    images: [
      "https://via.placeholder.com/800x400?text=2023+Image+1",
      "https://via.placeholder.com/800x400?text=2023+Image+2",
    ],
    youtubeLinks: ["https://www.youtube.com/embed/vSxUE0yO81g?si=XJlMDtfUVXUCZMh5"],
    localVideos: [],
  },
  {
    year: 2018,
    title: "Ekadashavtar",
    director : "Ranjit Patil",
    description: "An epic story of resilience and redemption.",
    images: [
      "https://via.placeholder.com/800x400?text=2023+Image+1",
      "https://via.placeholder.com/800x400?text=2023+Image+2",
    ],
    youtubeLinks: ["https://www.youtube.com/embed/XQad0dnIBZc?si=daam8EY1s1bvPxV1",
     "https://www.youtube.com/embed/4VM6Zi0Sh2s?si=L9wsjDKB9pLlnb72",
     "https://www.youtube.com/embed/cQ7K-HJAvFA?si=U7bl-cSUAEDWNN0C"],
    localVideos: [],
  },
  {
    year: 2017,
    title: "Sangeet Ghaagre ke Pichhe",
    director : "?",
    description: "An epic story of resilience and redemption.",
    images: [
      "https://via.placeholder.com/800x400?text=2023+Image+1",
      "https://via.placeholder.com/800x400?text=2023+Image+2",
    ],
    youtubeLinks: ["https://www.youtube.com/embed/abcd1234"],
    localVideos: [],
  },

  {
    year: 2017,
    title: "Gardish",
    director : "Aniket Patil",
    description: "An epic story of resilience and redemption.",
    images: [
      "https://via.placeholder.com/800x400?text=2023+Image+1",
      "https://via.placeholder.com/800x400?text=2023+Image+2",
    ],
    youtubeLinks: ["https://www.youtube.com/embed/abcd1234"],
    localVideos: [],
  },

  {
    year: 2017,
    title: "Ringan",
    director : "Sharvari Bobhate, Ameya Narkar",
    description: "An epic story of resilience and redemption.",
    images: [
      "https://via.placeholder.com/800x400?text=2023+Image+1",
      "https://via.placeholder.com/800x400?text=2023+Image+2",
    ],
    youtubeLinks: ["https://www.youtube.com/embed/RrtcflR0nZ0?si=UEje3woUYdQwBL1Y"],
    localVideos: [],
  },

  {
    year: 2016,
    title: "Laila on the rocks",
    director : "Lalit Prabhakar, Tushar Gaware",
    description: "An epic story of resilience and redemption.",
    images: [
      "https://via.placeholder.com/800x400?text=2023+Image+1",
      "https://via.placeholder.com/800x400?text=2023+Image+2",
    ],
    youtubeLinks: ["https://www.youtube.com/embed/abcd1234"],
    localVideos: [],
  },
  {
    year: 2015,
    title: "Sushegaat",
    director : "Abhijeet Khade",
    description: "An epic story of resilience and redemption.",
    images: [
      "https://via.placeholder.com/800x400?text=2023+Image+1",
      "https://via.placeholder.com/800x400?text=2023+Image+2",
    ],
    youtubeLinks: ["https://www.youtube.com/embed/abcd1234"],
    localVideos: [],
  },
];

const Archive = () => {
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") || "light"
  );

  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="container mx-auto px-4 py-8">
          <h1
            className="text-4xl font-bold text-center mb-8"
            data-aos="fade-up"
          >
            Archives
          </h1>
          {archiveData.map((data, index) => (
            <div
              key={data.year}
              className="mb-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
              data-aos="fade-up"
            >
              <h2 className="text-3xl font-semibold mb-4 text-primary">
                {data.year}: {data.title}
              </h2>
              <p className="text-lg text-blue-200 font-sans mb-3">Directed by: {data.director}</p>
              <p className="text-lg mb-6">{data.description}</p>

              {/* Carousel */}
              <div className="relative overflow-hidden rounded-lg shadow-md">
                <div className="w-full h-64 relative">
                  {data.images.map((image, i) => (
                    <img
                      key={i}
                      src={image}
                      alt={`Slide ${i + 1}`}
                      className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
                        i === 0 ? "opacity-100" : "opacity-0"
                      }`}
                      style={{
                        animation: `fade 5s ${i * 5}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* YouTube Videos */}
              {data.youtubeLinks.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-2xl font-semibold mb-4">YouTube Videos</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.youtubeLinks.map((link, i) => (
                      <iframe
                        key={i}
                        className="w-full h-50 sm:h-64 rounded-lg shadow-md"
                        src={link}
                        title={`YouTube Video ${i + 1}`}
                        frameBorder="1"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ))}
                  </div>
                </div>
              )}

             {/* Local Videos */}
{data.localVideos.length > 0 && (
  <div className="mt-6">
    <h3 className="text-2xl font-semibold mb-4">Local Videos</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {data.localVideos.map((video, i) => (
        <video
          key={i}
          controls
          className="w-full h-48 sm:h-64 rounded-lg shadow-md"
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ))}
    </div>
  </div>
)}

            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Archive;

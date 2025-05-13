import React, { useEffect } from 'react'
import Navbar from '../../MainPageComponents/Navbar/Navbar';
import Hero from '../../MainPageComponents/Hero/Hero';
import About from '../../MainPageComponents/About/About';
import Services from '../../MainPageComponents/Services/Services';
import PlayList from '../../MainPageComponents/PlayList/PlayList';
import AOS from "aos";
import "aos/dist/aos.css";
import Testimonial from '../../MainPageComponents/Testimonial/Testimonial';
import Contact from '../../MainPageComponents/Contact/Contact';
import Footer from '../../MainPageComponents/Footer/Footer';
import Carousel from '../../MainPageComponents/Caraousal/Caraousal';

const MainPage = () => {

  //darkmode feature
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme")?
     localStorage.getItem("theme"):"light");

const element = document.documentElement;
useEffect(() => {
  if(theme== "dark"){
    element.classList.add("dark");
    localStorage.setItem("theme","dark");
  }else{
    element.classList.remove("dark");
    localStorage.setItem("theme","light");
  }
},[theme]);

//AOS initialisation
React.useEffect(() => {
  AOS.init({
    offset: 100,
    duration: 800,
    easing: "ease-in-sine",
    delay: 50,
  })
  AOS.refresh();
}, [])


  return (
     <div className="bg-white dark:bg-black
      dark:text-white text-black overflow-x-hidden">

<Navbar theme={theme} setTheme= {setTheme}  />  
<Carousel />
<Hero theme = {theme} />
<About /> 
<Services />
<PlayList />
<Testimonial />
<Contact />
<Footer />
  </div>
  )
}

export default MainPage
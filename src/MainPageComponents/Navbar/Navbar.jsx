import React from 'react';
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig"; // Import Firebase auth
import { signOut } from "firebase/auth"; // Import signOut function from Firebase

const NavLinks = [
  { id: 1, name: "Home", link: "/#" },
  { id: 2, name: "Set", link: "/set" },
  { id: 3, name: "About Us", link: "/aboutus" },
  { id: 4, name: "Archive", link: "/archive" },
  { id: 5, name: "Alumni", link: "/alumni" },
];

const Navbar = ({ theme, setTheme }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user from Firebase
      navigate("/login"); // Navigate to the login page after sign-out
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 shadow-md bg-white dark:bg-dark dark:text-white duration-300 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2">
            <header>
              <h1 className="text-2xl italic font-mukta">रुईया नाट्यवलय</h1>
            </header>
            <div className="hidden md:block">
              <ul className="flex items-center gap-10">
                {NavLinks.map(({ id, name, link }) => (
                  <li key={id} className="py-2">
                    <a
                      href={link}
                      className="py-1 hover:border-b-2 hover:text-primary hover:border-primary transition-colors duration-500 text-xl font-medium"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-6">
              <button
                onClick={handleLogout}
                className="bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors duration-300"
              >
                Logout
              </button>
              {theme === "light" ? (
                <BiSolidMoon
                  onClick={() => setTheme("dark")}
                  className="text-xl cursor-pointer"
                />
              ) : (
                <BiSolidSun
                  onClick={() => setTheme("light")}
                  className="text-xl cursor-pointer"
                />
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="pt-16 bg-black"></div>
    </>
  );
};

export default Navbar;

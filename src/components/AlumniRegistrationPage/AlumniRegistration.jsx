import React, { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { sendEmail } from "../../utils/emailService.js"; // Email sending utility
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "../../MainPageComponents/Navbar/Navbar";
import alumnibg from "../../assets/alumnibg.jpg";
const AlumniRegistration = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    admissionYear: "",
    graduationYear: "",
    favoriteMemory: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Store data in Firestore
      await addDoc(collection(db, "alumni"), formData);

      // Send confirmation email
      await sendEmail(formData);

      setMessage("Registration successful! Redirecting...");
      
      // Delay navigation slightly to show success message
      setTimeout(() => {
        navigate("/alumnilist"); // Navigate to AlumniList page
      }, 2000); 

      // Reset form
      setFormData({
        name: "",
        email: "",
        admissionYear: "",
        graduationYear: "",
        favoriteMemory: "",
      });
    } catch (error) {
      console.error("Error registering alumni:", error);
      setMessage("Error: Could not register. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />
      <div  className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 dark:text-white px-4 bg-cover bg-no-repeat w-full"
       style={{ backgroundImage: `url(${alumnibg})` }}
    > 
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        
          <h2 className="text-3xl font-bold text-center text-primary mb-4">
            Alumni Registration
          </h2>

          {message && (
            <p className="text-center text-green-600 dark:text-green-400">
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block font-semibold">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Admission Year */}
            <div>
              <label className="block font-semibold">Year of Admission</label>
              <input
                type="number"
                name="admissionYear"
                value={formData.admissionYear}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Graduation Year */}
            <div>
              <label className="block font-semibold">Year of Graduation</label>
              <input
                type="number"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Favorite Memory */}
            <div>
              <label className="block font-semibold">Your Favorite Memory</label>
              <textarea
                name="favoriteMemory"
                value={formData.favoriteMemory}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-dark transition"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AlumniRegistration;

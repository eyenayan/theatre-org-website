import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Navbar from "../../MainPageComponents/Navbar/Navbar";

const AlumniList = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "alumni"));
        const alumniList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAlumni(alumniList);
      } catch (error) {
        console.error("Error fetching alumni data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, []);

  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white px-4 py-10">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-6">
            Registered Alumni's
          </h2>

          {loading ? (
            <p className="text-center text-lg">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {alumni.length > 0 ? (
                alumni.map((alumnus) => (
                  <div
                    key={alumnus.id}
                    className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 space-y-3"
                  >
                    <h3 className="text-xl font-bold text-primary">
                      {alumnus.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      📧 {alumnus.email}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      🎓 Admission Year: <strong>{alumnus.admissionYear}</strong>
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      🎓 Graduation Year: <strong>{alumnus.graduationYear}</strong>
                    </p>
                    <p className="italic text-gray-700 dark:text-gray-400">
                      🏆 Favorite Memory: "{alumnus.favoriteMemory}"
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 dark:text-gray-300 col-span-full">
                  No alumni have registered yet.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AlumniList;

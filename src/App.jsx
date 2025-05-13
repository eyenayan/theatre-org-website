import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebaseConfig"; // Ensure this is correctly configured
import { onAuthStateChanged } from "firebase/auth";
import LoginPage from "./components/LoginPage/LoginPage";
import MainPage from "./components/MainPage/MainPage";
import ArchivePage from "./components/ArchivePage/ArchivePage";
import SetRentingPage from "./components/SetRentPage/SetRentingPage";
import BillPage from "./components/SetRentPage/BillPage";
import AboutUs from "./components/AboutUs/aboutus";
import AlumniRegistration from "./components/AlumniRegistrationPage/AlumniRegistration";
import AlumniList from "./components/AlumniRegistrationPage/AlumniList";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Stop showing the loading screen after resolving auth state
    });

    return () => unsubscribe(); // Cleanup the auth listener on unmount
  }, []);

  if (loading) {
    // Show a loading spinner or message while checking auth state
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Always Start at Login Page */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Login Page - Redirect to Home if Already Logged In */}
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/home" />} />

        {/* Home Page - Only Accessible After Login */}
        <Route path="/home" element={user ? <MainPage /> : <Navigate to="/login" />} />

        {/* Other Protected Pages - Only Accessible After Login */}
        <Route path="/archive" element={user ? <ArchivePage /> : <Navigate to="/login" />} />
        <Route path="/set" element={user ? <SetRentingPage /> : <Navigate to="/login" />} />
        <Route path="/bill" element={user ? <BillPage /> : <Navigate to="/login" />} />
        <Route path="/aboutus" element={user ? <AboutUs /> : <Navigate to="/login" />} />
        <Route path="/alumni" element={user ? <AlumniRegistration /> : <Navigate to="/login" />} />
        <Route path="/alumnilist" element={user ? <AlumniList /> : <Navigate to="/login" />} />

        {/* Handle undefined routes */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;



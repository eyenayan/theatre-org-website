import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png"; // Verify this path is correct

// Import Firebase instances
import { auth, db, googleProvider } from "../../firebaseConfig";

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    mobile: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Sign out the user when the page loads
    auth.signOut();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    if (!formData.email || !formData.password) {
      return "Email and password are required.";
    }
    if (isSignup) {
      if (!formData.name || !formData.age || !formData.gender || !formData.mobile) {
        return "All fields are required for signup.";
      }
      if (formData.password.length < 6) {
        return "Password must be at least 6 characters long.";
      }
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      if (isSignup) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        const user = userCredential.user;

        // Store user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: formData.name,
          age: formData.age,
          gender: formData.gender,
          mobile: formData.mobile,
          email: formData.email,
          createdAt: serverTimestamp(),
        });

        // Send email verification
        await sendEmailVerification(user);
        alert(
          "A verification email has been sent. Please verify your email before logging in."
        );
      } else {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      }
      navigate("/home");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if user data already exists in Firestore, if not, add it
      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );

      navigate("/home");
    } catch (err) {
      setError(err.message || "Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="absolute top-10">
        <img
          src={logo}
          alt="Logo"
          className="w-40 h-38 object-contain mx-auto"
        />
      </div>
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md mt-20">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isSignup ? "Sign Up" : "Log In"}
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 mb-2 bg-gray-700 rounded focus:outline-none"
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-2 mb-2 bg-gray-700 rounded focus:outline-none"
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 mb-2 bg-gray-700 rounded focus:outline-none"
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full p-2 mb-2 bg-gray-700 rounded focus:outline-none"
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mb-2 bg-gray-700 rounded focus:outline-none"
          />
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 mb-4 bg-gray-700 rounded focus:outline-none"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3 cursor-pointer text-gray-400 hover:text-white"
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 ${
              loading ? "bg-gray-600" : "bg-yellow-500 hover:bg-yellow-600"
            } text-black rounded font-semibold`}
          >
            {loading ? "Processing..." : isSignup ? "Sign Up" : "Log In"}
          </button>
        </form>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="flex justify-center items-center w-full p-2 bg-blue-950 hover:bg-blue-600 text-white rounded font-semibold mt-2"
        >
          <FcGoogle className="mr-2" />
          {loading ? "Processing..." : "Sign In with Google"}
        </button>
        <p
          onClick={() => setIsSignup(!isSignup)}
          className="text-sm mt-4 text-center cursor-pointer hover:underline hover:text-yellow-500"
        >
          {isSignup ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

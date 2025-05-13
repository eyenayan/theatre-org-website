import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import level from "../../assets/level.png";
import tappa from "../../assets/tappa.png";
import steps from "../../assets/steps.png";
import door from "../../assets/door.png";
import flat from "../../assets/flat.png";
import Navbar from '../../MainPageComponents/Navbar/Navbar';

const SetListData = [
  { name: "Level", price: 300, image: level },
  { name: "Tappa", price: 150, image: tappa },
  { name: "Flat", price: 300, image: flat },
  { name: "Door Frame", price: 200, image: door },
  { name: "Door frame(doors)", price: 300, image: door },
  { name: "Steps", price: 300, image: steps },
];

const SetRentingPage = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [selectedSets, setSelectedSets] = useState({});
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleQuantityChange = (name, value) => {
    setSelectedSets(prev => ({ ...prev, [name]: Math.max(0, value) }));
  };

  const handleSubmit = async () => {
    if (!auth.currentUser) {
      alert("You must be logged in to proceed.");
      return;
    }

    const selectedItems = Object.keys(selectedSets).filter(set => selectedSets[set] > 0);
    if (selectedItems.length === 0) {
      alert('Please select at least one set.');
      return;
    }

    const rentedData = {
      name: auth.currentUser.displayName || "User",
      email: auth.currentUser.email,
      selectedSets,
      setPrices: Object.fromEntries(SetListData.map(set => [set.name, set.price])),
      timestamp: new Date()
    };

    try {
      await addDoc(collection(db, 'rentingdata'), rentedData);
      navigate('/bill');
    } catch (error) {
      console.error("Error storing rental data:", error);
      alert("Failed to process rental. Please try again.");
    }
  };

  return (
    <div>
      <Navbar theme={theme} setTheme={setTheme} />
      <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden">
        <div className="container">
          <h1 className="text-3xl sm:text-4xl font-semibold mb-3">Rent Your Set</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
            {SetListData.map((data, index) => (
              <div key={index} className="space-y-3 border-2 border-gray-300 hover:border-primary p-3 rounded-xl">
                <div className="w-full h-[120px]">
                  <img className="w-full h-[120px] object-contain" src={data.image} alt={data.name} />
                </div>
                <h1 className="text-primary font-semibold">{data.name}</h1>
                <p className="text-xl font-semibold">₹{data.price}/Day</p>

                <div className="flex items-center mt-2">
                  <button
                    className="px-2 py-1 bg-gray-700 text-white rounded-l disabled:opacity-50"
                    disabled={selectedSets[data.name] === 0}
                    onClick={() => handleQuantityChange(data.name, (selectedSets[data.name] || 0) - 1)}
                  >
                    -
                  </button>
                  <input type="number" readOnly className="w-16 text-center px-2 py-1 bg-black text-white"
                    value={selectedSets[data.name] || 0} />
                  <button
                    className="px-2 py-1 bg-gray-700 text-white rounded-r"
                    onClick={() => handleQuantityChange(data.name, (selectedSets[data.name] || 0) + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="grid place-items-center mt-8">
            <button onClick={handleSubmit} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-yellow-600">
              Proceed to Bill
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetRentingPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { sendBillEmail } from "../../utils/emailBill.js"; // Import Email.js function

const BillPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!auth.currentUser) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }

      try {
        const q = query(collection(db, "rentingdata"), where("email", "==", auth.currentUser.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const latestDoc = querySnapshot.docs[querySnapshot.docs.length - 1].data();
          setUserData(latestDoc);
        } else {
          setError("No billing data found for your account.");
        }
      } catch (err) {
        setError("Failed to load bill details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [auth.currentUser]);

  if (loading) return <div className="h-screen flex justify-center items-center text-2xl">Loading...</div>;
  if (error) return <div className="h-screen flex justify-center items-center text-2xl text-red-500">{error}</div>;

  const calculateTotal = () => {
    return Object.keys(userData.selectedSets).reduce((total, set) => {
      return total + userData.selectedSets[set] * userData.setPrices[set];
    }, 0);
  };

  // Get current date and time
  const currentDate = new Date().toLocaleString();

  // Function to send Bill Email using Email.js
  const sendBillEmailHandler = async () => {
    const response = await sendBillEmail(userData, calculateTotal());
    if (response.success) {
      alert("Bill email sent successfully!");
    } else {
      alert(`Failed to send email: ${response.error}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white flex justify-center items-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-primary mb-6">Bill Review</h1>
        
        {/* Date and Time */}
        <div className="mb-6 text-center text-lg text-gray-600 dark:text-gray-400">
          <p className="font-semibold">Date/Time: {currentDate}</p>
        </div>

        {/* User Info */}
        <div className="mb-6 p-4 border-l-4 border-primary bg-gray-50 dark:bg-gray-700 rounded-md shadow">
          <p className="text-lg font-semibold"><span className="text-primary">Name:</span> {userData.name}</p>
          <p className="text-lg font-semibold"><span className="text-primary">Email:</span> {userData.email}</p>
        </div>

        {/* Selected Sets Section */}
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-primary mb-4">Selected Sets</h2>

          <div className="border-t border-gray-300 dark:border-gray-600">
            {Object.keys(userData.selectedSets).map((set, index) => (
              userData.selectedSets[set] > 0 && (
                <div key={index} className="flex justify-between items-center border-b border-gray-300 dark:border-gray-600 py-3">
                  <p className="text-lg font-medium">{set}</p>
                  <p className="text-lg font-semibold">{userData.selectedSets[set]} x ₹{userData.setPrices[set]}</p>
                </div>
              )
            ))}
          </div>
        </div>

        {/* Total Amount */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 border-l-4 border-primary rounded-lg shadow">
          <h2 className="text-xl font-semibold text-primary">Total Amount</h2>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">₹{calculateTotal()}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition"
          >
            ← Back
          </button>

          <button
            onClick={() => {
              sendBillEmailHandler(); // Send Email using Email.js
              navigate('/payment', { state: { total: calculateTotal(), userData } });
            }}
            className="px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark transition"
          >
            Proceed to Payment → 
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillPage;

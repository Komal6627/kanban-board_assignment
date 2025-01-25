import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Logout = () => {
  const navigate = useNavigate();
  const auth = getAuth(); // Firebase Auth instance

  const handleLogout = async () => {
    try {
      // Sign the user out using Firebase
      await signOut(auth);

      // Optionally clear localStorage or other custom data
      localStorage.removeItem("userData");

      // Redirect to the login page
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error.message);
      alert("Failed to logout. Please try again.");
    }
  };

  return (
    <div 
    // className="flex justify-center items-center h-screen"
    >
      <button
        onClick={handleLogout}
        // className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;

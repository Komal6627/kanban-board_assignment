import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Board from "./components/Board"
import Home from "./components/Home"

export default function App() {

  const [user, setUser] = useState(null); // Store the logged-in user's data

  console.log(1,process.env.REACT_APP_API_KEY)

  const handleAuthChange = (authUser) => {
    setUser(authUser); 
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={user ? <Board user={user} /> : <Navigate to="/login" />}
          />
          

          <Route
            path="/login"
            element={<Login onLoginSuccess={handleAuthChange} />}
          />

        
          <Route
            path="/register"
            element={<Register onRegisterSuccess={() => (window.location.href = "/login")} />}
          />
        </Routes>
      </div>
    </Router>
  );
}


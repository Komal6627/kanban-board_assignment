import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Board from "./components/Board"
import Home from "./components/Home"

export default function App() {
  const [user, setUser] = useState(null); // Store the logged-in user's data

  const handleAuthChange = (authUser) => {
    setUser(authUser); // Update the state when a user logs in or registers
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route: Redirect to login if user isn't authenticated */}
          <Route
            path="/"
            element={user ? <Board user={user} /> : <Navigate to="/login" />}
          />
          

          {/* Login Page */}
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleAuthChange} />}
          />

          {/* Register Page */}
          <Route
            path="/register"
            element={<Register onRegisterSuccess={() => (window.location.href = "/login")} />}
          />
        </Routes>
      </div>
    </Router>
  );
}


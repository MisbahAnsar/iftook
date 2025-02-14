import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import MobileMenuButton from "./components/MobileMenuButton";
import UserProfileSidebar from "./components/UserProfileSidebar";
import LoginPage from "./pages/Login";
import { isAuthenticated, logoutUser } from "./utils/api"; // Import auth utilities

function App() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [auth, setAuth] = useState(isAuthenticated());

  useEffect(() => {
    setAuth(isAuthenticated());
  }, []);

  const handleLoginSuccess = () => {
    setAuth(true);
  };

  const handleLogout = () => {
    logoutUser();
    setAuth(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
        <Route
          path="/*"
          element={
            auth ? (
              <div className="min-h-screen bg-gray-900">
                <MobileMenuButton
                  isMobileMenuOpen={isMobileMenuOpen}
                  setIsMobileMenuOpen={setIsMobileMenuOpen}
                />
                {selectedUserId ? (
                  <UserProfileSidebar userId={selectedUserId} onBack={() => setSelectedUserId(null)} />
                ) : (
                  <Sidebar
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                    isMobileMenuOpen={isMobileMenuOpen}
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                    onLogout={handleLogout}
                  />
                )}
                <MainContent
                  activeItem={activeItem}
                  selectedUserId={selectedUserId}
                  setSelectedUserId={setSelectedUserId}
                />
                {isMobileMenuOpen && (
                  <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-0 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                )}
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

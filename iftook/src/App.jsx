import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import MobileMenuButton from './components/MobileMenuButton';
import UserProfileSidebar from "./components/UserProfileSidebar"; // New Component

function App() {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  return (
    <div className="min-h-screen bg-gray-900">
      <MobileMenuButton 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

{selectedUserId ? (
        <UserProfileSidebar 
          userId={selectedUserId} 
          onBack={() => setSelectedUserId(null)} 
        />
      ) : (
        <Sidebar
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      )}

      <MainContent
        activeItem={activeItem}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
      />

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-0 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
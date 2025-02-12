import React from 'react';
import DashboardContent from './DashboardContent';
import UsersContent from './UsersContent';
import UserDetails from './UserDetails';
import { menuItems } from './Sidebar';

const DefaultContent = ({ title }) => (
  <div className="bg-gray-800 rounded-lg shadow-lg p-6">
    <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
    <p className="text-gray-300">Content for {title.toLowerCase()} goes here.</p>
  </div>
);

const MainContent = ({ activeItem, selectedUserId, setSelectedUserId }) => {
  const renderContent = () => {
    if (activeItem === 'users' && selectedUserId) {
      return (
        <UserDetails
          userId={selectedUserId}
          onBack={() => setSelectedUserId(null)}
        />
      );
    }

    switch (activeItem) {
      case 'dashboard':
        return <DashboardContent />;
      case 'users':
        return <UsersContent onUserClick={setSelectedUserId} />;
      default:
        return <DefaultContent title={activeItem.charAt(0).toUpperCase() + activeItem.slice(1)} />;
    }
  };

  return (
    <div className="lg:ml-64 min-h-screen">
      <div className="p-8">
        <h2 className="text-2xl font-semibold text-white mb-6">
          {menuItems.find(item => item.id === activeItem)?.label}
        </h2>
        {renderContent()}
      </div>
    </div>
  );
};

export default MainContent;
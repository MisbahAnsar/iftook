import React from 'react';
import { Menu, X } from 'lucide-react';

const MobileMenuButton = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  return (
    <div className="lg:hidden fixed top-4 right-4 z-20">
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="p-2 rounded-lg bg-white shadow-sm"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
};

export default MobileMenuButton;
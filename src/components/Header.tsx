import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm py-3 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          {/* FIX: Removed the import, using absolute path from /public */}
          <img src="/logo.png" alt="ReddiDNA Logo" className="h-12 w-12" />
          <span className="text-xl font-bold text-gray-800">
            ReddiDNA
          </span>
        </Link>
        <nav className="flex items-center gap-2">
          <Link to="/" className="px-4 py-2 text-gray-600 hover:text-orange-600 font-medium transition-colors">
            Home
          </Link>
          <a href="https://x.com/PrasadMarco" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-gray-600 hover:text-orange-600 font-medium transition-colors">
            X
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
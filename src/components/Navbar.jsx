/**
 * Navbar Component
 * 
 * A responsive navigation bar component that includes:
 * - A logo/brand name on the left
 * - Navigation links in the center (Movies and Series)
 * - A search bar with an icon on the right
 * 
 * Color Palette:
 * - Primary Background: #053C5E (Dark Blue)
 * - Text and Accents: #BFDBF7 (Light Blue)
 * - Interactive Elements: #1F7A8C (Teal)
 */

import { useState } from 'react';

const Navbar = ({ currentPage, onPageChange }) => {
  // State for managing search input value
  const [searchQuery, setSearchQuery] = useState('');

  return (
    // Main navigation container with dark blue background and shadow
    <nav className="bg-[#053C5E] shadow-lg">
      {/* Content wrapper with responsive padding and max-width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flex container for navbar items with fixed height */}
        <div className="flex items-center justify-between h-16">
          {/* Logo section */}
          <div className="flex-shrink-0">
            <h1 className="text-[#BFDBF7] text-2xl font-bold">MovieApp</h1>
          </div>

          {/* Center section containing navigation links and search */}
          <div className="flex-1 flex items-center justify-center space-x-8">
            {/* Navigation links container */}
            <div className="flex space-x-4">
              <button 
                onClick={() => onPageChange('movies')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                  currentPage === 'movies'
                    ? 'text-[#1F7A8C] bg-[#BFDBF7]'
                    : 'text-[#BFDBF7] hover:text-[#1F7A8C]'
                }`}
              >
                Movies
              </button>
              <button 
                onClick={() => onPageChange('series')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                  currentPage === 'series'
                    ? 'text-[#1F7A8C] bg-[#BFDBF7]'
                    : 'text-[#BFDBF7] hover:text-[#1F7A8C]'
                }`}
              >
                Series
              </button>
            </div>

            {/* Search bar section */}
            <div className="flex-1 max-w-md">
              {/* Relative positioning for search icon placement */}
              <div className="relative">
                {/* Search input field */}
                <input
                  type="text"
                  className="w-full bg-[#BFDBF7] text-[#053C5E] rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-[#1F7A8C]"
                  placeholder={`Search ${currentPage}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {/* Search icon positioned absolutely within input */}
                <div className="absolute left-3 top-2.5">
                  <svg 
                    className="h-5 w-5 text-[#053C5E]" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
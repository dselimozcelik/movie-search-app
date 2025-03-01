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

import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import MovieDetails from './MovieDetails';

const Navbar = ({ currentPage, onPageChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Debounced search function
  const debouncedSearch = useCallback(
    async (query) => {
      if (!query.trim()) {
        setSearchResults([]);
        setShowResults(false);
        return;
      }

      setIsSearching(true);
      try {
        const data = currentPage === 'movies'
          ? await api.searchMovies(query)
          : await api.searchSeries(query);
        
        setSearchResults(data.results.slice(0, 5));
        setShowResults(true);
      } catch (error) {
        console.error('Error searching:', error);
      } finally {
        setIsSearching(false);
      }
    },
    [currentPage]
  );

  // Handle search input changes with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      debouncedSearch(searchQuery);
    }, 300); // 300ms delay

    return () => clearTimeout(timeoutId);
  }, [searchQuery, debouncedSearch]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-container')) {
        setShowResults(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleResultClick = (result) => {
    setSelectedItem(result);
    setShowResults(false);
    setSearchQuery('');
  };

  return (
    <nav className="bg-[#053C5E] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
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
                onClick={() => {
                  onPageChange('movies');
                  setSearchResults([]);
                  setShowResults(false);
                  setSearchQuery('');
                }}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                  currentPage === 'movies'
                    ? 'text-[#1F7A8C] bg-[#BFDBF7]'
                    : 'text-[#BFDBF7] hover:text-[#1F7A8C]'
                }`}
              >
                Movies
              </button>
              <button 
                onClick={() => {
                  onPageChange('series');
                  setSearchResults([]);
                  setShowResults(false);
                  setSearchQuery('');
                }}
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
            <div className="relative flex-1 max-w-lg search-container">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onFocus={() => searchQuery.trim() && setShowResults(true)}
                  placeholder={`Search ${currentPage === 'movies' ? 'movies' : 'series'}...`}
                  className="w-full bg-white/10 text-white placeholder-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#1F7A8C]"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300">
                  {isSearching ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute mt-2 w-full bg-[#0f0f1a] rounded-lg shadow-xl overflow-hidden z-50">
                  {searchResults.map((result) => (
                    <div
                      key={result.id}
                      className="p-4 hover:bg-[#1F7A8C]/20 cursor-pointer border-b border-gray-700 last:border-none"
                      onClick={() => handleResultClick(result)}
                    >
                      <div className="flex items-center">
                        {result.poster_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w92${result.poster_path}`}
                            alt={result.title || result.name}
                            className="w-12 h-18 object-cover rounded"
                          />
                        ) : (
                          <div className="w-12 h-18 bg-gray-800 rounded flex items-center justify-center">
                            <span className="text-gray-500">No Image</span>
                          </div>
                        )}
                        <div className="ml-4">
                          <h3 className="text-white font-medium">
                            {currentPage === 'movies' ? result.title : result.name}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {new Date(
                              currentPage === 'movies' ? result.release_date : result.first_air_date
                            ).getFullYear() || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right section - can be used for additional features */}
          <div className="flex items-center">
            {/* Add any additional navbar items here */}
          </div>
        </div>
      </div>

      {/* Movie/Series Details Modal */}
      {selectedItem && (
        <MovieDetails
          movieId={selectedItem.id}
          type={currentPage === 'movies' ? 'movie' : 'tv'}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </nav>
  );
};

export default Navbar; 
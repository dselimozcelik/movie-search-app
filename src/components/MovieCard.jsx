/**
 * MovieCard Component
 * 
 * Color Palette:
 * - Wine: #5B2333
 * - White Smoke: #F7F4F3
 * - Walnut Brown: #564D4A
 * - Vermilion: #F24333
 * - Cornell Red: #BA1B1D
 */

import { useState } from 'react';
import MovieDetails from './MovieDetails';

const MovieCard = ({ item, type = 'movie' }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const imageUrl = item?.poster_path 
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : null;

  const title = type === 'movie' ? item?.title : item?.name;
  const releaseDate = type === 'movie' ? item?.release_date : item?.first_air_date;
  const year = releaseDate?.split('-')[0];

  return (
    <>
      <div className="relative bg-[#5B2333] rounded-xl shadow-lg overflow-hidden group cursor-pointer transform hover:scale-105 transition-all duration-300">
        {/* Movie/Series Poster */}
        <div className="aspect-[2/3] w-full">
          {imageUrl ? (
            <>
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#5B2333] via-[#5B2333]/40 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#564D4A]">
              <span className="text-[#F7F4F3]/50">No Poster Available</span>
            </div>
          )}
          
          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-[#F24333] text-[#F7F4F3] px-2.5 py-1 rounded-lg text-sm font-semibold">
            {item?.vote_average?.toFixed(1)}
          </div>
        </div>
        
        {/* Movie/Series Info - Positioned over the gradient */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="mb-2">
            <h3 className="text-xl font-bold text-[#F7F4F3] mb-2 line-clamp-1">{title}</h3>
            <p className="text-[#F7F4F3]/70 text-sm">
              {year} • {type === 'movie' ? 'Movie' : 'TV Series'}
            </p>
          </div>
          
          <p className="text-[#F7F4F3]/70 text-sm line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {item?.overview}
          </p>
          
          {/* Learn More Button */}
          <button 
            onClick={() => setShowDetails(true)}
            className="w-full bg-[#F24333] text-[#F7F4F3] py-2 rounded-lg hover:bg-[#BA1B1D] transition-colors duration-300"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Movie Details Modal */}
      {showDetails && (
        <MovieDetails
          movieId={item.id}
          type={type}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
};

export default MovieCard; 
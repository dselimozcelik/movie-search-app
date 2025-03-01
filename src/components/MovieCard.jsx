/**
 * MovieCard Component
 * 
 * A card component to display movie/series information including:
 * - Poster image from TMDB
 * - Title
 * - Rating
 * - Release year
 * - Brief description
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
      <div className="relative bg-[#0f0f1a] rounded-xl shadow-lg overflow-hidden group cursor-pointer transform hover:scale-105 transition-all duration-300">
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-900">
              <span className="text-gray-600">No Poster Available</span>
            </div>
          )}
          
          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-[#1F7A8C] text-white px-2.5 py-1 rounded-lg text-sm font-semibold">
            {item?.vote_average?.toFixed(1)}
          </div>
        </div>
        
        {/* Movie/Series Info - Positioned over the gradient */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="mb-2">
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{title}</h3>
            <p className="text-gray-300 text-sm">
              {year} • {type === 'movie' ? 'Movie' : 'TV Series'}
            </p>
          </div>
          
          <p className="text-gray-300 text-sm line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {item?.overview}
          </p>
          
          {/* Learn More Button */}
          <button 
            onClick={() => setShowDetails(true)}
            className="w-full bg-[#1F7A8C] text-white py-2 rounded-lg hover:bg-[#2a8a9c] transition-colors duration-300"
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
/**
 * MovieDetails Component
 * 
 * Color Palette:
 * - Wine: #5B2333
 * - White Smoke: #F7F4F3
 * - Walnut Brown: #564D4A
 * - Vermilion: #F24333
 * - Cornell Red: #BA1B1D
 */

import { useState, useEffect } from 'react';
import { api } from '../services/api';

const MovieDetails = ({ movieId, onClose, type = 'movie' }) => {
  const [details, setDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Fetch movie/series details using the appropriate endpoint
        const data = type === 'movie' 
          ? await api.getMovieDetails(movieId)
          : await api.getSeriesDetails(movieId);
        setDetails(data);

        // Fetch cast information using the appropriate endpoint
        const creditsData = type === 'movie'
          ? await api.getMovieCredits(movieId)
          : await api.getSeriesCredits(movieId);
        setCast(creditsData.cast?.slice(0, 4) || []);
      } catch (err) {
        setError('Failed to load details');
        console.error('Error fetching details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movieId, type]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#5B2333]/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#F7F4F3]"></div>
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className="fixed inset-0 bg-[#5B2333]/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-[#F7F4F3] p-6 rounded-lg max-w-lg w-full mx-4">
          <h2 className="text-2xl font-bold text-[#F24333] mb-4 text-center">Error</h2>
          <p className="text-[#564D4A] text-center">{error || 'Failed to load details'}</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-[#F24333] text-[#F7F4F3] rounded hover:bg-[#BA1B1D] w-full"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const releaseDate = type === 'movie' ? details.release_date : details.first_air_date;
  const year = releaseDate?.split('-')[0];
  const title = type === 'movie' ? details.title : details.name;

  return (
    <div className="fixed inset-0 bg-[#5B2333]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#F7F4F3] rounded-xl max-w-5xl w-full relative shadow-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#F24333] hover:text-[#BA1B1D] z-10 bg-[#F7F4F3]/40 rounded-full p-1"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Movie Poster */}
          <div className="md:w-2/5 relative">
            {details.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                alt={title}
                className="w-full h-full object-cover rounded-l-xl"
              />
            ) : (
              <div className="w-full h-full min-h-[600px] bg-[#5B2333] flex items-center justify-center rounded-l-xl">
                <span className="text-[#F7F4F3]/50">No Poster Available</span>
              </div>
            )}
          </div>

          {/* Movie Details */}
          <div className="p-8 md:w-3/5">
            {/* Title and Rating */}
            <div className="mb-6 text-center">
              <h1 className="text-4xl font-bold mb-4 tracking-tight text-[#F24333]">{title}</h1>
              <div className="flex items-center justify-center gap-4">
                <div className="bg-[#F24333] px-3 py-1 rounded text-lg font-semibold text-[#F7F4F3]">
                  {details.vote_average?.toFixed(1)}
                </div>
                <div className="text-[#564D4A] text-lg">
                  {year} • {details.runtime || details.episode_run_time?.[0]} min
                </div>
              </div>
            </div>

            {/* Genres */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 justify-center">
                {details.genres?.map(genre => (
                  <span key={genre.id} className="px-3 py-1 bg-[#5B2333] rounded-full text-sm text-[#F7F4F3]">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Overview */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-3 text-[#F24333] tracking-tight text-center">Overview</h2>
              <p className="text-[#564D4A] leading-relaxed text-center">{details.overview}</p>
            </div>

            {/* Movie Info */}
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div className="text-center">
                <h3 className="text-[#F24333] text-sm font-medium mb-1">Status</h3>
                <p className="text-[#564D4A]">{details.status}</p>
              </div>
              {details.budget > 0 && (
                <div className="text-center">
                  <h3 className="text-[#F24333] text-sm font-medium mb-1">Budget</h3>
                  <p className="text-[#564D4A]">${details.budget?.toLocaleString()}</p>
                </div>
              )}
              {details.revenue > 0 && (
                <div className="text-center">
                  <h3 className="text-[#F24333] text-sm font-medium mb-1">Revenue</h3>
                  <p className="text-[#564D4A]">${details.revenue?.toLocaleString()}</p>
                </div>
              )}
            </div>

            {/* Cast */}
            {cast.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-[#F24333] tracking-tight text-center">Cast</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {cast.map(person => (
                    <div key={person.id} className="text-center">
                      <div className="mb-2 relative">
                        {person.profile_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                            alt={person.name}
                            className="w-20 h-20 rounded-full object-cover mx-auto ring-2 ring-[#F24333]"
                          />
                        ) : (
                          <div className="w-20 h-20 rounded-full bg-[#5B2333] flex items-center justify-center mx-auto">
                            <span className="text-[#F7F4F3]/50">👤</span>
                          </div>
                        )}
                      </div>
                      <p className="font-medium text-sm text-[#F24333]">{person.name}</p>
                      <p className="text-[#564D4A] text-xs mt-1">{person.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails; 
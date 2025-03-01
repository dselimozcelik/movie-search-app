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
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-[#1a1a2e] p-6 rounded-lg max-w-lg w-full mx-4">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
          <p className="text-gray-300">{error || 'Failed to load movie details'}</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-[#0f0f1a] text-white rounded-xl max-w-5xl w-full relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white z-10 bg-black/40 rounded-full p-1"
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
              <div className="w-full h-full min-h-[600px] bg-gray-900 flex items-center justify-center rounded-l-xl">
                <span className="text-gray-600">No Poster Available</span>
              </div>
            )}
          </div>

          {/* Movie Details */}
          <div className="p-8 md:w-3/5">
            {/* Title and Rating */}
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-4">{title}</h1>
              <div className="flex items-center gap-4">
                <div className="bg-[#1F7A8C] px-3 py-1 rounded text-lg font-semibold">
                  {details.vote_average?.toFixed(1)}
                </div>
                <div className="text-gray-400 text-lg">
                  {year} • {details.runtime || details.episode_run_time?.[0]} min
                </div>
              </div>
            </div>

            {/* Genres */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {details.genres?.map(genre => (
                  <span key={genre.id} className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Overview */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">Overview</h2>
              <p className="text-gray-300 leading-relaxed">{details.overview}</p>
            </div>

            {/* Movie Info */}
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Status</h3>
                <p className="text-white">{details.status}</p>
              </div>
              {details.budget > 0 && (
                <div>
                  <h3 className="text-gray-400 text-sm mb-1">Budget</h3>
                  <p className="text-white">${details.budget?.toLocaleString()}</p>
                </div>
              )}
              {details.revenue > 0 && (
                <div>
                  <h3 className="text-gray-400 text-sm mb-1">Revenue</h3>
                  <p className="text-white">${details.revenue?.toLocaleString()}</p>
                </div>
              )}
            </div>

            {/* Cast */}
            {cast.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Cast</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {cast.map(person => (
                    <div key={person.id} className="text-center">
                      <div className="mb-2 relative">
                        {person.profile_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                            alt={person.name}
                            className="w-20 h-20 rounded-full object-cover mx-auto ring-2 ring-gray-800"
                          />
                        ) : (
                          <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mx-auto">
                            <span className="text-2xl">👤</span>
                          </div>
                        )}
                      </div>
                      <p className="font-medium text-sm">{person.name}</p>
                      <p className="text-gray-400 text-xs mt-1">{person.character}</p>
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
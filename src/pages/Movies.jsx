import { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard'
import GenreCard from '../components/GenreCard'
import { api } from '../services/api'

function Movies() {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch genres first
        const genresData = await api.getMovieGenres();
        if (!genresData.genres) throw new Error('Failed to fetch genres');
        setGenres(genresData.genres);

        // Set Action genre as default
        const actionGenre = genresData.genres.find(genre => genre.id === 28);
        if (actionGenre) {
          setSelectedGenre(actionGenre);
        }

        // Fetch featured movies
        const moviesData = await api.getFeaturedMovies();
        if (!moviesData.results) throw new Error('Failed to fetch featured movies');
        setFeaturedMovies(moviesData.results.slice(0, 3));
        
      } catch (err) {
        setError('Failed to load movies. Please try again.');
        console.error('Error loading initial data:', err);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch movies when genre changes
  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      if (!selectedGenre) return;
      
      setLoading(true);
      try {
        const data = await api.getMoviesByGenre(selectedGenre.id);
        if (!data.results) throw new Error('Failed to fetch genre movies');
        setTrendingMovies(data.results.slice(0, 4));
      } catch (err) {
        setError('Failed to load genre movies. Please try again.');
        console.error('Error loading genre movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesByGenre();
  }, [selectedGenre]);

  const handleGenreClick = (genre) => {
    if (selectedGenre?.id === genre.id) return;
    setSelectedGenre(genre);
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-[#053C5E] text-center">
          <h2 className="text-2xl font-bold mb-4">Oops!</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#1F7A8C] text-white rounded-lg hover:bg-[#053C5E] transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (initialLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#053C5E] mx-auto"></div>
          <p className="mt-4 text-[#053C5E]">Loading movies...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 space-y-12">
      {/* Featured Movies Section */}
      <section>
        <h2 className="text-2xl font-bold text-[#053C5E] mb-6">Featured Movies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredMovies.map(movie => (
            <MovieCard key={movie.id} item={movie} type="movie" />
          ))}
        </div>
      </section>

      {/* Genres Section */}
      <section>
        <h2 className="text-2xl font-bold text-[#053C5E] mb-6">Browse by Genre</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {genres.map((genre) => (
            <GenreCard 
              key={genre.id}
              genre={genre.name}
              isSelected={selectedGenre?.id === genre.id}
              onClick={() => handleGenreClick(genre)}
            />
          ))}
        </div>
      </section>

      {/* Trending Movies Section */}
      <section className="animate-fadeIn">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#053C5E]">
            {selectedGenre ? `Trending in ${selectedGenre.name}` : 'Trending Movies'}
          </h2>
          {selectedGenre && selectedGenre.id !== 28 && (
            <button 
              onClick={() => {
                const actionGenre = genres.find(g => g.id === 28);
                if (actionGenre) setSelectedGenre(actionGenre);
              }}
              className="text-[#1F7A8C] hover:text-[#053C5E] transition-colors duration-300"
            >
              Reset to Action
            </button>
          )}
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#053C5E] mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trendingMovies.map(movie => (
              <MovieCard key={movie.id} item={movie} type="movie" />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Movies; 
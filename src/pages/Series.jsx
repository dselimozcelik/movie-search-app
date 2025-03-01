import { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard'
import GenreCard from '../components/GenreCard'
import { api } from '../services/api'

function Series() {
  // States for series data
  const [featuredSeries, setFeaturedSeries] = useState([]);
  const [trendingSeries, setTrendingSeries] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for selected genre - initialize with Action genre
  const [selectedGenre, setSelectedGenre] = useState(null);

  // Fetch genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await api.getTVGenres();
        setGenres(data.genres);
        // Set initial selected genre to Action (id: 10759)
        const actionGenre = data.genres.find(genre => genre.id === 10759);
        if (actionGenre) {
          setSelectedGenre(actionGenre);
        }
      } catch (err) {
        setError('Failed to fetch genres');
        console.error(err);
      }
    };

    fetchGenres();
  }, []);

  // Fetch featured series
  useEffect(() => {
    const fetchFeaturedSeries = async () => {
      try {
        const data = await api.getFeaturedSeries();
        setFeaturedSeries(data.results.slice(0, 3));
      } catch (err) {
        setError('Failed to fetch featured series');
        console.error(err);
      }
    };

    fetchFeaturedSeries();
  }, []);

  // Fetch series by genre when genre changes
  useEffect(() => {
    const fetchSeriesByGenre = async () => {
      if (!selectedGenre) return;
      
      setLoading(true);
      try {
        const data = await api.getSeriesByGenre(selectedGenre.id);
        setTrendingSeries(data.results.slice(0, 4));
      } catch (err) {
        setError('Failed to fetch series by genre');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSeriesByGenre();
  }, [selectedGenre]);

  // Handle genre selection
  const handleGenreClick = (genre) => {
    setSelectedGenre(genre === selectedGenre ? null : genre);
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-[#f24333] text-center">
          <h2 className="text-2xl font-bold mb-4">Oops!</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 space-y-12">
      {/* Featured Series Section */}
      <section>
        <h2 className="text-2xl font-bold text-[#f24333] mb-6">Featured Series</h2>
        
        {/* Series Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredSeries.map(series => (
            <MovieCard key={series.id} item={series} type="series" />
          ))}
        </div>
      </section>

      {/* Genres Section */}
      <section>
        <h2 className="text-2xl font-bold text-[#f24333] mb-6">Browse Series by Genre</h2>
        
        {/* Genre Cards Grid */}
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

      {/* Trending Series by Genre Section */}
      <section className="animate-fadeIn">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#f24333]">
            {selectedGenre ? `Trending Series in ${selectedGenre.name}` : 'Trending Series'}
          </h2>
          {selectedGenre && selectedGenre.id !== 10759 && (
            <button 
              onClick={() => {
                const actionGenre = genres.find(g => g.id === 10759);
                setSelectedGenre(actionGenre);
              }}
              className="text-[#1F7A8C] hover:text-[#053C5E] transition-colors duration-300"
            >
              Reset to Action
            </button>
          )}
        </div>
        
        {/* Loading State */}
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#053C5E] mx-auto"></div>
          </div>
        ) : (
          /* Trending Series Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trendingSeries.map(series => (
              <MovieCard key={series.id} item={series} type="series" />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Series; 
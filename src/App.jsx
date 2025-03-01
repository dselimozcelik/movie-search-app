import { useState } from 'react'
import Navbar from './components/Navbar'
import MovieCard from './components/MovieCard'
import GenreCard from './components/GenreCard'

function App() {
  // State for selected genre
  const [selectedGenre, setSelectedGenre] = useState(null);

  // Sample genres array
  const genres = [
    'Action',
    'Comedy',
    'Drama',
    'Horror',
    'Romance',
    'Sci-Fi',
    'Thriller',
    'Documentary'
  ];

  // Handle genre selection
  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
  };

  return (
    <div className="min-h-screen bg-[#BFDBF7]">
      <Navbar />
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Featured Movies Section */}
        <section>
          <h2 className="text-2xl font-bold text-[#053C5E] mb-6">Featured Movies</h2>
          
          {/* Movie Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MovieCard />
            <MovieCard />
            <MovieCard />
          </div>
        </section>

        {/* Genres Section */}
        <section>
          <h2 className="text-2xl font-bold text-[#053C5E] mb-6">Browse by Genre</h2>
          
          {/* Genre Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {genres.map((genre, index) => (
              <GenreCard 
                key={index} 
                genre={genre} 
                isSelected={selectedGenre === genre}
                onClick={() => handleGenreClick(genre)}
              />
            ))}
          </div>
        </section>

        {/* Trending Movies by Genre Section */}
        {selectedGenre && (
          <section className="animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#053C5E]">
                Trending in {selectedGenre}
              </h2>
              <button 
                onClick={() => setSelectedGenre(null)}
                className="text-[#1F7A8C] hover:text-[#053C5E] transition-colors duration-300"
              >
                Clear Selection
              </button>
            </div>
            
            {/* Trending Movies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MovieCard />
              <MovieCard />
              <MovieCard />
              <MovieCard />
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App

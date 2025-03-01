/**
 * MovieCard Component
 * 
 * A card component to display movie information including:
 * - Movie poster image
 * - Title
 * - Rating
 * - Release year
 * - Brief description
 */

const MovieCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Movie Poster */}
      <div className="h-64 bg-[#053C5E] flex items-center justify-center">
        <span className="text-[#BFDBF7]">Movie Poster</span>
      </div>
      
      {/* Movie Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-[#053C5E]">Movie Title</h3>
          <span className="bg-[#1F7A8C] text-white px-2 py-1 rounded-full text-sm">
            4.5 ★
          </span>
        </div>
        
        <p className="text-sm text-[#053C5E] mb-2">2024 • Action, Adventure</p>
        
        <p className="text-[#1F7A8C] text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        
        {/* Learn More Button */}
        <button className="mt-4 w-full bg-[#053C5E] text-[#BFDBF7] py-2 rounded-lg hover:bg-[#1F7A8C] transition-colors duration-300">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default MovieCard; 
/**
 * GenreCard Component
 * 
 * A card component to display movie genres with:
 * - Genre name
 * - Icon or image (placeholder for now)
 * - Hover effect
 * - Selection state
 */

const GenreCard = ({ genre, icon, isSelected, onClick }) => {
  // Genre-specific emoji mapping
  const genreEmojis = {
    'Action': '🎬',
    'Comedy': '😂',
    'Drama': '🎭',
    'Horror': '👻',
    'Romance': '💝',
    'Sci-Fi': '🚀',
    'Thriller': '🔍',
    'Documentary': '📹'
  };

  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 ${
        isSelected ? 'ring-2 ring-[#1F7A8C] scale-105' : ''
      }`}
    >
      <div className="p-4 flex flex-col items-center">
        {/* Genre Icon */}
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors duration-300 ${
          isSelected ? 'bg-[#1F7A8C]' : 'bg-[#053C5E]'
        }`}>
          <span className="text-[#BFDBF7] text-xl">
            {genreEmojis[genre] || '🎬'}
          </span>
        </div>
        
        {/* Genre Name */}
        <h3 className={`font-medium text-center transition-colors duration-300 ${
          isSelected ? 'text-[#1F7A8C]' : 'text-[#053C5E]'
        }`}>
          {genre}
        </h3>
      </div>
    </div>
  );
};

export default GenreCard; 
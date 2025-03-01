/**
 * GenreCard Component
 * 
 * Color Palette:
 * - Wine: #5B2333
 * - White Smoke: #F7F4F3
 * - Walnut Brown: #564D4A
 * - Vermilion: #F24333
 * - Cornell Red: #BA1B1D
 */

const GenreCard = ({ genre, isSelected, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-lg cursor-pointer
        transition-all duration-300 ease-in-out
        ${isSelected 
          ? 'bg-[#F24333] text-[#F7F4F3] shadow-lg scale-105' 
          : 'bg-[#564D4A] text-[#F7F4F3] hover:bg-[#5B2333] hover:text-[#F7F4F3]'
        }
      `}
    >
      <div className="p-4 text-center">
        <h3 className="text-sm font-medium">
          {genre}
        </h3>
      </div>
      
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F7F4F3]"></div>
      )}
    </div>
  );
};

export default GenreCard; 
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

const MovieCard = ({ item, type = 'movie' }) => {
  const imageUrl = item?.poster_path 
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : null;

  const title = type === 'movie' ? item?.title : item?.name;
  const releaseDate = type === 'movie' ? item?.release_date : item?.first_air_date;
  const year = releaseDate?.split('-')[0];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Movie/Series Poster */}
      <div className="h-64 bg-[#053C5E] relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[#BFDBF7]">No Poster Available</span>
          </div>
        )}
      </div>
      
      {/* Movie/Series Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-[#053C5E] line-clamp-1">{title}</h3>
          <span className="bg-[#1F7A8C] text-white px-2 py-1 rounded-full text-sm">
            {item?.vote_average?.toFixed(1)} ★
          </span>
        </div>
        
        <p className="text-sm text-[#053C5E] mb-2">
          {year} • {type === 'movie' ? 'Movie' : 'TV Series'}
        </p>
        
        <p className="text-[#1F7A8C] text-sm line-clamp-3">
          {item?.overview}
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
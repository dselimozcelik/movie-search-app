const API_KEY = 'dd6a1c2659ff600488f3594f684456ce'; // Replace with your actual API key
const BASE_URL = 'https://api.themoviedb.org/3';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const api = {
  API_KEY,
  
  // Movies endpoints
  async getFeaturedMovies() {
    try {
      console.log('Calling getFeaturedMovies...');
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await handleResponse(response);
      console.log('Featured movies data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching featured movies:', error);
      throw error;
    }
  },

  async getMoviesByGenre(genreId) {
    try {
      console.log(`Calling getMoviesByGenre with id ${genreId}...`);
      const response = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`
      );
      const data = await handleResponse(response);
      console.log('Movies by genre data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching movies by genre:', error);
      throw error;
    }
  },

  async getMovieDetails(movieId) {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
      );
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  },

  async getMovieCredits(movieId) {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
      );
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching movie credits:', error);
      throw error;
    }
  },

  async getMovieVideos(movieId) {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
      );
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching movie videos:', error);
      throw error;
    }
  },

  // TV Series endpoints
  async getFeaturedSeries() {
    try {
      const response = await fetch(
        `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching featured series:', error);
      throw error;
    }
  },

  async getSeriesByGenre(genreId) {
    try {
      const response = await fetch(
        `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`
      );
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching series by genre:', error);
      throw error;
    }
  },

  async getSeriesDetails(seriesId) {
    try {
      const response = await fetch(
        `${BASE_URL}/tv/${seriesId}?api_key=${API_KEY}&language=en-US`
      );
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching series details:', error);
      throw error;
    }
  },

  async getSeriesCredits(seriesId) {
    try {
      const response = await fetch(
        `${BASE_URL}/tv/${seriesId}/credits?api_key=${API_KEY}`
      );
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching series credits:', error);
      throw error;
    }
  },

  async getSeriesVideos(seriesId) {
    try {
      const response = await fetch(
        `${BASE_URL}/tv/${seriesId}/videos?api_key=${API_KEY}&language=en-US`
      );
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching series videos:', error);
      throw error;
    }
  },

  // Genre endpoints
  async getMovieGenres() {
    try {
      console.log('Calling getMovieGenres...');
      const response = await fetch(
        `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );
      const data = await handleResponse(response);
      console.log('Movie genres data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching movie genres:', error);
      throw error;
    }
  },

  async getTVGenres() {
    try {
      const response = await fetch(
        `${BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=en-US`
      );
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching TV genres:', error);
      throw error;
    }
  },

  // Search endpoints
  async searchMovies(query) {
    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1`
      );
      return handleResponse(response);
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },

  async searchSeries(query) {
    try {
      const response = await fetch(
        `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1`
      );
      return handleResponse(response);
    } catch (error) {
      console.error('Error searching series:', error);
      throw error;
    }
  }
};

// Genre IDs mapping
export const genreIds = {
  Action: 28,
  Comedy: 35,
  Drama: 18,
  Horror: 27,
  Romance: 10749,
  'Sci-Fi': 878,
  Thriller: 53,
  Documentary: 99
}; 
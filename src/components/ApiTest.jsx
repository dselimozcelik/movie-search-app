import { useState, useEffect } from 'react';
import { api } from '../services/api';

const ApiTest = () => {
  const [testResults, setTestResults] = useState({
    genres: null,
    featuredMovies: null,
    error: null,
    loading: true
  });

  useEffect(() => {
    const testApi = async () => {
      try {
        console.log('Starting API tests...');
        
        // Test genre endpoint
        console.log('Testing genre endpoint...');
        const genresData = await api.getMovieGenres();
        console.log('Genres data received:', genresData);

        // Test movies endpoint
        console.log('Testing movies endpoint...');
        const moviesData = await api.getFeaturedMovies();
        console.log('Movies data received:', moviesData);

        setTestResults({
          genres: genresData,
          featuredMovies: moviesData,
          error: null,
          loading: false
        });
      } catch (error) {
        console.error('API Test Error:', error);
        setTestResults({
          genres: null,
          featuredMovies: null,
          error: error.message || 'An error occurred during API testing',
          loading: false
        });
      }
    };

    testApi();
  }, []);

  if (testResults.loading) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Testing API Connection...</h2>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#053C5E]"></div>
      </div>
    );
  }

  if (testResults.error) {
    return (
      <div className="p-4 bg-red-100 text-red-700">
        <h2 className="font-bold mb-2">API Error:</h2>
        <pre className="whitespace-pre-wrap">{testResults.error}</pre>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">API Test Results:</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-bold">Genres:</h3>
          <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-40">
            {JSON.stringify(testResults.genres, null, 2)}
          </pre>
        </div>
        <div>
          <h3 className="font-bold">Featured Movies:</h3>
          <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-40">
            {JSON.stringify(testResults.featuredMovies, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ApiTest; 
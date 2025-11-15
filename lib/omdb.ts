// lib/omdb.ts

import { MovieSearchResponse, MovieDetail } from '@/types/movie';

// Access environment variables securely on the server
const BASE_URL = process.env.OMDB_BASE_URL; // Should be 'http://www.omdbapi.com/'
const API_KEY = process.env.OMDB_API_KEY;

// Helper function to handle fetch and error checking
async function handleFetch(url: string) {
  if (!API_KEY || !BASE_URL) {
    // This check ensures keys are present during server-side execution
    throw new Error('OMDB API Key or Base URL environment variables are missing.');
  }

  const res = await fetch(url, { 
    // Next.js caches fetch responses by default, which is good for server components
    cache: 'force-cache' 
  });
  
  if (!res.ok) {
    // Handle network errors (e.g., 404, 500)
    throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
  }
  
  return res.json();
}

/**
 * Fetches a list of movies based on a search term.
 * @param searchTerm - The movie title or keyword (e.g., 'Avengers', 'Star Wars').
 */
export async function fetchMoviesBySearch(searchTerm: string, page: number = 1): Promise<MovieSearchResponse> {
  const url = `${BASE_URL}?apikey=${API_KEY}&s=${searchTerm}&type=movie&page=${page}`;
  
  const data: MovieSearchResponse = await handleFetch(url);
  
  // OMDb reports errors by setting Response: 'False'
  if (data.Response === 'False') {
    // Return a valid structure with an empty array if no results are found
    console.error(`OMDb search error for term "${searchTerm}": ${data.Error}`);
    return { Search: [], totalResults: '0', Response: 'False' };
  }
  
  return data;
}

/**
 * Fetches full details for a single movie using its IMDb ID.
 * @param imdbID - The unique identifier for the movie (e.g., 'tt0848228').
 */
export async function fetchMovieById(imdbID: string): Promise<MovieDetail> {
  // We request the full plot here
  const url = `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`; 

  const data: MovieDetail = await handleFetch(url);

  if (data.Response === 'False') {
    throw new Error(`Movie not found for ID: ${imdbID}. OMDb Error: ${data.Error}`);
  }

  return data;
}
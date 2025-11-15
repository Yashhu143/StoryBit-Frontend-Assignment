// app/page.tsx

import { fetchMoviesBySearch } from '@/lib/omdb';
import { MovieSearchItem } from '@/types/movie';

// Components (will be created in later steps)
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import MovieRow from './components/MovieRow';

// --- SEARCH TERMS TO SIMULATE CATEGORIES ---
const CATEGORIES = [
  { term: 'Marvel', title: 'Action Heroes' },
  { term: 'Alien', title: 'Sci-Fi Classics' },
  { term: 'Comedy', title: 'Family Laughs' },
];

async function getHomePageData() {
  // Use Promise.all to fetch all data concurrently for better performance
  const [
    featuredResponse, // Used for the Hero Banner
    ...rowsResponses // Used for the three horizontal rows
  ] = await Promise.all([
    fetchMoviesBySearch('Avengers', 1), // Feature/Hero Banner source
    ...CATEGORIES.map(category => fetchMoviesBySearch(category.term, 1)),
  ]);

  // Extract the first movie for the Hero Banner
  const heroMovie: MovieSearchItem | undefined = featuredResponse.Search?.[0];

  // Combine the fetched data with their respective titles for the rows
  const movieRows = rowsResponses.map((response, index) => ({
    title: CATEGORIES[index].title,
    movies: response.Search || [], // Ensure we pass an empty array if Search is undefined/null
  })).filter(row => row.movies.length > 0); // Only render rows that have results

  return { heroMovie, movieRows };
}

export default async function HomePage() {
  const { heroMovie, movieRows } = await getHomePageData();

  // Basic check in case the API key or network is down
  if (!heroMovie && movieRows.length === 0) {
    return (
      <div className="text-center p-8 text-xl text-red-500">
        Error: Could not fetch movie data. Check your API key and network connection.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* Step 6: Header (Needs implementation) */}
      <Header /> 

      {/* Step 8: Hero Banner (Needs implementation, conditional render in case of no result) */}
      {heroMovie && <HeroBanner movie={heroMovie} />}

      <div className="p-4 space-y-8 md:p-8">
        {/* Steps 9 & 10: Movie Rows (Needs implementation) */}
        {movieRows.map((row) => (
          <MovieRow 
            key={row.title} 
            categoryTitle={row.title} 
            movies={row.movies} 
          />
        ))}
      </div>
    </main>
  );
}
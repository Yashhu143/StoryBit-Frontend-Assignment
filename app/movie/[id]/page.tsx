// app/movie/[id]/page.tsx

import Image from 'next/image';
import Link from 'next/link';
import { fetchMovieById } from '@/lib/omdb';

// Fallback image for missing posters
const OMDb_PLACEHOLDER_POSTER = "https://via.placeholder.com/300x450?text=No+Poster";

// The Page component receives the dynamic parameters
export default async function MoviePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  let movie;
  try {
    // THIS LINE IS LIKELY FAILING
    movie = await fetchMovieById(id); 
  } catch (error) {
    // CHECK YOUR TERMINAL FOR THIS MESSAGE:
    console.error(`Failed to fetch movie details for ID: ${id}`, error);
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-3xl font-bold mb-4">Movie Not Found</h1>
        <p>We could not find the details for this movie. Please try another title.</p>
        <Link href="/" className="mt-4 inline-block text-red-500 hover:text-red-400">
          ← Back to Home
        </Link>
      </div>
    );
  }

  // Use the full poster if available, otherwise use a placeholder
  const posterUrl = movie.Poster && movie.Poster !== 'N/A' 
    ? movie.Poster 
    : OMDb_PLACEHOLDER_POSTER;

  // Phase 3, Step 13: Render detail page
  return (
    <main className="min-h-screen bg-gray-900 text-white pt-16">
      <div className="container mx-auto p-4 md:p-8">
        <Link href="/" className="inline-block text-red-500 hover:text-red-400 mb-6">
          ← Back to Home
        </Link>
        
        {/* Responsive Layout: Side-by-side on large screens, stacked on mobile */}
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Left Side: Poster and Basic Info (Flex Shrink 0 to keep size fixed) */}
          <div className="flex-shrink-0 w-full md:w-1/3 lg:w-1/4">
            <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={posterUrl}
                alt={movie.Title || "Movie Poster"}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 33vw"
                priority // Preload the main image
              />
            </div>
          </div>
          
          {/* Right Side: Details */}
          <div className="flex-grow">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{movie.Title}</h1>
            
            <p className="text-gray-400 text-lg mb-4">
              {movie.Genre} • {movie.Runtime} • {movie.Year} • Rated: {movie.Rated}
            </p>

            <h2 className="text-2xl font-bold mt-6 mb-2 text-red-400">Overview</h2>
            <p className="text-gray-300 text-lg leading-relaxed">{movie.Plot}</p>

            <div className="grid grid-cols-2 gap-4 mt-8 text-sm md:text-base">
              <div>
                <span className="font-semibold text-gray-400 block">Released:</span>
                <span className="text-white">{movie.Released}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-400 block">Director:</span>
                <span className="text-white">{movie.Director}</span>
              </div>
              <div className='col-span-2'>
                <span className="font-semibold text-gray-400 block">Actors:</span>
                <span className="text-white">{movie.Actors}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-400 block">Language:</span>
                <span className="text-white">{movie.Language}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-400 block">Country:</span>
                <span className="text-white">{movie.Country}</span>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </main>
  );
}
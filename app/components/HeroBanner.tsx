// app/components/HeroBanner.tsx
import Image from 'next/image';
import Link from 'next/link';
import { MovieSearchItem } from '@/types/movie';

// Base URL for OMDb posters. Note: OMDb typically provides full URLs,
// but some posters might be 'N/A'. We will handle that.
const OMDb_PLACEHOLDER_POSTER = "https://via.placeholder.com/300x450?text=No+Poster"; // Fallback image

interface HeroBannerProps {
  movie: MovieSearchItem;
}

export default function HeroBanner({ movie }: HeroBannerProps) {
  // OMDb often returns "N/A" for missing posters. We need a fallback.
  const imageUrl = movie.Poster && movie.Poster !== 'N/A' 
    ? movie.Poster 
    : OMDb_PLACEHOLDER_POSTER;

  // The Hero Banner should ideally link to the movie's detail page
  const detailLink = `/movie/${movie.imdbID}`;

  return (
    // Relative positioning for the Image component
    <section className="relative h-[400px] md:h-[600px] overflow-hidden group">
      {/* Background Image */}
      <Image
        src={imageUrl}
        alt={movie.Title || "Hero Banner Movie"}
        fill // Fills the parent element
        priority // Preload this image for better LCP
        style={{ objectFit: 'cover', objectPosition: 'top center' }} // Cover and position
        className="transition-transform duration-500 ease-in-out group-hover:scale-105" // Subtle zoom on hover
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw" // Define sizes for responsive images
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent flex items-end p-4 md:p-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg leading-tight mb-3">
            {movie.Title} ({movie.Year})
          </h2>
          <p className="text-gray-200 text-base md:text-lg mb-6 line-clamp-3 md:line-clamp-4 drop-shadow">
            {/* OMDb's search results don't include full plot. We'll show a placeholder
                or fetch plot on demand for a richer banner in a more complex setup.
                For now, a simple placeholder or empty string. */}
            Check out this featured movie!
          </p>
          <Link href={detailLink} className="inline-flex items-center px-6 py-3 bg-red-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105">
            View Details
          </Link>
        </div>
      </div>
    </section>
  );
}
// app/components/MovieCard.tsx
'use client'; // MovieCard should also be a Client Component

import Link from 'next/link';
import Image from 'next/image';
import { MovieSearchItem } from '@/types/movie';

// Fallback image for posters that are "N/A"
const OMDb_PLACEHOLDER_POSTER = "https://via.placeholder.com/200x300?text=No+Poster";

interface MovieCardProps {
  movie: MovieSearchItem;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const imageUrl = movie.Poster && movie.Poster !== 'N/A'
    ? movie.Poster
    : OMDb_PLACEHOLDER_POSTER;

  // Link to the dynamic detail route using the IMDb ID
  const detailLink = `/movie/${movie.imdbID}`;

  return (
    <Link href={detailLink} className="block group transition duration-300 ease-in-out hover:scale-105 hover:z-10 shadow-lg">
      <div className="relative w-[150px] h-[225px] sm:w-[200px] sm:h-[300px] rounded-lg overflow-hidden">
        <Image
          src={imageUrl}
          alt={movie.Title || "Movie Poster"}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 640px) 150px, 200px" // Optimized sizes for better performance
        />
      </div>
      <div className="mt-2 text-sm truncate w-[150px] sm:w-[200px] text-center">
        {movie.Title}
      </div>
    </Link>
  );
}
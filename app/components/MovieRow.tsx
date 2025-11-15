// app/components/MovieRow.tsx
'use client';

// Removed: import Link from 'next/link';
// Removed: import Image from 'next/image';
import { MovieSearchItem } from '@/types/movie';
import MovieCard from './MovieCard'; // <-- NEW IMPORT

// Removed: OMDb_PLACEHOLDER_POSTER
// Removed: MovieCardProps interface
// Removed: MovieCard component function

interface MovieRowProps {
  movies: MovieSearchItem[];
  categoryTitle: string;
}

export default function MovieRow({ movies, categoryTitle }: MovieRowProps) {
  if (movies.length === 0) {
    return null; 
  }
  
  return (
    <section className="space-y-3">
      <h3 className="text-xl md:text-2xl font-bold text-white pl-4 md:pl-8">{categoryTitle}</h3>
      
      <div 
        className="flex gap-4 overflow-x-scroll scrollbar-hide p-4 md:p-8 pt-0"
      >
        {movies.map(movie => (
          <MovieCard key={movie.imdbID} movie={movie} /> 
        ))}
      </div>
    </section>
  );
}
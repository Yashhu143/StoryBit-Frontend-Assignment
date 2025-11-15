// types/movie.ts

// 1. Structure for a single item returned in the list search (s= parameter)
export interface MovieSearchItem {
  Title: string;
  Year: string;
  imdbID: string; // Used to fetch full details
  Type: string;
  Poster: string;
}

// 2. Structure for the overall response when searching for a list
export interface MovieSearchResponse {
  Search: MovieSearchItem[]; // Array of movie results
  totalResults: string;
  Response: 'True' | 'False'; // OMDb status indicator
  Error?: string; // Present if Response is 'False'
}

// 3. Structure for the full details of a movie (i= parameter)
export interface MovieDetail {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Poster: string;
  imdbID: string;
  Type: string;
  Response: 'True' | 'False';
}
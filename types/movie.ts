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

/
// 3. Structure for the full detail response (i= parameter) - now includes Error
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
  Poster: string;
  imdbID: string;
  Type: string;
  original_language: string;
  Response: 'True' | 'False';
  Error?: string; // <--- ADD THIS LINE: OMDb uses this field when Response is 'False'
}
// ... (The rest of your types remain the same)
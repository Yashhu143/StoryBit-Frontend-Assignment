// types/movie.ts

// 1. Structure for a single item returned in the list search (s= parameter)
export interface MovieSearchItem {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

// 2. Structure for the overall response when searching for a list
export interface MovieSearchResponse {
  Search: MovieSearchItem[];
  totalResults: string;
  Response: 'True' | 'False';
  Error?: string;
}

// 3. Structure for the full detail response (i= parameter)
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
  Language: string;
  Country: string;
  Response: 'True' | 'False';
  Error?: string;
}
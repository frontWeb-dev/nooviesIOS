// interface
export interface HMediaProps {
  id?: number;
  poster_path: string;
  original_title: string;
  overview: string;
  vote_average?: number;
  release_date?: string;
}

export interface VMediaProps {
  id?: number;
  poster_path: string;
  original_title: string;
  vote_average: number;
}

export interface MoviesProps {
  id?: number;
  backdrop_path: string;
  poster_path: string;
  original_title: string;
  vote_average: string;
  overview: string;
}

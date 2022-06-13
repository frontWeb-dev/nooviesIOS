// interface
export interface MovieProps {
  posterPath?: string;
  originalTitle: string;
  overview?: string;
  voteAverage?: number;
  releaseData?: string;
}

export interface MoviesProps {
  id?: number;
  backdrop_path?: string;
  poster_path?: string;
  original_title: string;
  overview?: string;
  release_date?: string;
  vote_average?: number;
}

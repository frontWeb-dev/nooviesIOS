const API_KEY = '12a42d16c5bda3e29282e2c1b95326af';
const BASE_URL = 'https://api.themoviedb.org/3';

// fetcher
const getTrending = () =>
  fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then((response) =>
    response.json()
  );

const getUpcoming = () =>
  fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko&region=KR`
  ).then((response) => response.json());

const getNowPlaying = () =>
  fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko&region=KR`
  ).then((response) => response.json());

export const moviesAPI = { getTrending, getUpcoming, getNowPlaying };

// interface
interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

export interface HMediaProps {
  poster_path: string;
  original_title: string;
  overview: string;
  vote_average?: number;
  release_date?: string;
}

export interface VMediaProps {
  poster_path: string;
  original_title: string;
  vote_average: number;
}

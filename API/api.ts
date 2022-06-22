import { QueryFunction } from 'react-query';

const API_KEY = '12a42d16c5bda3e29282e2c1b95326af';
const BASE_URL = 'https://api.themoviedb.org/3';

// fetcher
export const moviesAPI: Moviefetchers = {
  getTrending: ({ pageParam }) =>
    fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=ko&page=${
        pageParam ? pageParam : 1
      }`
    ).then((response) => response.json()),
  getUpcoming: ({ pageParam }) =>
    fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko&page=${
        pageParam ? pageParam : 1
      }`
    ).then((response) => response.json()),
  getNowPlaying: () =>
    fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko&region=KR`
    ).then((response) => response.json()),
  search: ({ queryKey }: any) => {
    const [_, query] = queryKey;
    return fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko&region=KR&query=${query}`
    ).then((response) => response.json());
  },
  detail: ({ queryKey }: any) => {
    const [_, id] = queryKey;
    return fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,images`
    ).then((response) => response.json());
  },
};

export const tvAPI = {
  getTrending: () =>
    fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=ko`).then(
      (response) => response.json()
    ),
  getAiringToday: () =>
    fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=ko`).then(
      (response) => response.json()
    ),
  getTopRated: () =>
    fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=ko`).then(
      (response) => response.json()
    ),
  search: ({ queryKey }: any) => {
    const [_, query] = queryKey;
    return fetch(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&language=ko&region=KR&query=${query}`
    ).then((response) => response.json());
  },
  detail: ({ queryKey }: any) => {
    const [_, id] = queryKey;
    return fetch(
      `${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=videos,images`
    ).then((response) => response.json());
  },
};

// interface
type MovieListResponse = QueryFunction<MovieResponse>;
type TVListResponse = QueryFunction<TVResponse>;

interface Moviefetchers {
  getTrending: MovieListResponse;
  getUpcoming: MovieListResponse;
  getNowPlaying: MovieListResponse;
  search: MovieListResponse;
  detail: QueryFunction<MovieDetails>;
}
interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}

export interface SliderProps {
  backdrop_path: string | null;
  poster_path: string | null;
  original_title: string;
  vote_average: number;
  overview: string;
  fullData: Movie;
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

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: object;
  budget: number;
  genres: object;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: object;
  production_countries: object;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: object;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: {
    results: {
      name: string;
      key: string;
      site: string;
    }[];
  };
  images: object;
}

export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

export interface TVResponse extends BaseResponse {
  results: TV[];
}

export interface HMediaProps {
  poster_path: string;
  original_title: string;
  overview: string;
  vote_average?: number;
  release_date?: string;
  fullData: Movie;
}

export interface VMediaProps {
  poster_path: string;
  original_title: string;
  vote_average: number;
  fullData: Movie | TV;
}

export interface TV {
  name: string;
  original_name: string;
  origin_country: string[];
  vote_count: number;
  backdrop_path: string | null;
  vote_average: number;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  poster_path: string | null;
  first_air_date: string;
  popularity: number;
  media_type: string;
}

export interface TVDetails {
  backdrop_path: string;
  created_by: object;
  episode_run_time: object;
  first_air_date: string;
  genres: object;
  homepage: string;
  id: number;
  in_production: boolean;
  languages: object;
  last_air_date: string;
  last_episode_to_air: object;
  name: string;
  next_episode_to_air: object;
  networks: object;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: object;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: object;
  production_countries: object;
  seasons: object;
  spoken_languages: object;
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  videos: {
    results: {
      name: string;
      key: string;
      site: string;
    }[];
  };
  images: object;
}

const API_KEY = '12a42d16c5bda3e29282e2c1b95326af';
const BASE_URL = 'https://api.themoviedb.org/3';

// fetcher
export const moviesAPI = {
  getTrending: () =>
    fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=ko&region=KR`
    ).then((response) => response.json()),
  getUpcoming: () =>
    fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko&region=KR`
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

export interface MovieResponse extends BaseResponse {
  results: Movie[];
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

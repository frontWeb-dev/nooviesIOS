const API_KEY = '12a42d16c5bda3e29282e2c1b95326af';
const BASE_URL = 'https://api.themoviedb.org/3';

// fetcher
export const getTrending = () =>
  fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then((response) =>
    response.json()
  );

export const getUpcoming = () =>
  fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko&region=KR`
  ).then((response) => response.json());

export const getNowPlaying = () =>
  fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko&region=KR`
  ).then((response) => response.json());

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

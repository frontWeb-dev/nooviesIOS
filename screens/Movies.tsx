import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';
import Slides from '../components/Slides';
import { MoviesProps } from '../API/api';
// style
const Container = styled.ScrollView``;
const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const View = styled.View`
  flex: 1;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
// =  const SCREEN_HEIGHT = Dimemsions.get("window").height;

const API_KEY = '12a42d16c5bda3e29282e2c1b95326af';

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);
  const getData = async () => {
    await Promise.all([getNowPlaying(), getUpcoming(), getTrending()]);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko&region=KR`
      )
    ).json();
    setNowPlaying(results);
  };
  const getUpcoming = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=ko&region=KR`
      )
    ).json();
    setUpcoming(results);
  };
  const getTrending = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      )
    ).json();
    setTrending(results);
  };

  return loading ? (
    <Loader>
      <ActivityIndicator size='large' />
    </Loader>
  ) : (
    <Container>
      <Swiper
        horizontal
        loop
        autoplay={true}
        autoplayTimeout={3}
        showsPagination={false}
        containerStyle={{ width: '100%', height: SCREEN_HEIGHT / 4 }}
      >
        {nowPlaying.slice(0, 5).map((movie: MoviesProps) => (
          <Slides
            key={movie.id}
            backdropPath={movie.backdrop_path}
            posterPath={movie.poster_path}
            originalTitle={movie.original_title}
            voteAverage={movie.vote_average}
            overview={movie.overview}
          />
        ))}
      </Swiper>
    </Container>
  );
};

export default Movies;

//

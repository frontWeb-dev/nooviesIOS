import React, { useEffect, useState } from 'react';
import {
  View,
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  useColorScheme,
} from 'react-native';
import styled from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Swiper from 'react-native-swiper';
import Slides from '../components/Slides';
import HMedia from '../components/HMedia';
import VMedia from '../components/VMedia';
import { VMediaProps, HMediaProps, MoviesProps } from '../API/api';

// style
const Container = styled.ScrollView``;
const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const ListTitle = styled.Text`
  margin: 0 0 20px 30px;
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  font-size: 18px;
`;
const TrendingScroll = styled.FlatList`
  margin: 0 20px 30px 20px;
  background-color: ${(props) => props.theme.subBgColor};
  border-radius: 10px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
// =  const SCREEN_HEIGHT = Dimemsions.get("window").height;

const API_KEY = '12a42d16c5bda3e29282e2c1b95326af';

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
  const isDark = useColorScheme() === 'dark';
  const [refreshing, setRefreshing] = useState(false);
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
  console.log(upcoming);
  const getTrending = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      )
    ).json();
    setTrending(results);
  };
  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };

  return loading ? (
    <Loader>
      <ActivityIndicator size='large' />
    </Loader>
  ) : (
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Swiper
        horizontal
        loop
        autoplay={true}
        autoplayTimeout={3}
        showsPagination={false}
        containerStyle={{
          marginBottom: 30,
          width: '100%',
          height: SCREEN_HEIGHT / 4,
        }}
      >
        {nowPlaying.slice(0, 5).map((movie: MoviesProps) => (
          <Slides
            key={movie.id}
            backdrop_path={movie.backdrop_path}
            poster_path={movie.poster_path}
            original_title={movie.original_title}
            vote_average={movie.vote_average}
            overview={movie.overview}
          />
        ))}
      </Swiper>
      <ListTitle>Trending Movies</ListTitle>
      <TrendingScroll
        data={trending}
        horizontal
        keyExtractor={(item) => item.id + ''}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ padding: 10 }}
        ItemSeparatorComponent={() => {
          return <View style={{ width: 20 }} />;
        }}
        renderItem={({ item }) => (
          <VMedia
            poster_path={item.poster_path ? item.poster_path : ''}
            original_title={item.original_title}
            vote_average={item.vote_average}
          />
        )}
      />

      <ListTitle>Coming Soon</ListTitle>
      {upcoming.map((movie: HMediaProps) => (
        <HMedia
          key={movie.id ? movie.id : ''}
          poster_path={movie.poster_path}
          original_title={movie.original_title}
          overview={movie.overview}
          release_date={movie.release_date}
        />
      ))}
    </Container>
  );
};

export default Movies;

//

import React from 'react';
import { ActivityIndicator, Dimensions, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styled from 'styled-components/native';

import { moviesAPI, MovieResponse } from '../API/api';

import Swiper from 'react-native-swiper';
import Slides from '../components/Slides';
import HMedia from '../components/HMedia';
import VMedia from '../components/VMedia';
import { useQuery, useQueryClient } from 'react-query';

// style
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
` as unknown as typeof FlatList;
const VSeperator = styled.View`
  width: 20px;
`;
const HSeperator = styled.View`
  height: 20px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
// =  const SCREEN_HEIGHT = Dimemsions.get("window").height;

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    refetch: refetchNowPlaying,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery<MovieResponse>(
    ['movies', 'nowPlaying'],
    moviesAPI.getNowPlaying
  );
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    refetch: refetchUpcoming,
    isRefetching: isRefetchingUpcoming,
  } = useQuery<MovieResponse>(['movies', 'upcoming'], moviesAPI.getUpcoming);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    refetch: refetchTrending,
    isRefetching: isRefetchingTrending,
  } = useQuery<MovieResponse>(['movies', 'trending'], moviesAPI.getTrending);

  const onRefresh = async () => {
    queryClient.refetchQueries(['movies']);
  };

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const refreshing =
    isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingUpcoming;

  return loading ? (
    <Loader>
      <ActivityIndicator size='large' />
    </Loader>
  ) : upcomingData ? (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
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
            {nowPlayingData?.results.map((movie) => (
              <Slides
                key={movie.id}
                backdrop_path={movie.backdrop_path || ''}
                poster_path={movie.poster_path || ''}
                original_title={movie.original_title}
                vote_average={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          <ListTitle>Trending Movies</ListTitle>
          {trendingData ? (
            <TrendingScroll
              data={trendingData.results}
              horizontal
              keyExtractor={(item) => item.id + ''}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ padding: 10 }}
              ItemSeparatorComponent={VSeperator}
              renderItem={({ item }) => (
                <VMedia
                  poster_path={item.poster_path || ''}
                  original_title={item.original_title}
                  vote_average={item.vote_average}
                />
              )}
            />
          ) : null}
          <ListTitle>Coming Soon</ListTitle>
        </>
      }
      data={upcomingData.results}
      keyExtractor={(item) => item.id + ''}
      ItemSeparatorComponent={HSeperator}
      renderItem={({ item }) => (
        <HMedia
          poster_path={item.poster_path || ''}
          original_title={item.original_title}
          overview={item.overview}
          release_date={item.release_date}
        />
      )}
    />
  ) : null;
};

export default Movies;

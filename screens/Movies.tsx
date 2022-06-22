import React, { useState } from 'react';
import { Dimensions, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query';

import { moviesAPI, MovieResponse } from '../API/api';
import { loadMore, getNextPageParamUtil } from '../API/utills';
import Slides from '../components/Slides';
import HMedia from '../components/HMedia';
import Loader from '../components/Loader';
import HList from '../components/HList';
// style
const ListTitle = styled.Text`
  margin: 0 0 20px 30px;
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  font-size: 18px;
`;
const HSeperator = styled.View`
  height: 20px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
// =  const SCREEN_HEIGHT = Dimemsions.get("window").height;

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const { isLoading: nowPlayingLoading, data: nowPlayingData } =
    useQuery<MovieResponse>(['movies', 'nowPlaying'], moviesAPI.getNowPlaying);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    hasNextPage: hasNextPageComing,
    fetchNextPage: fetchNextPageComing,
  } = useInfiniteQuery<MovieResponse>(
    ['movies', 'upcoming'],
    moviesAPI.getUpcoming,
    {
      getNextPageParam: getNextPageParamUtil,
    }
  );
  const {
    isLoading: trendingLoading,
    data: trendingData,
    hasNextPage: hasNextPageTrending,
    fetchNextPage: fetchNextPageTrending,
  } = useInfiniteQuery<MovieResponse>(
    ['movies', 'trending'],
    moviesAPI.getTrending,
    {
      getNextPageParam: getNextPageParamUtil,
    }
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(['movies']);
    setRefreshing(false);
  };

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;

  return loading ? (
    <Loader />
  ) : upcomingData ? (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      onEndReached={() => loadMore(hasNextPageComing, fetchNextPageComing)}
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
                fullData={movie}
              />
            ))}
          </Swiper>
          {trendingData ? (
            <HList
              title='Trending Movies'
              data={trendingData.pages.map((page) => page.results).flat()}
              hasNextPage={hasNextPageTrending}
              fetchNextPage={fetchNextPageTrending}
            />
          ) : null}
          <ListTitle>Coming Soon</ListTitle>
        </>
      }
      data={upcomingData.pages.map((page) => page.results).flat()}
      keyExtractor={(item) => item.id + ''}
      ItemSeparatorComponent={HSeperator}
      renderItem={({ item }) => (
        <HMedia
          poster_path={item.poster_path || ''}
          original_title={item.original_title}
          overview={item.overview}
          release_date={item.release_date}
          fullData={item}
        />
      )}
    />
  ) : null;
};

export default Movies;

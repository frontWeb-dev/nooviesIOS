import React from 'react';
import { View, Text, ScrollView, FlatList, RefreshControl } from 'react-native';
import { useQuery, useQueryClient } from 'react-query';
import { tvAPI } from '../API/api';
import HList from '../components/HList';
import Loader from '../components/Loader';
import VMedia from '../components/VMedia';

const Tv = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: todayLoading,
    data: todayData,
    isRefetching: todayRefetching,
  } = useQuery(['tv', 'today'], tvAPI.getAiringToday);
  const {
    isLoading: topLoading,
    data: topData,
    isRefetching: topRefetching,
  } = useQuery(['tv', 'top'], tvAPI.getTopRated);
  const {
    isLoading: trendingLoading,
    data: tredingData,
    isRefetching: trendingRefetching,
  } = useQuery(['tv', 'trending'], tvAPI.getTrending);

  const loading = todayLoading || topLoading || trendingLoading;
  const refreshing = todayRefetching || topRefetching || trendingRefetching;

  const onRefresh = () => {
    queryClient.refetchQueries(['tv']);
  };

  return loading ? (
    <Loader />
  ) : (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{ paddingVertical: 30 }}
    >
      <HList title='Trending TV' data={tredingData.results} />
      <HList title='Airing Today' data={todayData.results} />
      <HList title='Top Rated TV' data={topData.results} />
    </ScrollView>
  );
};

export default Tv;

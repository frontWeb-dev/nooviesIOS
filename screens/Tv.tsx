import React from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { useQuery } from 'react-query';
import { tvAPI } from '../API/api';
import Loader from '../components/Loader';
import VMedia from '../components/VMedia';

const Tv = () => {
  const { isLoading: todayLoading, data: todayData } = useQuery(
    ['tv', 'today'],
    tvAPI.getAiringToday
  );
  const { isLoading: topLoading, data: topData } = useQuery(
    ['tv', 'top'],
    tvAPI.getTopRated
  );
  const { isLoading: trendingLoading, data: tredingData } = useQuery(
    ['tv', 'trending'],
    tvAPI.getTrending
  );
  const loading = todayLoading || topLoading || trendingLoading;

  return loading ? (
    <Loader />
  ) : (
    <ScrollView>
      <FlatList
        data={tredingData.results}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <VMedia
            poster_path={item.poster_path}
            original_title={item.original_name}
            vote_average={item.vote_average}
          />
        )}
      />
      <FlatList
        data={todayData.results}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <VMedia
            poster_path={item.poster_path}
            original_title={item.original_name}
            vote_average={item.vote_average}
          />
        )}
      />
      <FlatList
        data={topData.results}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <VMedia
            poster_path={item.poster_path}
            original_title={item.original_name}
            vote_average={item.vote_average}
          />
        )}
      />
    </ScrollView>
  );
};

export default Tv;

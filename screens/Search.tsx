import React, { useState } from 'react';
import styled from 'styled-components/native';
import { View, Text, Alert } from 'react-native';
import { useQuery } from 'react-query';
import { moviesAPI, tvAPI } from '../API/api';
import Loader from '../components/Loader';
import HList from '../components/HList';

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  width: 90%;
  margin: 20px auto 40px auto;
  padding: 10px 15px;
  color: ${(props) => props.theme.textColor}
  background-color: ${(props) => props.theme.InputColor};
  border-radius: 15px;
`;
const Search = () => {
  const [query, setQuery] = useState('');
  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery(['searchMovies', query], moviesAPI.search, {
    enabled: false, // 바로 동작하지 않게함
  });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery(['searchTv', query], tvAPI.search, {
    enabled: false, // 바로 동작하지 않게함
  });

  const onChangeText = (text: string) => setQuery(text);
  const onSubmit = () => {
    if (query === '') {
      return;
    }
    searchMovies();
    searchTv();
  };

  return (
    <Container>
      <SearchBar
        placeholder='Search for Movie or Tv Show'
        placeholderTextColor='grey'
        returnKeyType='search'
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {moviesLoading || tvLoading ? <Loader /> : null}
      {moviesData ? (
        <HList title='Movies Results' data={moviesData.results} />
      ) : null}
      {tvData ? <HList title='TV Results' data={tvData.results} /> : null}
    </Container>
  );
};

export default Search;

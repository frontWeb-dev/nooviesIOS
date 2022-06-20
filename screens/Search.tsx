import React, { useState } from 'react';
import styled from 'styled-components/native';
import { View, Text } from 'react-native';

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  width: 90%;
  margin: 10px auto;
  padding: 10px 15px;
  color: ${(props) => props.theme.textColor}
  background-color: ${(props) => props.theme.InputColor};
  border-radius: 15px;
`;
const Search = () => {
  const [query, setQuery] = useState('');
  const onChangeText = (text: string) => setQuery(text);
  console.log(query);
  return (
    <Container>
      <SearchBar
        placeholder='Search for Movie or Tv Show'
        placeholderTextColor='grey'
        returnKeyType='search'
        onChangeText={onChangeText}
      />
    </Container>
  );
};

export default Search;

import React from 'react';
import styled from 'styled-components/native';
import Poster from './Poster';
import Votes from './Votes';
import { VMediaProps } from '../API/api';
import { useNavigation } from '@react-navigation/core';
import { TouchableOpacity } from 'react-native';

const Movie = styled.View`
  align-items: center;
`;
const Title = styled.Text`
  margin: 7px 0 5px 0;
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
`;

const VMedia: React.FC<VMediaProps> = ({
  poster_path,
  original_title,
  vote_average,
}) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate('Stack', { screen: 'Detail' });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <Movie>
        <Poster path={poster_path} />
        <Title>
          {original_title.slice(0, 11)}
          {original_title.length > 11 ? '...' : null}
        </Title>
        <Votes votes={vote_average} />
      </Movie>
    </TouchableOpacity>
  );
};

export default VMedia;

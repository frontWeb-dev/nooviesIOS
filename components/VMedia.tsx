import React from 'react';
import styled from 'styled-components/native';
import Poster from './Poster';
import Votes from './Votes';
import { MovieProps } from '../API/api';

const Movie = styled.View`
  margin-right: 20px;
  align-items: center;
`;
const Title = styled.Text`
  margin: 7px 0 5px 0;
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
`;

const VMedia: React.FC<MovieProps> = ({
  posterPath,
  originalTitle,
  voteAverage,
}) => {
  return (
    <Movie>
      <Poster path={posterPath} />
      <Title>
        {originalTitle.slice(0, 13)}
        {originalTitle.length > 13 ? '...' : null}
      </Title>
      <Votes votes={voteAverage} />
    </Movie>
  );
};

export default VMedia;

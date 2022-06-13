import React from 'react';
import styled from 'styled-components/native';
import Poster from './Poster';
import Votes from './Votes';
import { MovieProps } from '../API/api';

const HMovie = styled.View`
  padding: 0px 30px;
  margin-bottom: 30px;
  flex-direction: row;
`;
const HColumn = styled.View`
  width: 80%;
  margin-left: 15px;
`;
const Title = styled.Text`
  margin-top: 7px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
`;
const Release = styled.Text`
  margin: 10px 0;
  font-size: 12px;
  font-weight: 500;
  color: ${(props) => props.theme.textColor};
  opacity: 0.6;
`;
const Overview = styled.Text`
  width: 80%;
  color: ${(props) => props.theme.textColor};
  opacity: 0.8;
`;

const HMedia: React.FC<MovieProps> = ({
  posterPath,
  originalTitle,
  overview,
  releaseData,
  voteAverage,
}) => {
  return (
    <HMovie>
      <Poster path={posterPath ? posterPath : ''} />
      <HColumn>
        <Title>
          {originalTitle !== '' && originalTitle.length > 30
            ? `${originalTitle.slice(0, 30)}...`
            : originalTitle}
        </Title>
        {releaseData ? (
          <Release>
            {new Date(releaseData).toLocaleDateString('ko', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </Release>
        ) : null}
        {voteAverage ? <Votes votes={voteAverage} /> : null}
        <Overview>
          {overview
            ? overview !== '' && overview.length > 100
              ? `${overview.slice(0, 100)}...`
              : overview
            : null}
        </Overview>
      </HColumn>
    </HMovie>
  );
};

export default HMedia;

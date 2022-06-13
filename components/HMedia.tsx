import React from 'react';
import styled from 'styled-components/native';
import Poster from './Poster';
import Votes from './Votes';
import { HMediaProps } from '../API/api';

const HMovie = styled.View`
  margin: 0 20px 20px 20px;
  padding: 10px;
  flex-direction: row;
  border-radius: 10px;
  background-color: ${(props) => props.theme.subBgColor};
`;
const HColumn = styled.View`
  width: 80%;
  margin-left: 15px;
`;
const Title = styled.Text`
  margin: 7px 0 10px 0;
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

const HMedia: React.FC<HMediaProps> = ({
  poster_path,
  original_title,
  overview,
  release_data,
  vote_average,
}) => {
  return (
    <HMovie>
      <Poster path={poster_path} />
      <HColumn>
        <Title>
          {original_title !== '' && original_title.length > 30
            ? `${original_title.slice(0, 30)}...`
            : original_title}
        </Title>
        {release_data ? (
          <Release>
            {new Date(release_data).toLocaleDateString('ko', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </Release>
        ) : null}
        {vote_average ? <Votes votes={vote_average} /> : null}
        <Overview>
          {overview
            ? overview !== '' && overview.length > 120
              ? `${overview.slice(0, 120)}...`
              : overview
            : null}
        </Overview>
      </HColumn>
    </HMovie>
  );
};

export default HMedia;

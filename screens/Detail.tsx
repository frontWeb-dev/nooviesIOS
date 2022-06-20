import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Movie, moviesAPI, TV, tvAPI } from '../API/api';
import { makeImgPath } from '../API/utills';
import Poster from '../components/Poster';
import { LinearGradient } from 'expo-linear-gradient';
import { BLACK } from '../color';
import { useQuery } from 'react-query';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;
const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0 20px;
`;
const Background = styled.Image``;
const Column = styled.View`
  flex-direction: row;
`;
const Row = styled.View`
  width: 80%;
  margin-left: 15px;
  align-self: flex-end;
`;
const Title = styled.Text`
  width: 80%;
  margin-bottom: 10px;
  color: ${(props) => props.theme.textColor};
  font-size: 30px;
  font-weight: 600;
`;
const Release = styled.Text`
  color: ${(props) => props.theme.textColor};
`;
const OverView = styled.Text`
  margin-top: 20px;
  padding: 0 20px;
  font-size: 14px;
  color: ${(prosp) => prosp.theme.textColor};
`;

// interface
type RootStackParamList = {
  // sceen : {params}
  Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;
const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  const { isLoading: moviesLoading, data: moviesData } = useQuery(
    ['movies', params.id],
    moviesAPI.detail,
    {
      enabled: 'orginal_title' in params,
    }
  );
  const { isLoading: tvLoading, data: tvData } = useQuery(
    ['tv', params.id],
    tvAPI.detail,
    {
      enabled: 'original_name' in params,
    }
  );

  useEffect(() => {
    setOptions({
      title: 'original_title' in params ? 'Movie' : 'TV Show',
    });
  }, []);
  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(params.backdrop_path || '') }}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.4)', BLACK]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path || ''} />
          <Row>
            <Title>{'title' in params ? params.title : params.name}</Title>
            <Release>
              {'release_date' in params
                ? params.release_date
                : params.first_air_date}
            </Release>
          </Row>
        </Column>
      </Header>
      <OverView>{params.overview}</OverView>
    </Container>
  );
};

export default Detail;

import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';
import { BlurView } from 'expo-blur';
import { makeImgPath } from '../API/utills';

// style
const Container = styled.ScrollView``;
const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const View = styled.View`
  flex: 1;
`;
const BgImg = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;
const Wrapper = styled.View`
  height: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
const Poster = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;
const Column = styled.View`
  width: 50%;
  height: 160px;
  margin-left: 15px;
`;
const Title = styled.Text`
  padding: 5px;
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
`;
const Overview = styled.Text`
  margin-top: 10px;
  color: ${(props) => props.theme.textColor};
`;
const Votes = styled(Overview)`
  font-size: 12px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
// =  const SCREEN_HEIGHT = Dimemsions.get("window").height;

const API_KEY = '12a42d16c5bda3e29282e2c1b95326af';

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
  const isDark = useColorScheme() === 'dark';
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko&region=KR`
      )
    ).json();
    setNowPlaying(results);
    setLoading(false);
  };

  useEffect(() => {
    getNowPlaying();
    console.log(nowPlaying);
  }, []);
  return loading ? (
    <Loader>
      <ActivityIndicator size='large' />
    </Loader>
  ) : (
    <Container>
      <Swiper
        horizontal
        loop
        autoplay={true}
        autoplayTimeout={3}
        showsPagination={false}
        containerStyle={{ width: '100%', height: SCREEN_HEIGHT / 4 }}
      >
        {nowPlaying.slice(0, 5).map((movie) => (
          <View key={movie.id}>
            <BgImg
              style={StyleSheet.absoluteFill}
              source={{ uri: makeImgPath(movie.backdrop_path) }}
            />
            <BlurView
              tint={isDark ? 'dark' : 'light'}
              intensity={90}
              style={StyleSheet.absoluteFill}
            >
              <Wrapper>
                <Poster source={{ uri: makeImgPath(movie.poster_path) }} />
                <Column>
                  <Title>{movie.original_title}</Title>
                  <Overview>{movie.overview.slice(0, 70)}...</Overview>
                  {movie.vote_average > 0 ? (
                    <Votes>⭐️ {movie.vote_average} / 10</Votes>
                  ) : null}
                </Column>
              </Wrapper>
            </BlurView>
          </View>
        ))}
      </Swiper>
    </Container>
  );
};

export default Movies;

//

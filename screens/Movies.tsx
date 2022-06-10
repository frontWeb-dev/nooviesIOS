import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Swiper from 'react-native-web-swiper';

// style
const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;
const View = styled.View`
  flex: 1;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
// =  const SCREEN_HEIGHT = Dimemsions.get("window").height;

const API_KEY = '12a42d16c5bda3e29282e2c1b95326af';

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
  const getNowPlaying = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko`
    ).then((response) => response.json());
  };
  return (
    <Container>
      <Swiper
        loop
        timeout={3.5}
        controlsEnabled={false}
        containerStyle={{ width: '100%', height: SCREEN_HEIGHT / 4 }}
      >
        <View style={{ backgroundColor: 'red' }}></View>
        <View style={{ backgroundColor: 'blue' }}></View>
        <View style={{ backgroundColor: 'red' }}></View>
        <View style={{ backgroundColor: 'blue' }}></View>
      </Swiper>
    </Container>
  );
};

export default Movies;

//

import React from 'react';
import styled from 'styled-components/native';
import {
  View,
  StyleSheet,
  useColorScheme,
  TouchableWithoutFeedback,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/core';
import { TouchableOpacity } from 'react-native';
import { makeImgPath } from '../API/utills';
import { SliderProps } from '../API/api';
import Poster from './Poster';

// style
const BgImg = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;
const Wrapper = styled.View`
  height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Column = styled.View`
  width: 55%;
  margin-left: 20px;
`;
const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
`;
const Overview = styled.Text<{ isDark: boolean }>`
  width: 85%;
  margin-top: 10px;
  color: ${(props) =>
    props.isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};
`;
const Votes = styled(Overview)`
  font-size: 12px;
`;

const Slides: React.FC<SliderProps> = ({
  backdrop_path,
  poster_path,
  original_title,
  vote_average,
  overview,
  fullData,
}) => {
  const isDark = useColorScheme() === 'dark';
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate('Stack', {
      screen: 'Detail',
      params: {
        ...fullData,
      },
    });
  };
  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <View style={{ flex: 1 }}>
        <BgImg
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(backdrop_path || '') }}
        />
        <BlurView
          tint={isDark ? 'dark' : 'light'}
          intensity={90}
          style={StyleSheet.absoluteFill}
        >
          <Wrapper>
            <Poster path={poster_path || ''} />
            <Column>
              <Title isDark={isDark}>{original_title}</Title>
              {vote_average ? (
                <Votes isDark={isDark}>⭐️ {vote_average} / 10</Votes>
              ) : null}
              <Overview isDark={isDark}>{overview.slice(0, 60)}...</Overview>
            </Column>
          </Wrapper>
        </BlurView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Slides;

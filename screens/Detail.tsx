import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Share,
  useColorScheme,
  Platform,
} from 'react-native';
import Video from 'react-native-video';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styled from 'styled-components/native';
// expo
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
// files
import Poster from '../components/Poster';
import Loader from '../components/Loader';
import { Movie, moviesAPI, TV, tvAPI } from '../API/api';
import { makeImgPath } from '../API/utills';
import { BLACK } from '../color';

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
  margin-bottom: 12px;
  color: ${(props) => props.theme.textColor};
  font-size: 28px;
  font-weight: 600;
`;
const Release = styled.Text`
  margin-bottom: 8px;
  color: ${(props) => props.theme.textColor};
`;
const Genre = styled.Text`
  margin: 0 10px 10px 0;
  color: ${(props) => props.theme.textColor};
`;
const Data = styled.View`
  padding: 0 20px;
  margin: 10px 0;
`;
const OverView = styled.Text`
  margin: 20px 0;
  font-size: 14px;
  color: ${(prosp) => prosp.theme.textColor};
`;
const VideoBtn = styled.TouchableOpacity`
  width: 90%;
  flex-direction: row;
`;
const BtnText = styled.Text`
  margin: 0 0 10px 10px;
  color: ${(props) => props.theme.textColor};
  line-height: 24px;
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
  const isMovie = 'original_title' in params;
  const { isLoading, data } = useQuery(
    [isMovie ? 'movies' : 'tv', params.id],
    isMovie ? moviesAPI.detail : tvAPI.detail
  );

  const shareMedia = async () => {
    const isAndroid = Platform.OS === 'android';
    const homepage = isMovie
      ? `https://www.imdb.com/title/${data.imdb_id}/`
      : data.homepage;
    if (isAndroid) {
      await Share.share({
        message: `${params.overview}\n Check it out: ${homepage}`,
      });
    } else {
      await Share.share({
        url: homepage,
      });
    }
  };
  const ShareButton = () => (
    <TouchableOpacity onPress={shareMedia}>
      <Ionicons
        name='share-outline'
        color={isDark ? '#fff' : '#000'}
        size={24}
      />
    </TouchableOpacity>
  );

  useEffect(() => {
    setOptions({
      title: 'original_title' in params ? 'Movie' : 'TV Show',
    });
  }, []);

  useEffect(() => {
    if (data) {
      setOptions({
        headerRight: () => <ShareButton />,
      });
    }
  }, [data]);

  const openYTLink = async (videoId: string) => {
    const baseUrl = `http://m.youtube.com/watch?v=${videoId}`;
    await WebBrowser.openBrowserAsync(baseUrl);
    // await Linking.openURL(baseUrl);
  };
  const isDark = useColorScheme() === 'dark';
  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(params.backdrop_path || '') }}
        />
        <LinearGradient
          colors={
            isDark
              ? ['rgba(0,0,0,0.4)', BLACK]
              : ['rgba(255,255,255,0.4)', 'whitesmoke']
          }
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
            <Column>
              {data?.genres?.map((genre) => (
                <Genre>{genre.name}</Genre>
              ))}
            </Column>
          </Row>
        </Column>
      </Header>
      <Data>
        <OverView>{params.overview}</OverView>
        {isLoading ? <Loader /> : null}

        {data?.videos?.results?.slice(0, 3).map((video) => (
          <VideoBtn key={video.key} onPress={() => openYTLink(video.key)}>
            <Ionicons name='logo-youtube' color='red' size={24} />
            <BtnText>{video.name}</BtnText>
          </VideoBtn>
        ))}
      </Data>
    </Container>
  );
};

export default Detail;

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { Movie, TV } from '../API/api';
import Poster from '../components/Poster';

const Container = styled.ScrollView`
  padding: 20px;
  background-color: ${(props) => props.theme.mainBgColor};
`;
const Title = styled.Text``;

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
  useEffect(() => {
    setOptions({
      title:
        'original_title' in params
          ? params.original_title
          : params.original_name,
    });
  }, []);
  return (
    <Container>
      <Poster path={params.poster_path || ''} />
    </Container>
  );
};

export default Detail;

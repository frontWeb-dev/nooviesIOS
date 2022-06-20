import React, { useEffect } from 'react';
import styled from 'styled-components/native';

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;
const Title = styled.Text``;

const Detail = ({
  navigation: { setOptions },
  route: {
    params: { original_title },
  },
}) => {
  useEffect(() => {
    setOptions({
      title: original_title,
    });
  }, []);
  return (
    <Container>
      <Title>{original_title}</Title>
    </Container>
  );
};

export default Detail;

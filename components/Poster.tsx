import React from 'react';
import styled from 'styled-components/native';

// files
import { makeImgPath } from '../API/utills';

// style
const Image = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;

interface posterProps {
  path: string;
}
const Poster: React.FC<posterProps> = ({ path }) => (
  <Image source={{ uri: makeImgPath(path) }} />
);

export default Poster;

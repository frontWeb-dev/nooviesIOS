import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import VMedia from './VMedia';
import { Movie, TV } from '../API/api';
import { loadMore } from '../API/utills';

const ListContainer = styled.View`
  margin-bottom: 40px;
`;
const ListTitle = styled.Text`
  margin: 0 0 20px 30px;
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  font-size: 18px;
`;
const HListSeperator = styled.View`
  width: 20px;
`;
interface HListProps {
  title: string;
  data: any[];
  hasNextPage?: boolean | undefined;
  fetchNextPage?: any;
}
const HList: React.FC<HListProps> = ({
  title,
  data,
  hasNextPage,
  fetchNextPage,
}) => {
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <FlatList
        data={data}
        horizontal
        onEndReached={() => loadMore(hasNextPage, fetchNextPage)}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        ItemSeparatorComponent={HListSeperator}
        keyExtractor={(item: Movie | TV) => item.id + ''}
        renderItem={({ item }: { item: Movie | TV }) => (
          <VMedia
            poster_path={item.poster_path || ''}
            original_title={
              'original_title' in item
                ? item.original_title
                : item.original_name
            }
            vote_average={item.vote_average}
            fullData={item}
          />
        )}
      />
    </ListContainer>
  );
};

export default HList;

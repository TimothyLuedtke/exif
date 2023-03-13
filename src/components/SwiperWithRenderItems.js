import React from 'react';
import { Image } from 'react-native';
import SwiperFlatList, { Pagination } from 'react-native-swiper-flatlist';
import { ImageStyle, PaginationStyle } from '../styles/GlobalStyles';
import Colors from '../styles/Colors';

export default (props) => {

  const { 
    data,
  } = props;

  const CustomPagination = (props) => {
    return (
      <Pagination
        {...props}
        paginationStyle={PaginationStyle.paginationContainer}
        paginationStyleItem={PaginationStyle.pagination}
        paginationDefaultColor={Colors.transparent}
        paginationActiveColor={Colors.dark}
      />
    );
  };

  return (
    
    <SwiperFlatList
      index={0}
      data={data}
      renderItem={({ item }) => <Image style={ImageStyle.fullScreen} source={{uri: item.uri}} />}
      showPagination
            PaginationComponent={CustomPagination}

    />
  );
};

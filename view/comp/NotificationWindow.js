import React from 'react';
import {View} from 'react-native';
import {Image, Text} from './components';
import {Color, Dim, Img} from '../../src/common';

export const NotificationWindow = props => {
  const {text, image, color} = props;

  return (
    <View
      style={{
        flexDirection: 'row',
        // width: '100%',
        borderRadius: 5,
        backgroundColor: color,
        ...Dim.margin(10, 15, 10, 15),
        ...Dim.padding(10, 15, 10, 15),
      }}>
      {/*<Image source={Img.question} />*/}
      <Image source={image} />
      <Text color={'white'} size={15} style={{...Dim.margin(0, 0, 0, 15)}}>
        {text}
      </Text>
    </View>
  );
};

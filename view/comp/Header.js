import React from 'react';
import {Text} from './components';
import {View} from 'react-native';
import {Dim} from '../../src/common';

export const Header = props => {
  const {title} = props;

  return (
    <View
      style={{
        width: '100%',
        height: Dim.y(50),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text bold size={20}>
        {title}
      </Text>
    </View>
  );
};

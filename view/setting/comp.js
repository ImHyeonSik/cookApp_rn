import {View} from 'react-native';
import {Dim} from '../../src/common';
import {BaseView, Image, Pressable, ScrollView, Text} from '../comp/components';
import color from '../../src/common/color';

export const SettingBaseList = props => {
  const {item} = props;

  return (
    <View
      style={{
        // flex: 1,
        width: Dim.fullWidth,
        backgroundColor: color.white,
        borderWidth: 1,
        borderColor: color.gray,
        ...Dim.margin(10, 0, 0, 0),
      }}>
      {item.map(({onPress, text}, index) => {
        return (
          <View
            key={index.toString()}
            style={{
              ...Dim.margin(10, 10, 10, 10),
              borderBottomWidth: index !== item.length - 1 ? 1 : 0,
              borderColor: color.gray,
            }}>
            <Text bold style={{...Dim.padding(0, 0, 2, 0)}}>
              {text}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

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
        borderColor: color.light,
        ...Dim.margin(10, 0, 0, 0),
      }}>
      {item.map(({onPress, text, button}, index) => {
        return (
          <View
            key={index.toString()}
            style={{
              flex: 1,
              ...Dim.padding(10, 10, 10, 10),
              ...Dim.margin(0, 10, 0, 10),
              borderBottomWidth: index !== item.length - 1 ? 1 : 0,
              borderColor: color.light,
              flexDirection: 'row',
              justifyContent: 'space-between',
              // borderWidth: 1,
            }}>
            {/*<Text bold style={{...Dim.margin(0, 0, 2, 0)}}>*/}
            <Text bold style={{...Dim.margin(0, 0, 2, 0)}}>
              {text}
            </Text>

            {button && button}
          </View>
        );
      })}
    </View>
  );
};

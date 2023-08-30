import {StyleSheet} from 'react-native';
import {Image, Pressable} from '../comp/components';
import {Color, Dim, Style} from '../../src/common';

export const SNSButton = ({img, text, textColor, backColor, onPress}) => (
  <Pressable
    viewStyle={[css.snsBtnContainer, Color.back(backColor)]}
    onPress={onPress}>
    <Image style={css.snsImg} source={img} />
    {text && <Text color={textColor}>{text}</Text>}
  </Pressable>
);

const css = StyleSheet.create({
  snsBtnContainer: {
    // ...Style.inline,
    ...Style.center,
    ...Dim.size(40, 40, 40),
    alignSelf: 'center',
    // borderRadius: 40,
  },
  snsImg: {
    ...Dim.size(15, 15),
    ...Dim.margin(0, 0, 0, 0),
  },
});

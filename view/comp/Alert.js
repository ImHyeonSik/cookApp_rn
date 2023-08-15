import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import {Text, PopMenu, Image, Button} from './components';
import Common, {Color, Dim, Style, t} from '../../src/common';
import Img from '../../src/img';
import {font, alert} from '../../src/constant';
import {getAlert} from '../../src/redux/reducers/alert';
import {dismissAlert} from '../../src/redux/action';

const Alert = () => {
  const dispatch = useDispatch();
  const {visible, title, message, buttons, opt, renderContent} =
    useSelector(getAlert);
  const {
    cancelable = true,
    onCancelPress,
    btnDirection,
    contentContainerStyle,
    titleStyle,
    messageStyle,
  } = opt;

  const onDismissAlert = (onBtnPress = () => false) => {
    dispatch(dismissAlert());
    onBtnPress && typeof onBtnPress === 'function' && onBtnPress();
  };

  let onPressCancel = onCancelPress;
  const btnList =
    buttons.length === 0
      ? [
          {
            text: '확인',
            onPress: onDismissAlert,
            style: alert.styleMain,
          },
        ]
      : buttons.map(({onPress, ...btn}) => ({
          onPress: () => onDismissAlert(onPress),
          ...btn,
        }));

  const getBtnWidth = () => {
    if (btnDirection === alert.btnDirectionColumn) return DEFAULT_BTN_WIDTH;
    else
      return (
        (DEFAULT_BTN_WIDTH - DEFAULT_BTN_MARGIN * (btnList.length - 1)) /
        btnList.length
      );
  };
  const getBtnDirectionStyle = index => {
    if (index === btnList.length - 1) return null;
    else if (btnDirection === alert.btnDirectionRow)
      return Dim.margin(0, 8, 0, 0);
    else if (btnDirection === alert.btnDirectionColumn)
      return Dim.margin(0, 0, 8);
  };
  const getBtnColor = style => {
    switch (style) {
      case alert.styleMain:
      default:
        return 'main';
      case alert.styleDark:
        return 'mainDark';
      case alert.styleCancel:
        return 'shadowEA';
    }
  };
  const getBtnTextColor = style => {
    switch (style) {
      case alert.styleMain:
      case alert.styleCancel:
      default:
        return 'mainDark';
      case alert.styleDark:
        return 'white';
    }
  };

  return (
    <PopMenu
      visible={visible}
      onRequestClose={() => cancelable && onDismissAlert(onPressCancel)}
      // style={{borderRadius: 20}}
      // modalStyle={{borderWidth:1,}}
      modalInViewStyle={{borderRadius: 20}}>
      <View
        style={[
          css.container,
          contentContainerStyle,
          {justifyContent: 'space-around'},
        ]}>
        {!Common.isEmpty(title) && (
          <Text bold style={titleStyle} size={15} center>
            {title}
          </Text>
        )}
        {/*<Image*/}
        {/*    containerStyle={css.cancel}*/}
        {/*    style={Dim.size(16,16)}*/}
        {/*    source={Img.cancel}*/}
        {/*    onPress={() => onDismissAlert(onPressCancel)}*/}
        {/*    hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}*/}
        {/*/>*/}
        {!Common.isEmpty(message) && (
          <Text
            style={[css.message, messageStyle]}
            size={14}
            center
            font={font.notoMedium}>
            {message}
          </Text>
        )}
        {renderContent()}
        {/*<View style={btnDirection === alert.btnDirectionRow && Style.inline}>*/}
        <View style={css.bottom}>
          {btnList.map(({text, onPress, style, ...others}, index) => {
            return (
              <Button
                {...others}
                key={index}
                style={[
                  Color.back(getBtnColor(style)),
                  getBtnDirectionStyle(),
                  {height: Dim.x(40), borderRadius: 10},
                ]}
                height={40}
                text={text}
                // textColor={getBtnTextColor(style)}
                textColor={'white'}
                width={getBtnWidth()}
                onPress={() => onDismissAlert(onPress)}
              />
            );
          })}
        </View>
      </View>
    </PopMenu>
  );
};

const DEFAULT_BTN_WIDTH = 264;
const DEFAULT_BTN_MARGIN = 8;
const css = StyleSheet.create({
  container: {
    flex: 1,
    ...Dim.margin(27, 24, 24),
  },
  cancel: {
    position: 'absolute',
    right: Dim.x(2),
  },
  message: {
    flex: 1,
    ...Dim.margin(17, 0, 28),
  },
  bottom: {
    ...Style.inline,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    bottom: -1,
  },
});

export default Alert;

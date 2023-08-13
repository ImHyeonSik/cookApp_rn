import React, {useEffect, useState} from 'react';
import {
  Animated,
  Image as ImgRN,
  Modal,
  Pressable as Press,
  RefreshControl,
  SafeAreaView as Safe,
  ScrollView as Scroll,
  StyleSheet,
  Text as P,
  TouchableHighlight as Touch,
  useColorScheme,
  View,
} from 'react-native';
import {Color, Dim, Style, t} from '../../src/common';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RectButton} from 'react-native-gesture-handler';
// import TextInputMask from 'react-native-text-input-mask';

export const BaseView = props => {
  const {
    children,
    statusBarBackColor,
    homeIndicatorBackColor,
    backgroundColor,
    style,
    needScrollView,
    onRefresh,
    scrollEnabled,
  } = props;
  const scrollViewProps = {onRefresh, scrollEnabled};
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={{flex: 1}}>
      <Safe
        style={{
          flex: 0,
          backgroundColor: isDarkMode ? Color.main : statusBarBackColor,
        }}
      />
      <Safe style={{flex: 1, backgroundColor: homeIndicatorBackColor}}>
        {needScrollView ? (
          <ScrollView
            {...scrollViewProps}
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}>
            <View style={[{flex: 1, backgroundColor}, style]}>{children}</View>
          </ScrollView>
        ) : (
          <View style={[{flex: 1, backgroundColor}, style]}>{children}</View>
        )}
      </Safe>
    </View>
  );
};
BaseView.defaultProps = {
  statusBarBackColor: Color.white,
  homeIndicatorBackColor: Color.white,
  backgroundColor: Color.white,
  needScrollView: true,
};

export const Button = props => {
  const {
    width,
    height,
    style,
    viewStyle,
    onPress,
    disabled,
    enablePressFadeIn,
    enablePressFadeOut,
    textColor,
    text,
    ...others
  } = props;
  const pressableProps = {
    onPress,
    disabled,
    enablePressFadeIn,
    enablePressFadeOut,
  };

  return (
    <Pressable
      style={btnProps => [
        width && {width: Dim.x(width)},
        height && {height: Dim.y(height)},
        disabled ? Color.back('shadowCC') : Color.back('main'),
        css.buttonPressable,
        typeof style === 'function' ? style(btnProps) : style,
      ]}
      viewStyle={[Style.center, css.full, viewStyle]}
      {...pressableProps}>
      <Text
        // color={disabled ? 'white' : textColor}
        color={textColor || 'black'}
        {...others}>
        {text}
      </Text>
    </Pressable>
  );
};
Button.defaultProps = {
  textColor: 'mainDark',
  center: true,
  height: 48,
  width: '100%',
  size: 13,
  onPress: () => false,
};

export const Image = props => {
  const {
    containerStyle: style,
    viewStyle,
    onPress,
    hitSlop,
    source,
    disabled,
    ...others
  } = props;
  const pressableProps = {style, viewStyle, onPress, hitSlop, disabled};
  // console.log('image sooooooo => ', source)
  const img = <ImgRN source={source} {...others} />;

  return onPress ? (
    <Pressable {...pressableProps}>{img}</Pressable>
  ) : (
    <View style={style}>{img}</View>
  );
};
Image.defaultProps = {
  resizeMode: 'contain',
};

export const ScrollView = props => {
  const {
    children,
    onRefresh,
    enableRefresh = typeof onRefresh === 'function',
    ...others
  } = props;
  return (
    <Scroll
      {...others}
      bounces={enableRefresh}
      refreshControl={
        enableRefresh === true ? (
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        ) : (
          false
        )
      }>
      {children}
    </Scroll>
  );
};

export const Pressable = props => {
  const {
    children,
    viewStyle,
    enablePressFadeIn,
    enablePressFadeOut,
    ...others
  } = props;

  const animated = new Animated.Value(1);
  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.5,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Press
      onPressIn={enablePressFadeIn ? fadeIn : null}
      onPressOut={enablePressFadeOut ? fadeOut : null}
      {...others}>
      <Animated.View style={[viewStyle, {opacity: animated}]}>
        {children}
      </Animated.View>
    </Press>
  );
};
Pressable.defaultProps = {
  onPress: () => false,
  enablePressFadeIn: true,
  enablePressFadeOut: true,
};

export const PopMenu = props => {
  const {
    children,
    visible = true,
    showLogo = true,
    onCloseImage,
    list,
    onClose,
    onRequestClose,
    onCloseIcon,
    renderItem,
    style,
    title,
    contents,
    scrollEnabled = true,
    scrollViewHeight,
    modalStyle,
    modalType = 'none',
    modalInViewStyle,
    backgroundPress = false,
  } = props;

  const [fadeAnim] = useState(new Animated.Value(0));

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (visible) fadeIn();
    else {
      // console.log('fade')
      fadeOut();
    }
  }, [visible]);

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onRequestClose}
      animationType={modalType}>
      {/*<KeyboardAvoidingView*/}
      {/*    behavior={Platform.OS === 'ios' ? "padding" : ""}*/}
      {/*    keyboardVerticalOffset={Dim.x(1000)}*/}
      {/*>*/}
      {modalType === 'slide' ? (
        <Pressable
          disabled={backgroundPress}
          onPress={onClose}
          style={[
            {flex: 1, backgroundColor: Color.overlay},
            style || {justifyContent: 'center'},
          ]}>
          <Safe
            style={{
              backgroundColor: Color.mainBackground,
              borderTopRightRadius: 50,
            }}>
            <Pressable
              disabled={false}
              enablePressFadeIn={null}
              enablePressFadeOut={null}>
              <ScrollView
                scrollEnabled={scrollEnabled}
                contentContainerStyle={[
                  modalStyle,
                  {flexGrow: 1, alignItems: 'center', justifyContent: 'center'},
                ]}>
                <View style={[css.popmenu, modalInViewStyle]}>
                  {onCloseIcon && (
                    <Icon
                      name="close"
                      size={23}
                      color={Color.black}
                      onPress={onCloseIcon}
                    />
                  )}
                  {title !== undefined && (
                    <Text
                      center
                      size={15}
                      style={{...Dim.padding(26, 0, 19)}}
                      onPress={null}
                      bold
                      color="black">
                      {title}
                    </Text>
                  )}
                  {contents !== undefined && (
                    <Text
                      center
                      style={{padding: 10}}
                      color="main"
                      onPress={null}>
                      {contents}
                    </Text>
                  )}
                  {/*{children}*/}
                  {children
                    ? children
                    : Array.isArray(list) &&
                      list.map((item, i) => (
                        <View key={`pop${i}`}>
                          <View
                            style={{backgroundColor: Color.light, height: 1}}
                          />
                          {renderItem ? (
                            renderItem(item, i)
                          ) : (
                            <TouchableHighlight
                              onPress={item.onPress}
                              style={{padding: 15}}
                              viewStyle={[Style.inline, Style.center]}>
                              {item.img && (
                                <Image
                                  source={item.img}
                                  style={{
                                    marginHorizontal: 10,
                                    width: 50,
                                    height: 50,
                                  }}
                                />
                              )}
                              <Text center>{item.text}</Text>
                            </TouchableHighlight>
                          )}
                        </View>
                      ))}
                </View>
              </ScrollView>
            </Pressable>
          </Safe>
        </Pressable>
      ) : (
        <Pressable
          disabled={backgroundPress}
          onPress={onClose}
          style={[
            {flex: 1, backgroundColor: Color.overlay},
            style || {justifyContent: 'center'},
          ]}>
          <ScrollView
            scrollEnabled={scrollEnabled}
            contentContainerStyle={[
              modalStyle,
              {flexGrow: 1, alignItems: 'center', justifyContent: 'center'},
            ]}>
            <View style={[css.popmenu, modalInViewStyle]}>
              {onCloseIcon && (
                <Icon
                  name="close"
                  size={23}
                  color={Color.black}
                  onPress={onCloseIcon}
                />
              )}
              {title !== undefined && (
                <Text
                  center
                  size={15}
                  style={{...Dim.padding(26, 0, 19)}}
                  onPress={null}
                  bold
                  color="black">
                  {title}
                </Text>
              )}
              {contents !== undefined && (
                <Text center style={{padding: 10}} color="main" onPress={null}>
                  {contents}
                </Text>
              )}
              {/*{children}*/}
              {children
                ? children
                : Array.isArray(list) &&
                  list.map((item, i) => (
                    <View key={`pop${i}`}>
                      <View style={{backgroundColor: Color.light, height: 1}} />
                      {renderItem ? (
                        renderItem(item, i)
                      ) : (
                        <TouchableHighlight
                          onPress={item.onPress}
                          style={{padding: 15}}
                          viewStyle={[Style.inline, Style.center]}>
                          {item.img && (
                            <Image
                              source={item.img}
                              style={{
                                marginHorizontal: 10,
                                width: 50,
                                height: 50,
                              }}
                            />
                          )}
                          <Text center>{item.text}</Text>
                        </TouchableHighlight>
                      )}
                    </View>
                  ))}
            </View>
          </ScrollView>
        </Pressable>
      )}
    </Modal>
  );
};

export const PopMenuBottom = ({onOK, onCancel}) => (
  <View style={css.bottom}>
    <Text
      containerStyle={{flex: 1}}
      viewStyle={css.bottomBtnLeft}
      style={{fontSize: ['id'].indexOf(t.getLanguage()) > -1 ? 14 : 15}}
      center
      onPress={onCancel}>
      {t.cancel}
    </Text>
    <Text
      containerStyle={{flex: 1}}
      viewStyle={css.bottomBtnRight}
      style={{fontSize: ['id'].indexOf(t.getLanguage()) > -1 ? 14 : 15}}
      bold
      center
      color="white"
      onPress={onOK}>
      {t.confirm}
    </Text>
  </View>
);

export const Text = props => {
  let {
    img,
    rightImg,
    imgContainerStyle,
    imgStyle,
    bold,
    center,
    children,
    clear,
    color,
    containerStyle,
    disabled,
    font,
    height,
    onPress,
    right,
    size,
    style,
    thin,
    viewStyle,
    maxSize = 1.5,
    ellipsis,
    hitSlop,
    ...others
  } = props;
  const pressableProps = {hitSlop};

  style = [{fontSize: Dim.x(size)}, style, font && {fontFamily: font}];

  if (clear) style.push({backgroundColor: 'transparent'});

  // color
  if (color) style.push({color: Color[color]});

  // weight
  if (bold) style.push({fontWeight: 'bold'});
  if (thin)
    style.push({fontFamily: font || 'Noto Sans CJK KR', fontWeight: '100'});

  // alignment
  if (center)
    style.push({
      textAlign: 'center',
      textAlignVertical: 'center',
      alignSelf: 'center',
    });
  if (right) style.push({textAlign: 'right'});

  if (height) style.push({lineHeight: Dim.y(height)});

  if (ellipsis) {
    others.numberOfLines = 1;
    others.ellipsizeMode = 'tail';
  }

  others.style = style;

  const text = (
    <P maxFontSizeMultiplier={maxSize} {...others}>
      {children}
    </P>
  );
  const textWithImg = img ? (
    <View style={[css.imageWithText, imgContainerStyle]}>
      <Image source={img} style={[Dim.margin(0, 5, 0, 0), imgStyle]} />
      {text}
    </View>
  ) : rightImg ? (
    <View style={[css.imageWithText, imgContainerStyle]}>
      {text}
      <Image source={rightImg} style={[Dim.margin(0, 0, 0, 5), imgStyle]} />
    </View>
  ) : (
    <View style={containerStyle}>{text}</View>
  );

  return onPress !== undefined ? (
    <Pressable
      {...pressableProps}
      onPress={!disabled && onPress}
      style={containerStyle}
      viewStyle={viewStyle}>
      {textWithImg}
    </Pressable>
  ) : (
    textWithImg
  );
};
Text.defaultProps = {
  color: 'mainDark',
  // font: font.notoBold,
  size: 13,
};

// export const TextInput = forwardRef((props, ref) =>
//     (
// <TextInputMask
//     {...props}
//     ref={ref}
// />
//     )
// )

export const TouchableHighlight = props => {
  const {
    children,
    onPress,
    underlayColor = 'transparent',
    viewStyle,
    ...others
  } = props;

  return (
    <Touch
      underlayColor={underlayColor}
      onPress={typeof onPress === 'function' ? onPress : undefined}
      {...others}>
      <View style={viewStyle}>{children}</View>
    </Touch>
  );
};

export const Sp = props => {
  const {color = 'light', style} = props;
  return <View style={[Dim.cssSize('100%', 1), Color.back(color), style]} />;
};

export const RangeItem = () => {
  const {color = 'light', min, max, width = '100%', isShowText} = this.props;
  return (
    <View style={{width}}>
      <View
        style={[
          Dim.cssSize('100%', Dim.y(10), Dim.y(10) / 2),
          Color.back(color),
        ]}
      />
      {isShowText === true && (
        <View
          style={[
            Style.inline,
            Dim.padding(16.6),
            {justifyContent: 'space-between'},
          ]}>
          <Text size={11} color="gray">
            {min}
          </Text>
          <Text size={11} color="gray">
            {max}
          </Text>
        </View>
      )}
    </View>
  );
};

export const RangeGraph = () => {
  const {
    color,
    min,
    max,
    value,
    valueMin,
    valueMax,
    isShowTriangle,
    isShowText,
  } = this.props;
  const barHeight = isShowTriangle ? 35 : 18.3;

  return (
    <View>
      <RangeItem min={min} max={max} isShowText={isShowText} />
      <View style={[Style.inline, Style.fullAbs]}>
        <View style={{width: `${((valueMin - min) / (max - min)) * 100}%`}} />
        <RangeItem
          width={`${((valueMax - valueMin) / (max - min)) * 100}%`}
          min={valueMin}
          max={valueMax}
          color={color}
          isShowText={isShowText}
        />
      </View>
      <View style={[Style.fullAbs, {top: -Dim.y(barHeight)}]}>
        <View style={Style.inline}>
          <View
            style={{
              width: `${((value - min) / (max - min)) * 100}%`,
              height: Dim.y(10),
            }}
          />
          <View>
            {isShowTriangle && (
              <View
                style={{
                  ...Style.triangle(21, 18, 'top', Color.red),
                  left: -Dim.x(9.5),
                }}
              />
            )}
            <View
              style={[Dim.size(3.3, 46.6), Color.back('gray'), Dim.margin(5)]}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export const TouchableButton = props => {
  const {children, onPress, underlayColor, viewStyle, ...others} = props;
  return (
    <RectButton
      underlayColor={underlayColor}
      rippleColor={underlayColor}
      onPress={typeof onPress === 'function' ? onPress : undefined}
      {...others}>
      <View style={viewStyle}>{children}</View>
    </RectButton>
  );
};

const css = StyleSheet.create({
  imageWithText: {
    ...Style.inline,
    alignItems: 'center',
  },
  popmenu: {
    width: Dim.x(312),
    minHeight: Dim.y(194),
    backgroundColor: 'white',
    // borderRadius: 16,
  },
  full: {
    flex: 1,
  },
  buttonPressable: {
    borderRadius: 30,
    alignSelf: 'center',
  },
  bottomBtnLeft: {
    padding: 15,
    backgroundColor: Color.bright,
    borderBottomLeftRadius: 10,
  },
  bottomBtnRight: {
    padding: 15,
    backgroundColor: Color.main,
    borderBottomRightRadius: 10,
  },
  bottom: {
    ...Style.inline,
  },
});

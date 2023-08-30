import React, {useEffect, useState} from 'react';
import {Color, Dim, Img} from '../src/common';
import {Image, Pressable, Text} from '../view/comp/components';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  StyleSheet,
  Keyboard,
} from 'react-native';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import useKeyboard from '../src/hook/useKeyboard';

export const MyTabBar = ({
  socket,
  state,
  descriptors,
  navigation,
  ...route
}) => {
  const [chatCnt, setChatCnt] = useState(0);
  const [initTabBar, setInitTabBar] = useState([]); // 젤 초기의 tabbar item
  const [initTab, setInitTab] = useState(3); // 젤 초기의 tabbar item
  const {value} = useSelector(({user}) => ({
    value: user.get('userData').toJS(),
  }));
  const {keyboardHeight, keyboardState} = useKeyboard();

  useEffect(() => {
    setInitTabBar(state.routes);
  }, []);

  useEffect(() => {
    console.log('llll', state.routes, state.routes.length);
    if (value.count === -1) {
      console.log('qqqqwww', state.routes);
      // let po = [...state.routes].pop();
      // setInitTabBar(po);
      setInitTab(3);
    } else {
      setInitTab(initTab + 1);
      // setInitTabBar(state.routes);
    }
  }, [value.count]);

  const ItemAndTitle = props => {
    const {onImage, offImage, title, isFocused} = props;

    return (
      <View style={{alignItems: 'center'}}>
        <Image
          source={isFocused ? onImage : offImage}
          style={{...Dim.size(25, 25)}}
        />
        <Text size={9} color={isFocused && 'main'}>
          {title}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[css.TabBarContainer, keyboardHeight && {height: 0}]}>
      {state.routes.name === 'IngredientInfo' ? null : (
        <View style={css.TabBarInnerContainer}>
          {state.routes.slice(0, initTab).map((route, index) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const isInfo = label === 'IngredientInfo';
            const isCount = value.count !== -1;
            const isPp = isInfo && isCount;
            // console.log('++++', isInfo, isCount, isPp);
            console.log('+++!@', label);

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
              });

              if (!isFocused && !event.defaultPrevented) {
                console.log('mmmmmm ', route.name);
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <LinearGradient
                key={index}
                // colors={['transparent', 'transparent']}
                start={{x: 0.0, y: 0.0}}
                end={{x: 0.0, y: 0.3}}
                colors={
                  isFocused
                    ? ['rgba(102, 163, 132, 0.3)', 'rgba(255, 255, 255, 1)']
                    : ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)']
                }
                style={[
                  css.TabBarItemContainer,
                  {borderTopColor: isFocused ? Color.main : 'transparent'},
                ]}>
                {isPp ? (
                  <Pressable
                    style={{
                      borderWidth: 3,
                      borderColor: Color.white,
                      // flex: 1,
                      // width: '100%',
                      // height: '100%',
                      // ...Dim.size(40, 20, 100),
                      backgroundColor: Color.main,
                      position: 'absolute',
                      top: -60,
                      width: 60,
                      height: 60,
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                      elevation: 10,
                    }}
                    onPress={() => {
                      console.log('<><>', route.name);
                      navigation.navigate('IngredientInfoMain');
                      // navigation.navigate('IngredientInfo');
                    }}>
                    <Text color={'white'}>{value.count}</Text>
                  </Pressable>
                ) : (
                  <Pressable
                    key={route.name}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    activeOpacity={1}
                    onPress={onPress}
                    style={[
                      {
                        flex: 1,
                        // borderWidth: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        width: '100%',
                      },
                    ]}>
                    {route.name === 'DashboardStack' ? (
                      // <Image
                      //   source={isFocused ? Img.dashboard_on : Img.dashboard_off}
                      //   style={{
                      //     ...Dim.size(25, 25),
                      //   }}
                      // />
                      <ItemAndTitle
                        isFocused={isFocused}
                        onImage={Img.dashboard_on}
                        offImage={Img.dashboard_off}
                        title={label}
                      />
                    ) : route.name === 'IngredientStack' ? (
                      <ItemAndTitle
                        isFocused={isFocused}
                        onImage={Img.ingredient_on}
                        offImage={Img.ingredient_off}
                        title={label}
                      />
                    ) : (
                      route.name === 'SettingStack' && (
                        <ItemAndTitle
                          isFocused={isFocused}
                          onImage={Img.setting_on}
                          offImage={Img.setting_off}
                          title={label}
                        />
                      )
                    )}
                  </Pressable>
                )}
              </LinearGradient>
            );
          })}
        </View>
      )}
    </SafeAreaView>
  );
};

const css = StyleSheet.create({
  TabBarContainer: {
    backgroundColor: Color.white,
    // borderTopLeftRadius: 40,
    underlayColor: Color.black,
    borderTopWidth: 1,
    // borderWidth: 3,
    borderColor: Color.grayDC,
  },
  TabBarInnerContainer: {
    height: Dim.x(70),
    flexDirection: 'row',
    alignItems: 'center',
  },
  TabBarItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // height: '100%',
    // borderWidth: 1,
    paddingVertical: 10,
    borderTopWidth: 2,
    // borderWidth: 1,
  },
});

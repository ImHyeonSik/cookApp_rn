import React, {useState} from 'react';
import {Color, Img} from '../src/common';
import {Image, Text} from '../view/comp/components';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';

export const MyTabBar = ({
  socket,
  state,
  descriptors,
  navigation,
  ...route
}) => {
  const [chatCnt, setChatCnt] = useState(0);
  const {value} = useSelector(({user}) => ({
    value: user.get('userData').toJS(),
  }));

  return (
    <SafeAreaView
      style={{
        backgroundColor: Color.main,
        borderTopLeftRadius: 40,
        underlayColor: Color.black,
      }}>
      <View
        style={{
          borderTopLeftRadius: 40,
          width: '100%',
          height: Dim.x(70),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
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
            <TouchableOpacity
              key={route.name}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              activeOpacity={1}
              onPress={onPress}
              style={{flex: 1, alignItems: 'center'}}>
              {route.name === 'MemberStack' ? (
                <Image
                  source={isFocused ? Img.member_on : Img.member_off}
                  // style={{...Dim.size(30, 30)}}
                />
              ) : route.name === 'Chatting' ? (
                <View style={{}}>
                  {!isFocused && value.chatCount !== 0 && (
                    <Image
                      source={Img.unread_message}
                      style={{
                        position: 'absolute',
                        top: -5,
                        right: -5,
                        zIndex: 1,
                        // ...Dim.size(5, 5),
                      }}
                    />
                  )}

                  <Image
                    source={isFocused ? Img.chatting_on : Img.chatting_off}
                    // style={{...Dim.size(30, 30)}}
                  />
                  {chatCnt > 0 && (
                    <Text
                      style={{
                        position: 'absolute',
                        top: -45,
                        right: -15,
                        backgroundColor: Color.red,
                        // ...Dim.padding(3, 7),
                        borderRadius: 20,
                        fontSize: 12,
                      }}
                      color={'white'}>
                      {chatCnt > 99 ? '99' : chatCnt}
                    </Text>
                  )}
                </View>
              ) : (
                <Image
                  source={isFocused ? Img.setting_on : Img.setting_off}
                  // style={{...Dim.size(30, 30)}}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

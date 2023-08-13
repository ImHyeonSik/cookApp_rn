import React from 'react';
import {NativeModules, StyleSheet, View} from 'react-native';
import {BaseView, Image, Text} from '../comp/components';
import {Color, Dim, Img} from '../../src/common';
import {NotificationWindow} from '../comp/NotificationWindow';
import Ingredient from '../ingredient/Ingredient';

const {StatusBarManager} = NativeModules;

const Dashboard = ({navigation, route}) => {
  // const {value} = useSelector(({user}) => ({
  //   value: user.get('userData').toJS(),
  // }));

  return (
    <BaseView
      needScrollView={false}
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: Color.baseBackground,
      }}>
      <View style={{flex: 1, width: '100%'}}>
        <NotificationWindow
          color={Color.mainLight}
          image={Img.question}
          text={'냉장고에 재료를 채줘주세요!'}
        />

        <View
          style={{
            flex: 1,
            // borderWidth: 1,
            // margin: ,
            ...Dim.margin(30, 30, 30),
            // ...Dim.padding(0, 20, 0, 20),
          }}>
          <Image
            viewStyle={{
              position: 'absolute',
              zIndex: 10,
              right: -20,
            }}
            source={Img.plus}
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
            onPress={() => {
              console.log('gsgsg');
              navigation.replace('Ingredient');
            }}
          />
          <Image
            // viewStyle={{...Dim.margin(10, 10, 10, 10)}}
            style={{
              // ...Dim.margin(40),
              width: '100%',
              height: '100%',
              zIndex: -10,
            }}
            // resizeMode="cover"
            source={Img.refrigerator_01}
          />
        </View>
      </View>
    </BaseView>
  );
};

const css = StyleSheet.create({});

export default Dashboard;

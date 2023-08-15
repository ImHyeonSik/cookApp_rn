import React, {useState} from 'react';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Switch,
  View,
} from 'react-native';
import {BaseView, Image, Pressable, ScrollView, Text} from '../comp/components';
import {Color, Dim, Img, Style, t} from '../../src/common';
// import {MiddleTitleContainer} from './comp';
import {useNavigation} from '@react-navigation/native';
// import {TextInputWithImage} from '../comp/TextInputWithImage';
// import useLoad from '../../src/hook/useLoad';
import {list} from '../../event/Connect';
import {useDispatch} from 'react-redux';
import {SettingBaseList} from './comp';
// import {setUserData, showAlert} from '../../src/redux/action';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import SlidePopMenu from '../comp/SlidePopMenu';

const Setting = () => {
  const [autoLogin, setAutoLogin] = useState(false); // 자동로그인 토글 상태
  const [noti, setNoti] = useState(false); // 알림 토글 상태
  const [ad, setAd] = useState(false); // 광고

  let listItem1 = [
    {
      text: '자동 로그인',
      onPress: () => console.log('자동 로그인'),
      button: (
        <View>
          <Switch
            trackColor={{false: Color.shadowC2, true: Color.main}}
            // thumbColor={autoLogin ? '#f5dd4b' : '#f4f3f4'}
            thumbColor={Color.white}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setAutoLogin}
            value={autoLogin}
            style={{transform: [{scaleX: 1}, {scaleY: 1.3}]}}
          />
        </View>
      ),
    },
    {
      text: '알림',
      onPress: () => console.log('알림'),
      button: (
        <View>
          <Switch
            trackColor={{false: Color.shadowC2, true: Color.main}}
            // thumbColor={autoLogin ? '#f5dd4b' : '#f4f3f4'}
            thumbColor={Color.white}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setNoti}
            value={noti}
            style={{transform: [{scaleX: 1}, {scaleY: 1.3}]}}
          />
        </View>
      ),
    },
    {
      text: '광고',
      onPress: () => console.log('광고'),
      button: (
        <View>
          <Switch
            trackColor={{false: Color.shadowC2, true: Color.main}}
            // thumbColor={autoLogin ? '#f5dd4b' : '#f4f3f4'}
            thumbColor={Color.white}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setAd}
            value={ad}
            style={{transform: [{scaleX: 1}, {scaleY: 1.3}]}}
          />
        </View>
      ),
    },
  ];
  let listItem2 = [
    {text: '버전겅보', onPress: () => console.log('자동 로그인')},
    {text: '문의하기', onPress: () => console.log('알림')},
    {text: '공지사항', onPress: () => console.log('광고')},
  ];
  let listItem3 = [
    {text: '로그아웃', onPress: () => console.log('자동 로그인')},
    {text: '회원탈퇴', onPress: () => console.log('알림')},
  ];

  return (
    <BaseView
      // needScrollView={false}
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: Color.baseBackground,
      }}>
      <View
        style={{
          backgroundColor: Color.bright,
          width: Dim.fullWidth * 0.9,
          height: Dim.fullHeight * 0.1,
          alignItems: 'center',
          justifyContent: 'center',
          ...Dim.margin(10, 0, 0, 0),
        }}>
        <Text>광고 영역</Text>
      </View>

      <SettingBaseList item={listItem1} />

      <SettingBaseList item={listItem2} />

      <SettingBaseList item={listItem3} />
    </BaseView>
  );
};

const css = StyleSheet.create({
  editContainer: {
    flex: 1,
    alignItems: 'center',
  },
  titleTextInputContainer: {
    borderBottomWidth: 1,
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    ...Dim.margin(0, 20, 0, 0),
    width: Dim.x(50),
  },
  textInputStyle: {
    ...Dim.margin(10, 0, 0, 0),
    backgroundColor: Color.white,
    color: Color.black,
    borderRadius: 10,
    width: '50%',
  },
  profileContainer: {
    flex: 1,
    // flexDirection:'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  profileImageView: {
    width: 100,
    height: 100,
    borderRadius: 15,
    overflow: 'hidden',
  },
  profileImageUploadButton: {
    ...Style.center,
    ...Dim.size(40, 40),
    backgroundColor: Color.white,
    borderRadius: 30,
  },
  logoutContainer: {
    ...Dim.margin(0, 0, 20, 0),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logoutButton: {
    borderRadius: 15,
    width: Dim.fullWidth * 0.9,
    ...Dim.margin(10, 0, 10),
  },
  backButtonContainer: {
    ...Style.center,
    ...Dim.margin(0, 20),
    ...Dim.size(40, 40),
    backgroundColor: Color.white,
    borderRadius: 30,
  },
  editProfileIcon: {
    ...Dim.size(40, 40),
    ...Style.center,
    backgroundColor: Color.mainButton,
    borderRadius: 30,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  promotionalImageStyle: {
    ...Dim.size(70, 70),
    ...Dim.margin(0, 10),
    borderRadius: 20,
  },
  appInfoContainer: {
    backgroundColor: Color.white,
    borderRadius: 20,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    ...Dim.margin(10, 10, 0),
  },
  appInfoButtonContainer: {
    ...Dim.padding(0, 20),
    flexDirection: 'row',
    alignItems: 'center',
    // alignContent:'space-around'
    justifyContent: 'space-between',
    borderColor: Color.gray,
    height: Dim.x(50),
  },
  profileImageChangePopup: {
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Color.shadowCC,
    width: Dim.fullWidth * 0.9,
    ...Dim.margin(10, 0, 15),
  },
});
export default Setting;

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BaseView, Button, Image, Text} from '../comp/components';
import {SNSButton} from './comp';
import Img from '../../src/img';
import {Color, Dim} from '../../src/common';
// import useLoad from '../../src/hook/useLoad';

const Login = ({navigation}) => {
  // const dispatch = useDispatch();
  // const [load] = useLoad();

  // const {value} = useSelector(({user}) => ({
  //   value: user.get('userData').toJS(),
  // }));

  return (
    <BaseView
      // backgroundColor={Color.white}
      // needScrollView={true}
      style={{
        flex: 1,
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.baseBackground,
      }}>
      <Image source={Img.cook_now} />

      <Text style={{...Dim.margin(5, 0, 20)}} bold size={40}>
        쿡 나우
      </Text>

      <Text style={{...Dim.margin(5, 0, 10)}}>소셜 계정으로 간편 가입하기</Text>

      <View
        style={{
          // flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
          flexDirection: 'row',
          width: '50%',
          // borderWidth: 1,
        }}>
        <SNSButton
          img={Img.kakao}
          // text={'ff'}
          backColor={'kakao'}
          // onPress={kakaoLogin}
          onPress={() => console.log('카카오 로그인')}
        />
        <SNSButton
          img={Img.naver}
          // text={'ㄹㄴㄹㄴ'}
          backColor={'naver'}
          // onPress={googleLogin}
          onPress={() => console.log('네이버 로그인')}
        />

        {/*<View>*/}
        {/*    <GoogleSigninButton*/}
        {/*        style={{ width: 192, height: 48 }}*/}
        {/*        size={GoogleSigninButton.Size.Wide}*/}
        {/*        color={GoogleSigninButton.Color.Dark}*/}
        {/*        onPress={googleLogin}*/}
        {/*        disabled={true}*/}
        {/*    />;*/}
        {/*</View>*/}
      </View>

      <View style={{position: 'absolute', bottom: 40}}>
        {/*<Text>ID/PW로 가입하기</Text>*/}
        <Button
          style={{
            borderWidth: 1,
            borderColor: Color.mainLight,
            backgroundColor: 'transparent',
            borderRadius: 5,
            ...Dim.padding(0, 10, 0, 10),
          }}
          viewStyle={{}}
          text={'ID/PW로 가입하기'}
          textColor={'mainLight'}
          onPress={() => {
            console.log('가입하기');
            navigation.navigate('MainTab');
          }}
        />
      </View>
    </BaseView>
  );
};
const css = StyleSheet.create({});
export default Login;

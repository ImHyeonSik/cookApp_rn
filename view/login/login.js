import React, {useEffect, useRef, useState} from 'react';
import {Alert, Animated, Keyboard, StyleSheet, View} from 'react-native';
import {BaseView, Button, Image, Text} from '../comp/components';
import Common, {Color, Dim, Img, t} from '../../src/common';
import useLoad from '../../src/hook/useLoad';
import Connect from '../../event/Connect';
import {useDispatch, useSelector} from 'react-redux';
import {setUserData} from '../../src/redux/action';
import messaging from '@react-native-firebase/messaging';
import {TextInputWithImage} from '../comp/TextInputWithImage';
import {setItemToAsync} from '../../data/storage';
import CustomAlert from '../comp/CustomAlert';
import useChatCount from '../../src/hook/useChatCount';
import {useKeyboard} from '@react-native-community/hooks';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [load] = useLoad();
  const [chattingCount, chatCountState] = useChatCount();

  const [gestureName, setGestureName] = useState('none');
  const [doLogin, setDoLogin] = useState(false);
  const [compCheck, setCompCheck] = useState(false);
  const [loginFail, setLoginFail] = useState(false);

  const [comName, setComName] = useState();
  const [id, setId] = useState();
  const [password, setPassword] = useState();
  const [comSeq, setComSeq] = useState(); // 등록된 업체에서 받는 seq
  const loginDisable =
    !Common.isEmpty(id) && !Common.isEmpty(password) && !Common.isEmpty(comSeq);

  const keyboard = useKeyboard();

  const {value} = useSelector(({user}) => ({
    value: user.get('userData').toJS(),
  }));

  // motion animation Ref
  const fadeAni = useRef(new Animated.Value(0)).current;
  const fadeAniReverse = useRef(new Animated.Value(1)).current;

  // user Text Input Ref
  const companyNameRef = useRef();
  const userIdRef = useRef();
  const userPasswordRef = useRef();

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  useEffect(() => {
    messaging()
      .getToken()
      .then(token => {
        setItemToAsync('fcm', token)
          .then(r => console.log('fcm => ', token))
          .catch(error => {
            Alert.alert(`fcm error ${error}`);
          });
      });
    // autoLogin().then();
  }, []);
  //

  const firebaseToken = async () => {
    const token = await messaging().getToken();
    console.log('token -= > ', token);
  };

  const companyCheck = () => {
    return load(
      () => Connect.signCompany({name: comName}),
      ({code, compSeq, urlLogo}) => {
        if (code === 200) {
          setComSeq(compSeq);
          setCompCheck(false);
        } else {
          setComSeq();
          setCompCheck(true);
          console.log('compSeq 실패 =>', code);
        }
      },
    );
  };

  const loginFunction = async event => {
    const device = await Common.deviceParam();

    await load(
      () => Connect.signCompany({name: comName}),
      ({code, compSeq, urlLogo}) => {
        if (code === 200) {
          setComSeq(compSeq);
          setCompCheck(false);

          load(
            () =>
              Connect.signIn({
                compSeq,
                id,
                pw: password,
                sns: 'O',
                ...device,
              }),
            async result => {
              const {manager, code, token, profile, type, ...other} = result;
              if (code === 200 && type === 'M') {
                let memberSeq = profile.memberSeq;
                dispatch(
                  setUserData({
                    managerIndex: memberSeq,
                    profile: profile,
                    login: device,
                  }),
                );
                await setItemToAsync('user', {
                  compSeq: comSeq,
                  id,
                  pw: password,
                  sns: 'O',
                });
                await setItemToAsync('keyboardInfo', keyboard.keyboardHeight);

                chattingCount(memberSeq).then(() => {
                  dispatch(setUserData({chatCount: chatCountState}));
                });
                await navigation.replace('DashboardTab');
              } else {
                console.log('로그인 실패', code);
                setLoginFail(true);
                // dispatch(showAlert('로그인 실패',''))
              }
            },
          );
        } else {
          setComSeq();
          setCompCheck(true);
          console.log('compSeq 실패 =>', code);
        }
      },
    );
  };

  return (
    <BaseView
      // backgroundColor={Color.white}
      needScrollView={true}
      style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Text size={17} center style={{...Dim.margin(20, 0)}}>
          {t.fitrusT_sentence}
        </Text>

        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flex: 1, width: Dim.fullWidth * 0.9}}>
            <TextInputWithImage
              ref={companyNameRef}
              // onSubmitEditing={() => userIdRef.current.focus()}
              onSubmitEditing={() => Keyboard.dismiss()}
              returnKeyType={'done'}
              blurOnSubmit={false}
              placeholder={t.company_name}
              title={t.company_name}
              value={comName}
              onChangeText={setComName}
              onBlur={() => companyCheck()}
            />
            {compCheck && (
              <Text center color={'shadow66'}>
                {t.company_fail_message}
              </Text>
            )}

            <TextInputWithImage
              ref={userIdRef}
              backgroundColor={comSeq ? Color.white : Color.shadowLight}
              onSubmitEditing={() => userPasswordRef.current.focus()}
              returnKeyType={'next'}
              editable={!!comSeq}
              blurOnSubmit={false}
              placeholder={t.id}
              title={t.id}
              value={id}
              onChangeText={setId}
            />

            <TextInputWithImage
              ref={userPasswordRef}
              backgroundColor={comSeq ? Color.white : Color.shadowLight}
              onSubmitEditing={() => Keyboard.dismiss()}
              returnKeyType={'done'}
              editable={!!comSeq}
              placeholder={t.password}
              title={t.password}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />

            <Button
              text={t.login}
              disabled={!loginDisable}
              style={{...Dim.margin(10, 0, 0, 0), borderRadius: 15}}
              color={'white'}
              size={17}
              onPress={() => loginFunction()}
            />
          </View>

          <View style={{flex: 1}}>
            <Image
              source={Img.fitrusT}
              style={{height: Dim.fullHeight * 0.3}}
              resizeMode={'contain'}
            />
          </View>
        </View>
      </View>
      <CustomAlert
        show={loginFail}
        setShow={() => setLoginFail(false)}
        title={'로그인 실패'}
        message={'아이디 또는 비밀번호를 잘못 입력했습니다.'}
        onPress={() => {}}
      />
    </BaseView>
  );
};
const css = StyleSheet.create({});
export default Login;

import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  BackHandler,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {
  BaseView,
  Button,
  Image,
  Pressable,
  ScrollView,
  Text,
} from '../comp/components';
import Common, {Color, Dim, Img, Style, t} from '../../src/common';
import {MiddleTitleContainer} from './comp';
import {useNavigation} from '@react-navigation/native';
import {TextInputWithImage} from '../comp/TextInputWithImage';
import useLoad from '../../src/hook/useLoad';
import connect from '../../event/Connect';
import Connect, {list} from '../../event/Connect';
import {useDispatch, useSelector} from 'react-redux';
import {setUserData, showAlert} from '../../src/redux/action';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SlidePopMenu from '../comp/SlidePopMenu';

const Setting = ({navigation}) => {
  const navigations = useNavigation();
  const dispatch = useDispatch();
  const [load] = useLoad();

  const {value} = useSelector(({user}) => ({
    value: user.get('userData').toJS(),
  }));

  const {profile, managerIndex, img, login, setting} = value;

  const [editMode, setEditMode] = useState(false);
  const [comProfile, setComProfile] = useState({
    compName: '',
    urlLogo: '',
    compImages: [],
  });
  const {compName, urlLogo, compImages} = comProfile;

  const [managerProfile, setManagerProfile] = useState({
    profileImage: '',
    id: '',
    nickName: '',
    email: '',
    phone: '',
  });
  const [pickImg, setPickImg] = useState(null); // 선택한 사진 uri
  const [picturePopUp, setPicturePopUp] = useState('false');

  const [appVersion, setAppVersion] = useState([
    {image: Img.version, name: t.app_version, onPress: () => onVersion()},
    {
      image: Img.privacy_policy,
      name: t.privacy_policy,
      onPress: () => onPrivacyLink(),
    },
    {
      image: Img.terms_of_service,
      name: t.terms_of_service,
      onPress: () => onTermLink(),
    },
  ]);

  useLayoutEffect(() => {
    if (editMode) {
      navigation.setOptions({
        headerTitle: t.profile,
        title: t.profile,

        headerLeft: () => (
          <Image
            source={Img.back}
            style={{...Dim.size(20, 20)}}
            onPress={() => {
              setEditMode(!editMode);
              dispatch(setUserData({setting: 'setting'}));
            }}
          />
        ),
      });
    } else {
      navigation.setOptions({
        headerTitle: t.setting, // ios title 변경
        title: t.setting, // android title 변경
        headerLeft: null,
      });
    }
  }, [editMode]);

  function handleChange(e) {
    const {name, text} = e;
    let processedData = text;

    setManagerProfile(prevState => ({
      ...prevState,
      [name]: processedData,
    }));
  }

  useEffect(() => {
    if (!editMode) {
      saveManagerProfile().then(() => getManagerProfile());
      dispatch(setUserData({img: {uri: connect.userProfile(managerIndex)}}));
    }
  }, [editMode]);

  useEffect(() => {
    const {profile} = value;
    const backAction = () => {
      if (setting === 'setting' || setting === null) {
        // setEditMode(!editMode)
        return false;
      }
      if (setting !== 'setting') {
        dispatch(setUserData({setting: 'setting'}));
        setEditMode(false);
        return true;
      }
    };

    navigations.addListener('focus', async () => {
      await getManagerProfile();
      navigation.removeListener('focus');
    });

    navigations.addListener('blur', async () => {
      setEditMode(false);
    });

    const backHandler = BackHandler.addEventListener(
      'profileBackHandler',
      backAction,
    );

    load(
      () => connect.companyProfile(),
      result => {
        const {compCode, urlLogo, listAds, compName} = result;
        setComProfile({
          compName,
          urlLogo,
          compImages: listAds,
        });
      },
    );

    return () => backHandler.remove();
  }, [setting]);

  const onPickImageCallback = result => {
    if (result.didCancel) return;

    if (result) {
      const {uri, error} = result?.assets[0];
      if (error) console.log('images', error);
      if (uri) setPickImg(uri);
    }
  };

  const getManagerProfile = async () => {
    return await load(
      () =>
        connect.getProfile({
          memberSeq: value.managerIndex,
          date: new Date() * 1,
        }),
      result => {
        const profileImg = connect.userProfile(managerIndex);
        const {code, email, id, name, phone, urlProfile, ...other} = result;
        setManagerProfile({
          profileImage: {uri: profileImg},
          id,
          nickName: name,
          email,
          phone,
        });
        dispatch(setUserData({profile: {name, phone, email}}));
        dispatch(setUserData({img: {uri: profileImg}}));
      },
    );
  };

  const saveManagerProfile = async () => {
    return await load(
      () =>
        connect.saveProfile({
          name: managerProfile.nickName,
          email: managerProfile.email,
          phone: managerProfile.phone,
        }),
      async result => {
        const {code} = result;
        switch (code) {
          case 200:
            if (pickImg) {
              const form = new FormData();
              form.append('img', {
                uri: pickImg,
                type: 'image/jpg',
                name: `${new Date() * 1}.jpg`,
              });
              await load(
                () => connect.profileImg(form),
                r => {
                  setManagerProfile(prevState => ({
                    ...prevState,
                    profileImage: {uri: connect.userProfile(managerIndex)},
                  }));
                  dispatch(
                    setUserData({
                      img: {uri: connect.userProfile(managerIndex)},
                    }),
                  );
                },
              );
            }
            setEditMode(false);
            break;
          case 422:
            dispatch(showAlert('', '항목의 형식이 올바르지 않습니다.'));
            break;
        }
      },
    );
  };

  const onVersion = () => Common.linkWithLang(Connect.link.VersionLink);
  const onPrivacyLink = () => Common.linkWithLang(Connect.link.PrivacyLink);
  const onTermLink = () => Common.linkWithLang(Connect.link.TermLink);

  return (
    <BaseView needScrollView={false} style={{flex: 1, alignItems: 'center'}}>
      {!editMode ? (
        <View style={{flex: 1}}>
          <ScrollView>
            <View style={css.profileContainer}>
              <View style={css.profileImageView}>
                <Image
                  // 프로필 사진
                  source={managerProfile.profileImage}
                  style={{width: '100%', height: '100%', borderWidth: 1}}
                  resizeMode={'stretch'}
                  onError={e => {
                    // console.log('설정 error')
                    setManagerProfile(prevState => ({
                      ...prevState,
                      profileImage: Img.profile_default,
                    }));
                  }}
                  onPress={() => {
                    setEditMode(true);
                    dispatch(setUserData({setting: 'profile'}));
                    // navigation.navigate('Profile')
                  }}
                />
              </View>

              <TextInputWithImage
                title={t.nick_name}
                placeholder={t.nick_name}
                value={profile.name}
                editable={false}
                viewStyle={{
                  ...Dim.margin(10, 0, 0, 0),
                  borderColor: Color.main,
                  width: Dim.fullWidth * 0.9,
                }}
              />

              <TextInputWithImage
                title={t.company_name}
                placeholder={t.company_name}
                value={compName}
                editable={false}
                viewStyle={{
                  ...Dim.margin(5, 0, 0, 0),
                  borderColor: Color.main,
                  width: Dim.fullWidth * 0.9,
                }}
              />
            </View>

            <View>
              <MiddleTitleContainer title={t.logo}>
                {CompanyLogo({urlLogo})}
              </MiddleTitleContainer>

              <MiddleTitleContainer title={t.business_image}>
                {CompanyImages({compImages})}
              </MiddleTitleContainer>

              <MiddleTitleContainer title={t.app_info}>
                {AppInfo(appVersion, login)}
              </MiddleTitleContainer>

              <Button
                style={css.logoutButton}
                text={t.log_out}
                color={'white'}
                size={20}
                onPress={async () => {
                  await Connect.logout();
                  await navigations.replace('Login');
                }}
              />
            </View>
          </ScrollView>
        </View>
      ) : (
        <View style={{flex: 1, width: '100%'}}>
          <View style={css.editContainer}>
            <View style={{justifyContent: 'center'}}>
              <View style={css.profileImageView}>
                <Image
                  source={
                    pickImg === null
                      ? managerProfile.profileImage
                      : {uri: pickImg}
                  }
                  style={{width: '100%', height: '100%'}}
                  resizeMode="stretch"
                  onError={e => {
                    console.log('profile 수정 error', e);
                    setManagerProfile(prevState => ({
                      ...prevState,
                      profileImage: Img.profile_default,
                    }));
                  }}
                  onPress={() => setPicturePopUp(true)}
                />
              </View>
            </View>

            <KeyboardAwareScrollView
              style={{width: '80%'}}
              enableResetScrollToCoords={true}>
              <View style={{...Dim.margin(40, 0, 0, 0)}}>
                <TextInputWithImage
                  title={t.id}
                  placeholder={t.id}
                  value={managerProfile.id}
                  editable={false}
                  viewStyle={{borderColor: Color.main, ...Dim.margin(10, 0)}}
                />
                <TextInputWithImage
                  name="nickName"
                  title={t.nick_name}
                  placeholder={t.nick_name}
                  value={managerProfile.nickName}
                  onChange={handleChange}
                  viewStyle={{borderColor: Color.white, ...Dim.margin(10, 0)}}
                />
                <TextInputWithImage
                  name="email"
                  title={t.email}
                  placeholder={t.email}
                  value={managerProfile.email}
                  onChange={handleChange}
                  viewStyle={{borderColor: Color.white, ...Dim.margin(10, 0)}}
                />
                <TextInputWithImage
                  name="phone"
                  title={t.phone}
                  placeholder={t.phone}
                  keyboardType="numeric"
                  value={managerProfile.phone}
                  onChange={handleChange}
                  viewStyle={{borderColor: Color.white, ...Dim.margin(10, 0)}}
                />
              </View>
            </KeyboardAwareScrollView>
          </View>

          <PictureMenu
            visible={picturePopUp}
            onClose={() => setPicturePopUp(false)}
            callback={onPickImageCallback}
            defaultOnPress={async () => {
              await load(
                () => Connect.deleteProfileImg({memberSeq: value.managerIndex}),
                async result => {
                  const {code} = result;
                  if (code === 200) {
                    setManagerProfile(prevState => ({
                      ...prevState,
                      profileImage: Img.profile_default,
                    }));
                    setPicturePopUp(false);
                  }
                },
              );
            }}
          />
        </View>
      )}
    </BaseView>
  );
};

// -------------- 후에 comp 파일로 이동후 타입 스크립트 적용
const CompanyLogo = props => {
  const {urlLogo} = props;

  return (
    <View style={{...Dim.margin(10, 0, 0, 20)}}>
      <Image
        source={urlLogo ? {uri: `${list.base}${urlLogo}`} : Img.bg_image}
        style={{...Dim.size(70, 70), borderRadius: 20}}
        resizeMode={'stretch'}
      />
    </View>
  );
};

const CompanyImages = props => {
  const {compImages} = props;

  return (
    <View style={{...Dim.margin(10, 0, 0, 10)}}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {compImages.map(({urlAds}, index) => {
          return (
            <Image
              key={index}
              source={urlAds ? {uri: `${list.base}${urlAds}`} : Img.bg_image}
              style={css.promotionalImageStyle}
              resizeMode={'stretch'}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const AppInfo = (appVersion, login) => {
  return (
    <View style={css.appInfoContainer}>
      {appVersion.map(({image, name, onPress}, index) => {
        return (
          <Pressable
            key={index.toString()}
            viewStyle={[css.appInfoButtonContainer]}
            onPress={onPress}>
            <View style={{flexDirection: 'row'}}>
              <Text size={18} style={{...Dim.margin(0, 10)}}>
                {name}
              </Text>
            </View>

            {index === 0 && <Text>{login.appVersion}</Text>}
          </Pressable>
        );
      })}
    </View>
  );
};

const PictureMenu = ({
  visible,
  callback,
  onClose,
  maxValue = 400,
  defaultOnPress,
}) => {
  const option = {
    takePhotoButtonTitle: '카메라',
    chooseFromLibraryButtonTitle: '갤러리',
    permissionDenied: {
      title: '권한 에러',
      text: '권한 설정을 변경해주세요',
      reTryTitle: '재시도',
      okTitle: '확인',
    },
    mediaType: 'photo',
    quality: 1,
    maxWidth: maxValue,
    maxHeight: maxValue,
  };

  const cameraOption = {
    mediaType: 'photo',
    quality: 0.1,
    cameraType: 'back',
    saveToPhotos: true,
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'ios') {
      console.log('permission ios camera');
      setTimeout(() => launchCamera(cameraOption, launchCallback), 100);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'App Camera Permission',
            message: 'App needs access to your camera ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission given');
          setTimeout(() => launchCamera(cameraOption, launchCallback), 100);
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const launchCallback = (result = {}) => {
    callback && callback(result);
  };
  const launchCameraFunc = async () => {
    onClose && onClose();
    await requestCameraPermission();
  };
  const launchGallery = () => {
    onClose && onClose();
    setTimeout(() => launchImageLibrary(option, launchCallback), 100);
  };

  const list = [
    {
      text: t.photo_add_album,
      onPress: launchGallery,
    },
    {
      text: t.photo_add_camera,
      onPress: launchCameraFunc,
    },
    {
      text: t.photo_default_image,
      onPress: defaultOnPress,
    },
  ];

  return (
    <SlidePopMenu
      visible={visible}
      setVisible={() => onClose()}
      list={list}
      headerTitle={t.profile_setting}
      headerImage={Img.measurement_result}
      style={{minHeight: Dim.fullHeight * 0.3, justifyContent: 'center'}}
      listStyle={css.profileImageChangePopup}
    />
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

import React, {useState, useEffect} from 'react';
import {View, Image, Animated, Easing, StyleSheet, Button} from 'react-native';
import {Img} from '../../src/common';
import GoogleLogin from 'react-google-login';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {SNSButton} from './comp';
import {Text} from '../comp/components';

const clientId =
  '595159133596-ibjnkksdef8bumsndm9vjn0cd4790jtr.apps.googleusercontent.com'; // 구글 고유 id

const SplashScreen = ({navigation}) => {
  const [animationValue, setAnimationValue] = useState(new Animated.Value(0));

  useEffect(() => {
    // startAnimation();

    GoogleSignin.configure({
      // webClientId: '485680851654-j34cg7clol6qq8k8gopdr5203pveivh4.apps.googleusercontent.com',
      webClientId:
        '595159133596-ce9hpl4c9kjs3u1rcmrlu9nqs0hrsf42.apps.googleusercontent.com',
      // '595159133596-ibjnkksdef8bumsndm9vjn0cd4790jtr.apps.googleusercontent.com',
      // offlineAccess: true,
      // hostedDomain: '',
      // forceConsentPrompt: true,

      // client_secret: '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',
      // redirect_uri:
      //   'http://ec2-43-202-30-201.ap-northeast-2.compute.amazonaws.com/login/oauth2/code/google',
      // offlineAccess: true,
      // forceCodeForRefreshToken: true,
    });
  }, []);

  const startAnimation = () => {
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      console.log('>>>>');
      navigation.navigate('Login'); // 스플래시 애니메이션이 끝나면 메인 화면으로 이동
    });
  };

  const animatedStyle = {
    transform: [
      {
        translateY: animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [-100, 0], // 위쪽으로 이동하다가 정지
        }),
      },
    ],
  };
  const googleLogin = async () => {
    // try {
    //   await GoogleSignin.hasPlayServices();
    //   const userInfo = await GoogleSignin.signIn();
    //
    //   console.log('google login data', userInfo);
    //   // this.setState({ userInfo: userInfo, loggedIn: true });
    // } catch (error) {
    //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //     // user cancelled the login flow
    //     console.log('google login error - 1', error.code);
    //   } else if (error.code === statusCodes.IN_PROGRESS) {
    //     // operation (f.e. sign in) is in progress already
    //     console.log('google login error - 2', error.code);
    //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //     // play services not available or outdated
    //     console.log('google login error - 3', error.code);
    //   } else {
    //     // some other error happened
    //     console.log('google login error - 4', error.code, error);
    //   }
    // }

    try {
      const response = await fetch(
        'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=595159133596-ibjnkksdef8bumsndm9vjn0cd4790jtr.apps.googleusercontent.com&scope=email%20profile&redirect_uri=http://ec2-43-202-30-201.ap-northeast-2.compute.amazonaws.com/login/oauth2/code/google',
      );
      // const json = await response.json();
      // setData(json);
      console.log('mmnnnzzff ', response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    // await GoogleSignin.hasPlayServices();
    // const userInfo = await GoogleSignin.signIn();
    //
    // const result = await fetch('https://oauth2.googleapis.com/token', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     code: userInfo.serverAuthCode,
    //     client_id:
    //       '595159133596-ibjnkksdef8bumsndm9vjn0cd4790jtr.apps.googleusercontent.com',
    //     client_secret: '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',
    //     grant_type: 'authorization_code',
    //     redirect_uri:
    //       'http://ec2-43-202-30-201.ap-northeast-2.compute.amazonaws.com/login/oauth2/code/google',
    //   }),
    // }).then(res => {
    //   return res.json();
    // });
    //
    // console.log('>>><<<<<', result);
  };

  return (
    <View style={styles.container}>
      {/*<Animated.View style={[styles.imageContainer, animatedStyle]}>*/}
      {/*  <Image style={styles.image} source={Img.cook_now} />*/}
      {/*</Animated.View>*/}
      <View style={{flex: 1}}>
        <Button title={'vvvv'} onPress={googleLogin} />
        <Button
          title={'fsfsf'}
          onPress={() => navigation.navigate('MainTab')}
        />
        <Text>fsfsf</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'absolute',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default SplashScreen;

// import React, {useState} from 'react';
// import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import {Color} from '../../src/common';
//
// const SplashScreen = () => {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//
//   const categories = [
//     {id: 1, name: 'Category 1'},
//     {id: 2, name: 'Category 2'},
//     {id: 3, name: 'Category 3'},
//     // ... Add more categories
//   ];
//
//   const handleCategorySelect = category => {
//     console.log('vvvzv<< ', category);
//     setSelectedCategory(category);
//   };
//
//   return (
//     <View style={styles.container}>
//       <View style={styles.menuContainer}>
//         {categories.map(category => (
//           <TouchableOpacity
//             key={category.id}
//             style={[
//               styles.menuItem,
//               selectedCategory === category && styles.selectedMenuItem,
//             ]}
//             onPress={() => handleCategorySelect(category)}>
//             <Text style={styles.menuText}>{category.name}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//       <View style={styles.contentContainer}>
//         {/*{selectedCategory ? (*/}
//         {/*  <View style={{borderWidth: 1, backgroundColor: Color.main, flex: 1}}>*/}
//         {/*    <Text style={styles.contentText}>*/}
//         {/*      Content for {selectedCategory.name}*/}
//         {/*    </Text>*/}
//         {/*  </View>*/}
//         {/*) : (*/}
//         {/*  <Text style={styles.noCategoryText}>Select a category</Text>*/}
//         {/*)}*/}
//         <Text>fsfsfs</Text>
//       </View>
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   menuContainer: {
//     flexDirection: 'row',
//     marginBottom: 20,
//   },
//   menuItem: {
//     padding: 10,
//     borderRadius: 8,
//     backgroundColor: Color.main,
//     marginRight: 10,
//   },
//   selectedMenuItem: {
//     backgroundColor: Color.main, // Change to your desired color
//   },
//   menuText: {
//     fontWeight: 'bold',
//   },
//   contentContainer: {
//     flex: 1,
//     width: '100%',
//     borderWidth: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   contentText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   noCategoryText: {
//     fontSize: 16,
//     color: 'gray',
//   },
// });
//
// export default SplashScreen;

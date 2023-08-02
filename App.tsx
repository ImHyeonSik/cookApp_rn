/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import 'react-native-gesture-handler';
import React, {type PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import {Login} from './view/login/login';
import LoginStack from './navigation/LoginStack';

const App = () => {
  return (
    <NavigationContainer>
      {/*<SafeAreaView>*/}
      {/*<Text>Hi</Text>*/}
      {/*<Login />*/}
      <LoginStack />
      {/*</SafeAreaView>*/}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;

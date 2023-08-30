import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../view/login/login';
import MainTab from './MainTab';
import SplashScreen from '../view/login/SplashScreen';
import IngredientInfo from '../view/ingredientInfo/IngredientInfo';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Color} from '../src/common';

const Stack = createNativeStackNavigator();

const LoginStack = ({navigate}) => {
  return (
    <Stack.Navigator
      initialRouteName={'SplashScreen'}
      // screenOptions={{headerShown: false}}
      screenOptions={
        {
          // headerStyle: {
          //   elevation: 0, // 안드로이드 그림자 제거
          //   shadowOpacity: 0, // iOS 그림자 제거
          // },
        }
      }>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="IngredientInfoMain"
        component={IngredientInfo}
        options={{
          title: '재료 정보 입력',
          headerTitleAlign: 'center', // 가운데 정렬
          headerShadowVisible: false,
          headerStyle: {
            elevation: 0, // 안드로이드 그림자 제거
            shadowOpacity: 0, // iOS 그림자 제거
          },
          headerLeft: () => (
            <Icon
              name="chevron-left" // 뒤로가기 버튼 아이콘
              size={20} // 아이콘 크기
              style={{marginLeft: 1}} // 여백 설정
              color={Color.main} // 아이콘 색상
              // onPress={() => navigate.pop()}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};
export default LoginStack;

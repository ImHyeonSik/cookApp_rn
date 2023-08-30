import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../view/login/login';
import MainTab from './MainTab';
import Ingredient from '../view/ingredient/Ingredient';
import Setting from '../view/setting/Setting';
import color from '../src/common/color';

const Stack = createNativeStackNavigator();

const SettingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false, // 상단 헤더의 그림자 숨김
      }}>
      {/*<Stack.Screen*/}
      {/*  name="Login"*/}
      {/*  component={Login}*/}
      {/*  options={{title: 'Overview'}}*/}
      {/*/>*/}
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{
          title: '환경설정',
          headerStyle: {
            backgroundColor: color.baseBackground,
          },
          headerTintColor: color.black,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};
export default SettingStack;

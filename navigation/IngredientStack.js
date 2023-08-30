import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../view/login/login';
import MainTab from './MainTab';
import Ingredient from '../view/ingredient/Ingredient';
import color from '../src/common/color';

const Stack = createNativeStackNavigator();

const IngredientStack = () => {
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
        name="Ingredient"
        component={Ingredient}
        options={{
          title: '재료함',
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
export default IngredientStack;

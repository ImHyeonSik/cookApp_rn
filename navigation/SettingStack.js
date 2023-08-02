import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../view/login/login';
import MainTab from './MainTab';
import Ingredient from '../view/ingredient/Ingredient';
import Setting from '../view/setting/Setting';

const Stack = createNativeStackNavigator();

const SettingStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/*<Stack.Screen*/}
      {/*  name="Login"*/}
      {/*  component={Login}*/}
      {/*  options={{title: 'Overview'}}*/}
      {/*/>*/}
      <Stack.Screen
        name="Setting"
        component={Setting}
        // options={{title: 'Overview'}}
      />
    </Stack.Navigator>
  );
};
export default SettingStack;

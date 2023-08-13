import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../view/login/login';
import MainTab from './MainTab';

const Stack = createNativeStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{title: 'Overview'}}
      />
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        // options={{title: 'Overview'}}
      />
    </Stack.Navigator>
  );
};
export default LoginStack;

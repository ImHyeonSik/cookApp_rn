import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../view/login/login';
import MainTab from './MainTab';
import Ingredient from '../view/ingredient/Ingredient';
import Dashboard from '../view/dashboard/Dashboard';

const Stack = createNativeStackNavigator();

const DashboardStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/*<Stack.Screen*/}
      {/*  name="Login"*/}
      {/*  component={Login}*/}
      {/*  options={{title: 'Overview'}}*/}
      {/*/>*/}
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{title: 'Overview'}}
      />
    </Stack.Navigator>
  );
};
export default DashboardStack;

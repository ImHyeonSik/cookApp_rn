import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../view/login/login';
import MainTab from './MainTab';
import Ingredient from '../view/ingredient/Ingredient';

const Stack = createNativeStackNavigator();

const IngredientStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/*<Stack.Screen*/}
      {/*  name="Login"*/}
      {/*  component={Login}*/}
      {/*  options={{title: 'Overview'}}*/}
      {/*/>*/}
      <Stack.Screen
        name="Ingredient"
        component={Ingredient}
        options={{title: 'Overview'}}
      />
    </Stack.Navigator>
  );
};
export default IngredientStack;

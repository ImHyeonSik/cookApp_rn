import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../view/dashboard/Dashboard';
import Ingredient from '../view/ingredient/Ingredient';
import Setting from '../view/setting/Setting';
import IngredientStack from './IngredientStack';
import DashboardStack from './DashboardStack';
import SettingStack from './SettingStack';

const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator
      // initialRouteName={"Chatting"}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarIconStyle: {display: 'none'},
      })}
      // tabBar={props => <MyTabBar {...props} socket={socket} />}
      backBehavior={'none'}>
      <Tab.Screen
        name="DashboardStack"
        component={DashboardStack}
        options={({route}) => ({
          // tabBarVisible: getVisibility(route, 1),
          // tabBarVisible: true,
          tabBarLabel: 'DashboardStack',
        })}
      />
      <Tab.Screen
        name="IngredientStack"
        component={IngredientStack}
        options={({route}) => ({
          // tabBarVisible: getVisibility(route, 1),
          // tabBarVisible: true,
          tabBarLabel: 'IngredientStack',
        })}
      />
      <Tab.Screen
        name="SettingStack"
        component={SettingStack}
        options={({route}) => ({
          // tabBarVisible: getVisibility(route, 1),
          // tabBarVisible: true,
          tabBarLabel: 'SettingStack',
        })}
      />
      {/*<Tab.Screen*/}
      {/*    name="SettingStack"*/}
      {/*    component={SettingStack}*/}
      {/*    options={() => ({*/}
      {/*        title: '설정'*/}
      {/*    })}*/}

      {/*/>*/}
    </Tab.Navigator>
  );
};
export default MainTab;

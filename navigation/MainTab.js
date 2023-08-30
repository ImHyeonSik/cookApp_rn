import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../view/dashboard/Dashboard';
import Ingredient from '../view/ingredient/Ingredient';
import Setting from '../view/setting/Setting';
import {Image} from '../view/comp/components';
import IngredientStack from './IngredientStack';
import DashboardStack from './DashboardStack';
import SettingStack from './SettingStack';
import Img from '../src/img';
import {Color, Dim} from '../src/common';
import {MyTabBar} from './comp';
import IngredientInfo from '../view/ingredientInfo/IngredientInfo';
import {showAlert} from '../src/redux/action';
import {useDispatch} from 'react-redux';

const Tab = createBottomTabNavigator();

const MainTab = ({navigation}) => {
  const dispatch = useDispatch();

  const showPopupRecordSymptom = () => {
    dispatch(
      showAlert(
        'gdgd',
        'ttttt',
        [
          {
            text: '111111',
            onPress: () =>
              navigation.navigate('dashboardSymptom', {
                screen: 'RecordEmergency',
              }),
            style: alert.styleMain,
            img: Img.popo1,
            imgStyle: Dim.size(12, 20),
          },
          {
            text: 'ffzff',
            onPress: () =>
              navigation.navigate('dashboardSymptom', {
                screen: 'RecordSymptom',
              }),
            style: alert.styleDark,
          },
        ],
        {btnDirection: alert.btnDirectionColumn},
      ),
    );
  };

  return (
    <Tab.Navigator
      // initialRouteName={"Chatting"}
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {color: Color.main},
        // inactiveTintColor: 'gray', // 선택되지 않은 탭의 라벨 색상
      }}
      // screenOptions={({route}) => ({
      //   headerShown: false,
      //   tabBarHideOnKeyboard: true,
      //   tabBarIconStyle: {display: 'none'},
      // })}
      tabBar={props => <MyTabBar {...props} />}
      // tabBar={props => <CustomTabBar {...props}
      backBehavior={'none'}>
      <Tab.Screen
        name="DashboardStack"
        component={DashboardStack}
        options={{
          // tabBarIcon: ({size, focused, color}) => {
          //   return (
          //     <Image
          //       style={{width: size, height: size}}
          //       source={focused ? Img.dashboard_on : Img.dashboard_off}
          //     />
          //   );
          // },
          tabBarLabel: '냉장고',
        }}
      />
      <Tab.Screen
        name="IngredientStack"
        component={IngredientStack}
        options={{
          tabBarIcon: ({size, focused, color}) => {
            return (
              <Image
                style={{width: size, height: size}}
                source={focused ? Img.ingredient_on : Img.ingredient_off}
              />
            );
          },
          tabBarLabel: '재료함',
        }}
      />
      <Tab.Screen
        name="SettingStack"
        component={SettingStack}
        // options={({route}) => ({
        //   // tabBarVisible: getVisibility(route, 1),
        //   // tabBarVisible: true,
        //   tabBarLabel: 'SettingStack',
        // })}
        options={{
          // tabBarIcon: ({size, focused, color}) => {
          //   return (
          //     <Image
          //       style={{width: size, height: size}}
          //       source={focused ? Img.setting_on : Img.setting_off}
          //     />
          //   );
          // },
          tabBarLabel: '설정',
        }}
      />
      <Tab.Screen
        name="IngredientInfo"
        component={IngredientInfo}
        listeners={{
          tabPress: e => {
            // Prevent default action
            // e.preventDefault();

            //Any custom code here
            showPopupRecordSymptom();
          },
        }}
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

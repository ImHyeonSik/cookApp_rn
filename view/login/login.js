import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BaseView, Text} from '../comp/components';
// import useLoad from '../../src/hook/useLoad';

const Login = ({navigation}) => {
  // const dispatch = useDispatch();
  // const [load] = useLoad();

  // const {value} = useSelector(({user}) => ({
  //   value: user.get('userData').toJS(),
  // }));

  return (
    <BaseView
      // backgroundColor={Color.white}
      needScrollView={true}
      style={{flex: 1}}>
      <View>
        <Text>login</Text>
      </View>
    </BaseView>
  );
};
const css = StyleSheet.create({});
export default Login;

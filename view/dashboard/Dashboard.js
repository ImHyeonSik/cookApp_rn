import React from 'react';
import {NativeModules, StyleSheet, View} from 'react-native';
import {BaseView, Text} from '../comp/components';
import {Color, Dim} from '../../src/common';

const {StatusBarManager} = NativeModules;

const Dashboard = ({navigation, route}) => {
  // const {value} = useSelector(({user}) => ({
  //   value: user.get('userData').toJS(),
  // }));

  return (
    <BaseView needScrollView={false}>
      <View>
        <Text>sfsfs</Text>
      </View>
    </BaseView>
  );
};

const css = StyleSheet.create({
  memberListTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  memberListContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '95%',
  },
  searchContainer: {
    ...Dim.margin(0, 0, 10, 0),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  sortImageStyle: {
    ...Dim.size(25, 25),
    ...Dim.margin(10, 10),
  },
  notiContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: Color.mainBackground,
  },
  notiHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  allSelectButton: {
    ...Dim.margin(0, 0, 10, 0),
    flexDirection: 'row',
    alignItems: 'center',
  },
  notiMemberListContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '95%',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  notiFloatingButton: {
    zIndex: 1,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  sendMessageContainer: {
    ...Dim.margin(20, 20),
    ...Dim.padding(20, 20),
    height: Dim.fullHeight * 0.45,
    flexDirection: 'row',
    backgroundColor: Color.white,
    borderWidth: 1,
    borderColor: Color.shadowCC,
    borderRadius: 20,
  },
  sendButton: {
    ...Dim.margin(0, 0, 10),
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonStyle: {
    ...Dim.margin(10, 20),
    width: Dim.fullWidth * 0.9,
    height: Dim.x(50),
    borderRadius: 10,
  },
  selectionButton: {
    ...Dim.margin(10, 20),
    borderRadius: 10,
    width: Dim.fullWidth * 0.9,
    height: Dim.x(50),
  },
  exampleTypeSelection: {
    ...Dim.margin(10, 0, 15),
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Color.shadowCC,
    width: Dim.fullWidth * 0.9,
  },
});

export default Dashboard;

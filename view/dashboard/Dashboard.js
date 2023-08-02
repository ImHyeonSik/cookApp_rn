import React, {useEffect, useLayoutEffect} from 'react';
import {
  BackHandler,
  Keyboard,
  KeyboardAvoidingView,
  NativeModules,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {BaseView, Button, Image, ScrollView, Text} from '../comp/components';
import {MemberCard, SelectButton} from './comp';
import common from '../../src/common';
import Common, {Color, Dim, Img, Style, t} from '../../src/common';
import img from '../../src/img';
import ButtonWithImageTitle from '../comp/ButtonWithImageTitle';
import messaging from '@react-native-firebase/messaging';
import SlidePopMenu from '../comp/SlidePopMenu';
import {TextInputWithImage} from '../comp/TextInputWithImage';
import {useSelector} from 'react-redux';
import Connect, {list} from '../../event/Connect';
import Moment from 'moment';
import {setUserData} from '../../src/redux/action';
import CustomAlert from '../comp/CustomAlert';
import {getItemFromAsync} from '../../data/storage';
import {userSort} from '../../src/constant';

const {StatusBarManager} = NativeModules;

const Dashboard = ({navigation, route}) => {
  const {value} = useSelector(({user}) => ({
    value: user.get('userData').toJS(),
  }));

  useEffect(() => {
    getKeyboard().then(height => setDeviceKeyboard(height));
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (value.noti === 'home' || Common.isEmpty(value.noti)) {
        return false;
      }
      if (value.noti !== 'home') {
        dispatch(setUserData({noti: 'home'}));
        return true;
      }
    };

    getItemFromAsync('token').then(token => {
      console.log('login token => ', token);

      if (!common.isEmpty(token)) {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
          await chattingCount(value.managerIndex);
        });
        return unsubscribe;
      }
    });

    load(
      () => Connect.memberList({mngIndex: value.managerIndex}),
      result => {
        const {code, list} = result;
        if (code === 200) {
          setMemberList(list);
          setMemberOriginal(list);
          setSearchList(list);
        }
      },
    );

    Platform.OS == 'ios'
      ? StatusBarManager.getHeight(statusBarFrameData => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;

    const backHandler = BackHandler.addEventListener(
      'notiBackHandler',
      backAction,
    );

    return () => backHandler.remove();
  }, [value.noti]);

  useEffect(() => {
    navigations.addListener('focus', () => {
      setSearchWord('');
      setSortType(userSort.SORT_MEMO);
      dispatch(setUserData({noti: 'member'}));
      load(
        () => Connect.memberList({mngIndex: value.managerIndex}),
        result => {
          const {code, list} = result;

          if (code === 200) {
            setMemberList(list);
            setSearchList(list);
          }
        },
      );
    });

    return () => {
      navigations.removeListener(); // 이 문법이 맞는지 모르겠음.
    };
  }, [navigations]);

  useLayoutEffect(() => {
    if (value.noti !== 'noti') {
      navigation.setOptions({
        headerTitle: t.member_list,
        title: t.member_list,

        headerRight: () => (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Button
              text={t.example}
              style={{...Dim.margin(0, 5, 0, 0), borderRadius: 10}}
              width={35}
              height={20}
              color={'white'}
              size={11}
              onPress={() => setListFormPopup(true)}
            />
            <Button
              text={t.sort}
              style={{...Dim.margin(0, 5, 0, 0), borderRadius: 10}}
              width={35}
              height={20}
              color={'white'}
              size={12}
              onPress={() => setSortTypePopup(true)}
            />
          </View>
        ),
        headerLeft: () => (
          <ButtonWithImageTitle
            buttonImage={Img.send}
            onPress={() => {
              dispatch(setUserData({noti: 'noti'}));
            }}
          />
        ),
      });
    } else {
      navigation.setOptions({
        headerTitle: t.notice,
        title: t.notice,

        headerRight: () => (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Button
              text={t.example}
              style={{...Dim.margin(0, 5, 0, 0), borderRadius: 10}}
              width={35}
              height={20}
              color={'white'}
              size={11}
              onPress={() => setListFormPopup(true)}
            />
            <Button
              text={t.sort}
              style={{...Dim.margin(0, 5, 0, 0), borderRadius: 10}}
              width={35}
              height={20}
              color={'white'}
              size={12}
              onPress={() => setSortTypePopup(true)}
            />
          </View>
        ),
        headerLeft: () => (
          <ButtonWithImageTitle
            buttonImage={Img.back}
            onPress={() => {
              dispatch(setUserData({noti: 'home'}));
              setSearchWord('');
            }}
          />
        ),
      });
    }
  }, [value.noti]);

  useEffect(() => {
    if (noti) {
      let arr = memberList.map((item, index) => {
        item.isSelected = false;
        return {...item};
      });

      setMemberList(arr);
    } else {
      onCheckAll(false);
    }
  }, [noti]);

  useEffect(() => {
    let uniqueList = [];

    // 중복된 값들을 정리
    checkedList.forEach(item => {
      if (!uniqueList.includes(item)) {
        uniqueList.push(item);
      }
    });

    if (memberList.length !== uniqueList.length) {
      setCheckAll(false);
    } else {
      setCheckAll(true);
    }

    setCheckedList(uniqueList);
  }, [memberList]);

  useEffect(() => {
    if (searchWord === '') {
      // 유저의 프로필 사진이 있는 것이 검색할 경우 없어짐
      load(
        () => Connect.memberList({mngIndex: value.managerIndex}),
        result => {
          const {code, list} = result;

          if (code === 200) {
            setMemberList(list);
          }
        },
      );
    }

    let list = searchList.filter(r =>
      r.uname.toLowerCase().includes(searchWord.toLowerCase()),
    );
    setMemberList(list);
  }, [searchWord]);

  const getKeyboard = async () => await getItemFromAsync('keyboardInfo');

  const selectionHandler = number => {
    let arr = memberList.map((item, index) => {
      if (number === index) {
        item.isSelected = !item.isSelected;
      }
      return {...item};
    });

    arr.map((item, index) => {
      if (item.isSelected) {
        setCheckedList(data => [...data, item.uindex]);
      } else if (checkedList.includes(item.uindex)) {
        setCheckedList(checkedList.filter(e => e !== item.uindex));
      }
    });
    setMemberList(arr);
  };

  const onCheckAll = state => {
    // 전체 선택
    let arr = memberList.map((item, index) => {
      if (state) {
        item.isSelected = true;
        setCheckedList(data => [...data, item.uindex]);
        return {...item};
      } else {
        item.isSelected = false;
        setCheckedList([]);
        return {...item};
      }
    });
    setMemberList(arr);
  };

  const notiSendCheck = () => {
    if (checkedList.length === 0) {
      setNotiAlert(true);
    } else {
      setNotiSend(true);
    }
  };

  const NotiSend = notiSend => {
    return (
      <SlidePopMenu
        visible={notiSend}
        setVisible={setNotiSend}
        headerTitle={t.notice}
        headerImage={Img.notification}
        style={{minHeight: Dim.fullHeight * 0.5 + modalHeight}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
          // keyboardVerticalOffset={statusBarHeight + Dim.x(50)}
        >
          <View style={css.sendMessageContainer}>
            <Image source={Img.write} style={{...Dim.size(20, 20)}} />
            <TextInput
              style={{color: Color.black, textAlignVertical: 'top'}}
              multiline={true}
              // keyboardType='numeric'
              placeholder={t.notice_message}
              placeholderTextColor={Color.gray}
              value={notiMessage}
              onChangeText={memo => setNotiMessage(memo)}
              onBlur={() => setModalHeight(0)}
              onFocus={() => setModalHeight(deviceKeyboard)}
            />
          </View>

          <View style={css.sendButton}>
            <Button
              text={t.send}
              style={css.sendButtonStyle}
              width={35}
              height={20}
              color={'white'}
              size={16}
              onPress={async () => {
                if (Common.isEmpty(notiMessage)) {
                  setNotiFailAlert(true);
                } else {
                  await load(
                    () =>
                      Connect.notiSend({
                        contents: notiMessage,
                        title: t.notice_title,
                        reserveLocalDate: new Date().getTime(),
                        memberSeq: checkedList,
                      }),
                    ({code}) => {
                      if (code === 200) {
                        console.log(
                          '$$$$## ',
                          notiMessage,
                          t.notice_title,
                          new Date().getTime(),
                          checkedList,
                        );
                        setNotiSuccessAlert(true);
                        setNotiMessage('');
                      } else {
                      }
                    },
                  );
                }
              }}
            />
          </View>
        </KeyboardAvoidingView>

        <CustomAlert
          show={notiSuccessAlert}
          setShow={() => setNotiSuccessAlert(false)}
          title={'알림'}
          message={t.noti_success_message}
          onPress={() => {
            setNotiSend(false);
          }}
        />

        <CustomAlert
          show={notiFailAlert}
          setShow={() => setNotiFailAlert(false)}
          title={'알림'}
          message={t.noti_not_message}
        />
      </SlidePopMenu>
    );
  };

  const ListForm = listFormPopup => {
    return (
      <SlidePopMenu
        visible={listFormPopup}
        setVisible={() => setListFormPopup(false)}
        headerImage={Img.member}
        headerTitle={t.example}
        style={{minHeight: Dim.fullHeight * 0.1, justifyContent: 'center'}}
        listStyle={{flex: 1}}>
        <SelectButton
          style={css.exampleTypeSelection}
          titleStyle={Dim.margin(0, 0, 5)}
          selectedValue={[listForm]}
          selectItem={[
            {
              text: t.list_type,
              value: userSort.LIST,
              onPress: () => setListForm(userSort.LIST),
            },
            {
              text: t.card_type,
              value: userSort.CARD,
              onPress: () => setListForm(userSort.CARD),
            },
          ]}
        />
      </SlidePopMenu>
    );
  };

  const sortWay = sortTypePopup => {
    const onNameSort = () => {
      const _memberOriginal = [...memberOriginal];

      _memberOriginal.sort((a, b) => {
        const upperCaseA = a.uname.toUpperCase();
        const upperCaseB = b.uname.toUpperCase();

        if (upperCaseA > upperCaseB) return 1;
        if (upperCaseA < upperCaseB) return -1;
        if (upperCaseA === upperCaseB) return 0;
      }); // 대소문자 구분없이 오름차순 정렬

      setMemberList(_memberOriginal);
      setSortType(userSort.SORT_NAME);
    };

    const onMemoSort = () => {
      const _memberOriginal = [...memberOriginal];

      _memberOriginal.sort((a, b) => {
        return b.lastMemoDate - a.lastMemoDate;
      }); // 최근 운동일지 작성 (내림 차순)

      setMemberList(_memberOriginal);
      setSortType(userSort.SORT_MEMO);
    };

    const onMeasureSort = () => {
      const _memberOriginal = [...memberOriginal];

      _memberOriginal.sort((a, b) => {
        return b.lastMeasureDate - a.lastMeasureDate;
      }); // 최근 측정일 순 (내림 차순)

      setMemberList(_memberOriginal);
      setSortType(userSort.SORT_MEASURE);
    };

    return (
      <SlidePopMenu
        visible={sortTypePopup}
        setVisible={() => setSortTypePopup(false)}
        headerImage={Img.member}
        headerTitle={t.sort}
        style={{minHeight: Dim.fullHeight * 0.1, justifyContent: 'center'}}
        listStyle={{flex: 1}}>
        <SelectButton
          style={{
            borderTopWidth: 1,
            ...Dim.margin(10, 0, 15),
            borderBottomWidth: 1,
            borderColor: Color.shadowCC,
            width: Dim.fullWidth * 0.9,
            flex: 1,
          }}
          // title={}
          titleStyle={Dim.margin(0, 0, 5)}
          selectedValue={[sortType]}
          selectItem={[
            {
              text: t.name,
              value: userSort.SORT_NAME,
              onPress: () => onNameSort(),
            },
            {
              text: t.workout_log_entry_date,
              value: userSort.SORT_MEMO,
              onPress: () => onMemoSort(),
            },
            {
              text: '체성분 측정일',
              value: userSort.SORT_MEASURE,
              onPress: () => onMeasureSort(),
            },
          ]}
        />
      </SlidePopMenu>
    );
  };

  return (
    <BaseView needScrollView={false}>
      <View style={[css.searchContainer]}>
        <TextInputWithImage
          viewStyle={{width: Dim.fullWidth * 0.9}}
          blurOnSubmit={false}
          placeholder={t.nick_name}
          title={t.member_find}
          value={searchWord}
          onChangeText={setSearchWord}
          // keyboardType={'ascii-capable'}
          multiline={false}
          onSubmitEditing={() => Keyboard.dismiss()}
          returnKeyType={'done'}
          rightVisiable={
            <View
              style={{
                ...Style.center,
                width: Dim.x(50),
                backgroundColor: Color.main,
                borderTopRightRadius: 15,
                borderBottomRightRadius: 15,
              }}>
              <Image
                source={img.search}
                style={{...Dim.size(25, 25)}}
                onPress={() => {}}
              />
            </View>
          }
          rightOnPress={() => console.log('검색하기')}
        />
      </View>

      {value.noti === 'noti' && (
        <Text
          size={17}
          left
          bold
          style={{...Dim.margin(0, 20, 0)}}
          hitSlop={{bottom: 20, left: 20, right: 20, top: 20}}
          onPress={() => {
            setCheckAll(!checkAll);
            onCheckAll(!checkAll);
          }}>
          {t.select_all}
        </Text>
      )}

      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <View
          style={[
            css.memberListContainer,
            listForm === userSort.CARD && {
              flexDirection: 'row',
              flexWrap: 'wrap',
            },
          ]}>
          {memberList.map((userProfile, index) => {
            const {uindex, uname, insDate, lastMemoDate} = userProfile;
            // console.log('~~~~!@~!~@ ',userProfile )

            const overDay =
              lastMemoDate + 7 * 24 * 60 * 60 * 1000 < new Date().getTime();

            return (
              <MemberCard
                key={uindex.toString()}
                index={index}
                image={{uri: `${list.base}${list.userProfile}${uindex}`}}
                uindex={uindex}
                name={uname}
                day={Moment(insDate).format('YYYY-MM-DD')}
                overDay={overDay}
                form={listForm}
                noti={value.noti}
                user={userProfile}
                onPress={() => selectionHandler(index)}
              />
            );
          })}
        </View>
      </ScrollView>

      {value.noti === 'noti' && (
        <View>
          <Button
            text={t.selection_complete}
            style={css.selectionButton}
            width={35}
            height={20}
            color={'white'}
            size={16}
            onPress={notiSendCheck}
          />
        </View>
      )}

      <CustomAlert
        show={notiAlert}
        setShow={() => setNotiAlert(false)}
        title={'알림'}
        message={t.noti_not_member}
        onPress={() => {}}
      />

      {NotiSend(notiSend)}
      {ListForm(listFormPopup)}
      {sortWay(sortTypePopup)}
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

import React, {useEffect, useState} from 'react';
import {
  Animated,
  Easing,
  NativeModules,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {BaseView, Image, Text} from '../comp/components';
import {Color, Dim, Img} from '../../src/common';
import {NotificationWindow} from '../comp/NotificationWindow';
import Ingredient from '../ingredient/Ingredient';
import useLoad from '../../src/hook/useLoad';
import Connect from '../../event/Connect';
import Swiper from 'react-native-swiper';
import {Header} from '../comp/Header';
import {useSelector} from 'react-redux';

const {StatusBarManager} = NativeModules;

const categories = ['냉장', '냉동', '실온'];

const Dashboard = ({navigation, route}) => {
  const {value} = useSelector(({user}) => ({
    value: user.get('userData').toJS(),
  }));
  const scaleValue = new Animated.Value(1); // 초기 크기

  const [load] = useLoad();

  const itemsPerPage = 20; // 한 페이지에 보여줄 객체 개수

  const [dashboardCategory, setDashboardCategory] = useState(null); // 카테고리 선택 값

  const [outsideDataValues, setOutsideDataValues] = useState([
    {text: '양파', image: 'popo1'},
    {text: '포도', image: 'popo2'},
    {text: '양파', image: 'popo1'},
    {text: '포도', image: 'popo2'},
    {text: '양파', image: 'popo1'},
    {text: '포도', image: 'popo2'},
    {text: '양파', image: 'popo1'},
    {text: '포도', image: 'popo2'},
    {text: '양파', image: 'popo1'},
    {text: '포도', image: 'popo2'},
    {text: '양파', image: 'popo1'},
    {text: '포도', image: 'popo2'},
    {text: '양파', image: 'popo1'},
    {text: '포도', image: 'popo2'},
    {text: '양파', image: 'popo1'},
    {text: '포도', image: 'popo2'},
    {text: '양파', image: 'popo1'},
    {text: '포도', image: 'popo2'},
    {text: '양파', image: 'popo1'},
    {text: '포도', image: 'popo2'},
    {text: '양파', image: 'popo1'},
    {text: '포도', image: 'popo2'},
    {text: '양파', image: 'popo1'},
    {text: '포도', image: 'popo2'},
    {text: '양파', image: 'popo1'},
    {text: '포도', image: 'popo2'},
    {text: '양파', image: 'popo1'},
    {text: '포도', image: 'popo2'},
    {text: '양파', image: 'popo1'},
    {text: '포도', image: 'popo2'},
    {text: '양파', image: 'popo1'},
    {text: '포도', image: 'popo2'},
    {text: '양파', image: 'popo1'},
    {text: '포도', image: 'popo2'},
    {text: '양파', image: 'popo1'},
    {text: '포도', image: 'popo2'},
  ]);

  useEffect(() => {
    // read();
    startAnimation();
    // load();
    // // () => Connect.memberList({mngIndex: value.managerIndex}),
    // // result => {
    // //   const {code, list} = result;
    // //   if (code === 200) {
    // //     setMemberList(list);
    // //     setMemberOriginal(list);
    // //     setSearchList(list);
    // //   }
    // // },
  }, []);

  const read = async () => {
    await load(
      () => Connect.getUserData({id: 1}),
      result => {
        console.log('fwfweefwefbb ', result);
      },
    );
  };

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.05, // 커지는 크기
          duration: 500, // 애니메이션 지속 시간 (밀리초)
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1, // 원래 크기
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
      {iterations: -1}, // 무한 반복
    ).start();
  };

  const handleCategoryPress = category => {
    if (dashboardCategory === category) {
      setDashboardCategory(null); // Deselect if already selected
    } else {
      setDashboardCategory(category);
    }
  };

  const handleSelect = index => {
    const updatedObjects = [...outsideDataValues]; // 재료
    let updatedSelectList = []; // 선택한 재료를 넣기 위한 list
    updatedObjects[index].select = !updatedObjects[index].select;

    setOutsideDataValues(updatedObjects);
    // setSelectList([...selectList, ...updatedObjects[index]]);
    // setSelectList(updatedSelectList); // 업데이트된 selectList 설정
  };

  return (
    <BaseView
      needScrollView={false}
      style={{
        flex: 1,
        // alignItems: 'center',

        backgroundColor: Color.baseBackground,
      }}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Header title={'쿡 나우'} />
        <NotificationWindow
          color={Color.mainLight}
          image={Img.question}
          text={'냉장고에 재료를 채줘주세요!'}
        />

        {value.count === -1 ? (
          <Pressable
            style={{
              flex: 1,
              // borderWidth: 1,
              width: '90%',
              // height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              console.log('>><<>><< ');
              navigation.navigate('IngredientStack');
            }}>
            <Animated.Image
              // viewStyle={{...Dim.margin(10, 10, 10, 10)}}
              // style={{
              //   // ...Dim.margin(40),
              //   width: 100,
              //   height: 100,
              //   // zIndex: -10,
              // }}
              style={[
                {width: '90%', height: '100%'},
                {transform: [{scale: scaleValue}]},
              ]}
              resizeMode="contain"
              source={Img.refrigerator_01}
              // onPress={() => {
              //   console.log('???');
              //   navigation.navigate('Ingredient');
              // }}
            />
          </Pressable>
        ) : (
          <View
            style={{
              flex: 1,
              // borderWidth: 1,
              flexDirection: 'row', // 이건 값이 있을 떄
              justifyContent: 'center',
              alignItems: 'center',
              // margin: ,
              ...Dim.margin(10, 15, 10, 15),
              ...Dim.padding(0, 0, 20, 0),
            }}>
            <View style={css.container}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={css.scrollContent}>
                {categories.map((category, index) => (
                  <View key={index} style={{flex: 1}}>
                    <TouchableOpacity
                      style={[
                        css.categoryButton,

                        dashboardCategory === category && css.selectedButton,
                      ]}
                      onPress={() => handleCategoryPress(category)}>
                      <Text
                        color={
                          dashboardCategory === category
                            ? 'mainLight'
                            : 'mainDeepLight'
                        }
                        style={[
                          css.categoryText,
                          dashboardCategory === category && css.selectedText,
                        ]}>
                        {category}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>

            <View
              style={{
                flex: 4,
                backgroundColor: Color.white,
                borderTopWidth: 1,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: Color.mainLight,
              }}>
              <Swiper loop={false}>
                {outsideDataValues
                  .reduce((pages, object, index) => {
                    if (index % itemsPerPage === 0) {
                      pages.push([]);
                    }
                    pages[pages.length - 1].push(object);
                    return pages;
                  }, [])
                  .map((pageObjects, pageIndex) => (
                    <View key={pageIndex} style={css.pageContainer}>
                      {pageObjects.map((value, objectIndex) => {
                        const {text, select, image} = value;

                        // console.log('??????????? ', value);

                        return (
                          // <View key={objectIndex} style={css.objectContainer}>
                          //   <Text>{text}</Text>
                          // </View>
                          <View
                            key={objectIndex}
                            style={{
                              // flex: 1,
                              alignItems: 'center',

                              // width: '20%', // 5열로 배치
                              // height: '20%', // 5행으로 배치
                              ...Dim.padding(3, 3, 3, 3),
                              ...Dim.margin(3, 0, 3, 0),
                            }}>
                            <Image
                              viewStyle={{
                                ...Dim.size(50, 45),
                                // width: '20%',

                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: value.select ? 1 : 0,
                                borderColor: value.select && Color.mainLight,
                                borderRadius: 5,
                                backgroundColor: value.select
                                  ? Color.buttonSelect
                                  : Color.buttonNotSelect,
                              }}
                              source={Img[image]}
                              onPress={() => {
                                // console.log('>>>?');
                                handleSelect(
                                  pageIndex * itemsPerPage + objectIndex,
                                );
                              }}
                            />
                            <Text>{text}</Text>
                          </View>
                        );
                      })}
                    </View>
                  ))}
              </Swiper>
            </View>
          </View>
        )}
      </View>
    </BaseView>
  );
};

const css = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1,
    // marginTop: 20,
    // paddingHorizontal: 10,
  },
  scrollContent: {
    flex: 1,
    // alignItems: 'center',
  },
  categoryButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: 10,
    // paddingHorizontal: 15,
    backgroundColor: Color.mainLight,
    borderRadius: 10,
    // marginHorizontal: 5,
    ...Dim.margin(0, 10, 10, 0),
  },
  selectedButton: {
    backgroundColor: Color.white,
    borderWidth: 1,
    // borderTopWidth: 1,
    // borderLeftWidth: 1,
    // borderRightWidth: 1,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    // borderBottomLeftRadius: 0,
    // borderBottomRightRadius: 0,
    borderColor: Color.mainLight,
  },
  categoryText: {
    fontSize: 16,
    // fontWeight: 'bold',
    // color: Color.mainDeepLight,
  },
  selectedText: {
    // color: Color.mainLight,
  },

  pageContainer: {
    // flex: 1,
    // ...Dim.margin(20, 10, 20, 0),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

export default Dashboard;

import {
  SafeAreaView,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Common, {Color, Dim, Img} from '../../src/common';
import {BaseView, Button, Image, Text} from '../comp/components';
import {CategoryUI} from './comp';
import Swiper from 'react-native-swiper';
import React, {useEffect, useState} from 'react';
import login from '../login/login';
import {head} from 'axios';

const categories = ['과일', '채소', '고기', '수산물', '기타', '하하', '호호'];

const Ingredient = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResultList, setSearchResultList] = useState([]); // 검색 결과 리스트

  const [selectList, setSelectList] = useState([]); // 선택한 결과 리스트;

  const [selectedCategory, setSelectedCategory] = useState(null); // 카테고리 선택 값
  const [initState, setInitState] = useState([]);
  const [outsideDataValues, setOutsideDataValues] = useState([
    {text: 'fssf', image: 'gg'},
    {text: 'vvvvvvv', image: 'gg'},
    {text: '333', image: 'gg'},
    {text: '4444', image: 'gg'},
    {text: '5555', image: 'gg'},
    {text: '6666', image: 'gg'},
    {text: '7777', image: 'gg'},
    {text: '88888', image: 'gg'},
    {text: '88888', image: 'gg'},
    {text: '88888', image: 'gg'},
    {text: '88888', image: 'gg'},
    {text: '88888', image: 'gg'},
  ]); // 각 카테고리에 속해 있는 재료들 초기값
  // const [currentPage, setCurrentPage] = useState(0); // 스와이프 page

  const itemsPerPage = 25; // 한 페이지에 보여줄 객체 개수

  useEffect(() => {
    setInitState(outsideDataValues);
    // 재료 객체에 select 속성 부여 -> 이건 카드 선택을 위한값
    const objectsWithSelect = outsideDataValues.map(object => ({
      ...object,
      select: false,
    }));

    setOutsideDataValues(objectsWithSelect);
  }, []);

  useEffect(() => {
    if (Common.isEmpty(searchText)) {
      // initState
      setOutsideDataValues(initState);
    } else {
      handleSearch();
    }
  }, [searchText]);

  const handleSearch = () => {
    const filteredObjects = outsideDataValues.filter(object =>
      object.text.includes(searchText),
    );
    setOutsideDataValues(filteredObjects);
  };

  // 카테고리 버튼 눌렸을 때
  const handleCategoryPress = category => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // Deselect if already selected
    } else {
      setSelectedCategory(category);
    }
  };

  // 재료 선택했을 때
  const handleSelect = index => {
    const updatedObjects = [...outsideDataValues]; // 재료
    let updatedSelectList = []; // 선택한 재료를 넣기 위한 list
    updatedObjects[index].select = !updatedObjects[index].select;

    selectList.map(({select}, index) => {
      if (select) {
        updatedSelectList.push(selectList[index]);
      }
    });

    if (updatedObjects[index].select) {
      console.log('?', updatedObjects[index], selectList);
      // selectIngredient.push(updatedObjects[index]);
      // setSelectList([...selectIngredient, ...updatedObjects[index]]);
      updatedSelectList.push(updatedObjects[index]);
    }

    setOutsideDataValues(updatedObjects);
    // setSelectList([...selectList, ...updatedObjects[index]]);
    setSelectList(updatedSelectList); // 업데이트된 selectList 설정
  };

  // const handlePageChange = index => {
  //   const objectsInCurrentPage = (index + 1) * 5;
  //   if (objectsInCurrentPage > outsideDataValues.length) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  return (
    <BaseView
      needScrollView={false}
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: Color.baseBackground,
      }}>
      <View style={{width: '100%'}}>
        <View style={{...Dim.margin(20, 30, 0)}}>
          <Text
            color={
              'black'
            }>{`내 냉장고에 있는 재료들을 선택하고\n정보를 입력해보세요!`}</Text>

          {/*<SearchWindow searchText={searchText} setSearchText={setSearchText} />*/}
          <View style={css.searchContainer}>
            {/*<Image source={Img.question} />*/}
            <Image source={Img.search} />
            {/*<Text color={'white'} size={15} style={{...Dim.margin(0, 0, 0, 15)}}>*/}
            {/*  {searchText}*/}
            {/*</Text>*/}
            <TextInput
              style={css.searchTextInput}
              placeholder="재료를 입력하세요."
              value={searchText}
              placeholderTextColor={Color.gray}
              onChangeText={a => {
                console.log('gagag', a);
                setSearchText(a);
                // handleSearch(a);
              }}
            />
          </View>
        </View>
      </View>

      {selectList.length > 0 && (
        <View style={{flex: 0.2, width: '100%'}}>
          <ScrollView horizontal contentContainerStyle={{alignItems: 'center'}}>
            {selectList.map((item, index) => {
              const {image} = item;
              console.log('ppppp ', item);
              return (
                <View
                  key={index}
                  style={{
                    borderWidth: 1,
                    ...Dim.margin(0, 3, 0, 3),
                    borderColor: Color.mainDeepLight,
                    backgroundColor: Color.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '20%',
                    ...Dim.size(50, 50, 60),
                  }}>
                  <Image
                    viewStyle={{
                      ...Dim.size(50, 45),
                      flex: 1,
                    }}
                    source={Img.popo1}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
      )}

      {/*<View style={{borderWidth: 2}}>*/}
      <View style={css.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={css.scrollContent}>
          {categories.map((category, index) => (
            <View>
              <TouchableOpacity
                key={index}
                style={[
                  css.categoryButton,
                  selectedCategory === category && css.selectedButton,
                ]}
                onPress={() => handleCategoryPress(category)}>
                <Text
                  color={
                    selectedCategory === category
                      ? 'mainLight'
                      : 'mainDeepLight'
                  }
                  style={[
                    css.categoryText,
                    selectedCategory === category && css.selectedText,
                  ]}>
                  {category}
                </Text>
              </TouchableOpacity>
              {/*<View*/}
              {/*  style={{*/}
              {/*    // flex: 1,*/}
              {/*    ...Dim.margin(0, 5, 0),*/}
              {/*    backgroundColor: selectedCategory === category && Color.white,*/}
              {/*    borderColor: selectedCategory === category && Color.mainLight,*/}
              {/*    borderLeftWidth: 1,*/}
              {/*    borderRightWidth: 1,*/}
              {/*    // borderWidth: 1,*/}
              {/*    position: 'absolute',*/}
              {/*    bottom: -30,*/}
              {/*    // right: 0,*/}
              {/*    // left: 0,*/}
              {/*    width: '85%',*/}
              {/*    height: 30,*/}
              {/*    // ...Dim.size('100%', 30),*/}
              {/*  }}*/}
              {/*/>*/}
            </View>
          ))}
        </ScrollView>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: Color.white,
          borderTopWidth: 1,
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

                        width: '20%', // 5열로 배치
                        // height: '20%', // 5행으로 배치
                        ...Dim.padding(3, 3, 3, 3),
                      }}>
                      {/*<Button*/}
                      {/*  style={{*/}
                      {/*    borderWidth: 1,*/}
                      {/*    borderRadius: 5,*/}
                      {/*    backgroundColor: Color.buttonNotSelect,*/}
                      {/*  }}*/}
                      {/*  onPress={() => console.log('gg')}>*/}
                      {/*  <Text>{image}</Text>*/}
                      {/*</Button>*/}
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
                        source={Img.popo1}
                        onPress={() => {
                          // console.log('>>>?');
                          handleSelect(pageIndex * itemsPerPage + objectIndex);
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
      {/*</View>*/}
    </BaseView>
  );
};

const css = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    // width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: Color.white,
    ...Dim.margin(10, 0, 0, 0),
    ...Dim.padding(10, 15, 10, 15),
  },

  searchTextInput: {
    height: 30,
    width: '70%',
    borderColor: 'gray',
    // borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: Color.black,
    ...Dim.padding(0, 0, 0, 5),
  },
  // activeDot: {
  //   ...Color.back('main'),
  //   ...Dim.size(16, 4, 4),
  //   ...Dim.margin(0, 3, 20, 3),
  // },
  // dot: {
  //   ...Color.back('black'),
  //   ...Dim.size(4, 4, 4),
  //   ...Dim.margin(0, 3, 20, 3),
  // },
  pageContainer: {
    // flex: 1,
    ...Dim.margin(20, 10, 20),
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  objectContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // width: '100%',
    // height: '10%',
    borderWidth: 1,
    borderColor: 'gray',
  },

  container: {
    flex: 0.15,
    // marginTop: 20,
    // paddingHorizontal: 10,
  },
  scrollContent: {
    alignItems: 'center',
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: Color.mainLight,
    borderRadius: 10,
    marginHorizontal: 5,
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
});
export default Ingredient;

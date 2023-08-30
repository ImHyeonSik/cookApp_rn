import React, {useState} from 'react';
import {
  Modal,
  SafeAreaView,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {Button, Image, Pressable, ScrollView, Text} from '../comp/components';
import Img from '../../src/img';
import {Color, Dim} from '../../src/common';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Calendar} from 'react-native-calendars';
import cnt from '../../src/constant/constant';
import BottomSheet from '../comp/BottomSheet';
import axios from 'axios';

const IngredientInfo = () => {
  const [initialSelectedDate, setInitialSelectedDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState({}); // 선택한 날짜 저장
  const [startDay, setStartDay] = useState(null);

  const minDate = new Date(); // 오늘 이전의 날짜 선택 불가하도록 설정

  const [calendarStatus, setCalendarStatus] = useState(false);
  const [buttonState, setButtonState] = useState(0);
  // const [getList, setGetList] = useState([
  //   {
  //     id: null,
  //     ingredientName: '안심',
  //     ingredientImageUrl: 'testUrl',
  //     quantity: 15,
  //     expiration_date: '2023-08-10',
  //     storage_type: 'COLD',
  //   },
  //   {
  //     id: null,
  //     ingredientName: '안심',
  //     ingredientImageUrl: 'testUrl',
  //     quantity: 15,
  //     expiration_date: '2023-08-10',
  //     storage_type: 'ROOM',
  //   },
  //   {
  //     id: null,
  //     ingredientName: '안심',
  //     ingredientImageUrl: 'testUrl',
  //     quantity: 15,
  //     expiration_date: '2023-08-10',
  //     storage_type: 'FREEZE',
  //   },
  // ]);
  const initialData = [
    {
      id: null,
      ingredientName: '안심',
      ingredientImageUrl: 'testUrl',
      quantity: 15,
      expiration_date: '2023-08-29',
      storage_type: 'ROOM',
    },
    {
      id: null,
      ingredientName: '안심',
      ingredientImageUrl: 'testUrl',
      quantity: 15,
      expiration_date: '2023-08-31',
      storage_type: 'FREEZE',
    },
    {
      id: null,
      ingredientName: '아아',
      ingredientImageUrl: 'testUrl',
      quantity: 15,
      expiration_date: '2023-08-30',
      storage_type: 'COLD',
    },
  ];

  const [getList, setGetList] = useState(initialData);
  const [currentStorageIndex, setCurrentStorageIndex] = useState([0, 0, 0]);

  const storageTypes = ['COLD', 'FREEZE', 'ROOM'];

  const handleButtonPress = index => {
    const nextIndex = (currentStorageIndex[index] + 1) % storageTypes.length;
    setCurrentStorageIndex(prev => [
      ...prev.slice(0, index),
      nextIndex,
      ...prev.slice(index + 1),
    ]);

    // 변경된 storage_type 업데이트
    const updatedList = getList.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          storage_type: storageTypes[nextIndex],
        };
      }
      return item;
    });
    setGetList(updatedList);
  };

  const handleButtonMinus = index => {
    const updatedList = getList.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setGetList(updatedList);
  };

  const handleButtonPlus = index => {
    const updatedList = getList.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setGetList(updatedList);
  };

  const handleButtonDelete = index => {
    const updatedList = getList.filter((item, i) => i !== index);
    setGetList(updatedList);
  };

  const saveData = async () => {
    const ingredients = [
      {
        ingredient_id: 1,
        quantity: 15,
        expiration_date: '2023-08-10',
        storage_type: 'COLD',
      },
      {
        ingredient_id: 2,
        quantity: 30,
        expiration_date: '2023-08-12',
        storage_type: 'ROOM',
      },
    ];

    try {
      const response = await axios.post(
        `http://ec2-43-202-30-201.ap-northeast-2.compute.amazonaws.com:80/api/v1/storage`,
        {
          request: ingredients,
        },
      );
      // setIngredients(response.data); // Assuming the response contains the ingredients data
      console.log('save', response.data);
    } catch (error) {
      console.error('Error fetching ingredientsInfo error :', error);
    }
  };

  const buttonStates = [
    {text: '냉동', color: Color.btnInfo300},
    {text: '냉장', color: Color.btnSuccess300},
    {text: '실온', color: Color.btnWarming300},
  ];

  // const onDayPress = day => {
  //   // 선택한 날짜 범위 설정
  //   // const newSelectedDates = {...selectedDates};
  //   // newSelectedDates.from = minDate.toISOString().split('T')[0]; // 현재 날짜를 시작 날짜로 설정
  //   // newSelectedDates.to = day.dateString;
  //   // setSelectedDates(newSelectedDates);
  //
  //   console.log('ppppp', day, initialData[day].expiration_date);
  //   setInitialSelectedDate(new Date(initialData[day].expiration_date));
  // };

  const currentDate = new Date(); // 현재 날짜

  const onDayPress = day => {
    // 선택한 날짜 범위 설정
    // const newSelectedDates = {...selectedDates};
    // newSelectedDates.from = currentDate.toISOString().split('T')[0]; // 현재 날짜를 시작 날짜로 설정
    // newSelectedDates.to = day.dateString;
    // setSelectedDates(newSelectedDates);
    if (!startDay) {
      // 시작 날짜 선택
      setStartDay(day.dateString);
      setSelectedDates({
        [day.dateString]: {startingDay: true, color: 'tomato'},
      });
    } else {
      // 끝 날짜 선택
      const newSelectedDates = {
        ...selectedDates,
        [day.dateString]: {endingDay: true, color: 'tomato'},
      };

      // 시작 날짜와 끝 날짜 사이의 날짜들을 계산하여 스타일 적용
      const startDate = new Date(startDay);
      const endDate = new Date(day.dateString);
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        const dateString = currentDate.toISOString().split('T')[0];
        newSelectedDates[dateString] = {
          selected: true,
          color: 'tomato',
          textColor: 'white',
        };
        currentDate.setDate(currentDate.getDate() + 1);
      }

      setSelectedDates(newSelectedDates);
      setStartDay(null); // 선택 완료 후 시작 날짜 초기화
    }
  };

  const BottomCalendar = props => {
    const {visible, minDate, onDayPress, initialSelectedDate} = props;
    console.log('vvv', visible);
    return (
      // <Modal style={{height: '50%'}} visible={calendarStatus}>
      //   <Calendar />
      //
      //   <View style={{flexDirection: 'row'}}>
      //     <Text onPress={() => setCalendarStatus(false)}>확인</Text>
      //   </View>
      // </Modal>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <BottomSheet
          modalVisible={calendarStatus}
          setModalVisible={setCalendarStatus}>
          <Calendar
            // style={{}}
            // minDate={minDate}
            // current={initialSelectedDate} // 초기 선택 날짜 설정
            // markedDates={selectedDates}
            // onDayPress={onDayPress}
            // markingType={'period'}
            markedDates={{
              ...selectedDates,
              [selectedDates.from]: {selected: true, startingDay: true},
              [selectedDates.to]: {selected: true, endingDay: true},
            }}
            onDayPress={onDayPress}
            markingType={'period'}
            theme={{
              // 커스텀 스타일을 적용하기 위한 theme 설정
              selectedDayBackgroundColor: 'rgba(255, 99, 71, 0.7)', // 둥근 원 색상 (예: Tomato)
              selectedDayTextColor: Color.red, // 선택된 날짜 텍스트 색상
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              ...Dim.margin(20, 0, 20, 0),
            }}>
            <Pressable
              style={{
                borderWidth: 1,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                width: '40%',
                height: Dim.y(40),
                borderColor: Color.main,
              }}>
              <Text size={15} color={'main'}>
                취소
              </Text>
            </Pressable>
            <Pressable
              style={{
                borderWidth: 1,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                width: '40%',
                height: Dim.y(40),
                backgroundColor: Color.main,
              }}>
              <Text size={15} color={'white'}>
                확인
              </Text>
            </Pressable>
          </View>
        </BottomSheet>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Color.white,
        ...Dim.padding(10, 10, 0, 10),
      }}>
      <Text>{`내 냉장고에 있는 재료들을 선택하고\n정보를 입력해보세요!`}</Text>

      <ScrollView style={{}}>
        {getList.map((items, index) => {
          const {
            id,
            ingredientName,
            ingredientImageUrl,
            quantity,
            expiration_date,
            storage_type,
          } = items;

          return (
            <View key={index} style={css.itemContainer}>
              <View style={css.itemImageContainer}>
                <View style={css.itemImageInnerContainer}>
                  <Image style={css.itemImage} source={Img.popo1} />

                  <Pressable
                    style={css.itemDeleteImage}
                    onPress={() => {
                      console.log('delete');
                      handleButtonDelete(index);
                    }}>
                    <Icon
                      name="minus" // 뒤로가기 버튼 아이콘 // plus
                      size={9} // 아이콘 크기
                      color={Color.white} // 아이콘 색상
                    />
                  </Pressable>
                </View>
                <View style={{}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      viewStyle={{
                        borderWidth: 1,
                        borderRadius: 5,
                        ...Dim.padding(2, 10, 2, 10),
                        ...Dim.margin(0, 5, 0, 0),
                        borderColor: cnt.getStorageDeepColor(storage_type),
                        backgroundColor: cnt.getStorageColor(storage_type),
                      }}
                      onPress={() => handleButtonPress(index)}>
                      {cnt.getStorageType(storage_type)}
                    </Text>
                    <Text>{ingredientName}</Text>
                  </View>

                  <Text
                    viewStyle={{
                      borderWidth: 1,
                      borderColor: Color.grayDC,
                      borderRadius: 5,
                      ...Dim.padding(5, 10, 5, 10),
                      ...Dim.margin(5, 0, 0, 0),
                    }}
                    onPress={() => {
                      console.log('날짜');
                      setCalendarStatus(true);
                      onDayPress(index);
                    }}>
                    {/*2023.06.24*/}
                    {expiration_date}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  // borderWidth: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}>
                <Pressable
                  style={[
                    getList[index].quantity === 1
                      ? css.BtnDisabled
                      : css.BtnActivate,
                  ]}
                  onPress={
                    getList[index].quantity === 1
                      ? null
                      : () => {
                          console.log('minus');
                          handleButtonMinus(index);
                        }
                  }>
                  <Icon
                    name="minus" // 뒤로가기 버튼 아이콘 // plus
                    size={10} // 아이콘 크기
                    color={Color.main} // 아이콘 색상
                  />
                </Pressable>
                <Text
                  center
                  style={{
                    ...Dim.size(25, 25),
                    ...Dim.margin(0, 10, 0, 10),
                  }}>
                  {quantity}
                </Text>
                <Pressable
                  style={{
                    borderWidth: 1,
                    borderColor: Color.backDeepGreen,
                    backgroundColor: Color.backlightGreen,
                    borderRadius: 5,
                    ...Dim.size(25, 25),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    console.log('plus');
                    handleButtonPlus(index);
                  }}>
                  <Icon
                    name="plus" // 뒤로가기 버튼 아이콘 // plus
                    size={10} // 아이콘 크기
                    color={Color.main} // 아이콘 색상
                  />
                </Pressable>
              </View>
            </View>
          );
        })}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            ...Dim.margin(10, 0, 0, 0),
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              center
              style={{
                ...Dim.margin(0, 10, 0, 0),
                ...Dim.size(40, 40),
                borderRadius: 5,
                backgroundColor: Color.buttonNotSelect,
              }}>
              +
            </Text>
            <Text>{`재료함에서 더 많은 재료를 담아\n내 냉장고 채우러가기`}</Text>
          </View>
          <Icon name="chevron-right" size={20} color={Color.main} />
        </View>
      </ScrollView>

      <View style={{alignItems: 'center', ...Dim.margin(10, 0, 10)}}>
        <View
          style={{
            backgroundColor: Color.bright,
            width: Dim.fullWidth * 0.9,
            height: Dim.fullHeight * 0.1,
            alignItems: 'center',
            justifyContent: 'center',
            ...Dim.margin(10, 0, 0, 0),
          }}>
          <Text>광고 영역</Text>
        </View>

        <Button
          style={css.inputButton}
          textColor={'white'}
          text={'입력 완료'}
          onPress={async () => {
            console.log('>>???? ', getList);
            await saveData();
          }}
        />

        {/*{calendarStatus && <BottomCalendar />}*/}
        <BottomCalendar
          initialSelectedDate={initialSelectedDate}
          visible={calendarStatus}
          minDate={minDate}
          onDayPress={onDayPress}
        />
      </View>
    </SafeAreaView>
  );
};

const css = StyleSheet.create({
  itemContainer: {
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...Dim.margin(10, 0, 0, 0),
  },
  itemImageContainer: {
    flexDirection: 'row',
    flex: 2,
    alignItems: 'center',
  },
  itemImageInnerContainer: {
    flexDirection: 'row',
    ...Dim.padding(2, 5, 2, 5),
    ...Dim.margin(0, 15, 0, 0),
  },
  itemImage: {
    // height:'100%'
    ...Dim.size(40, 40),
    borderRadius: 5,
    backgroundColor: Color.buttonNotSelect,
  },
  itemDeleteImage: {
    height: 20,
    width: 20,
    borderRadius: 20,
    // ...Dim.size(20, 20, 40),
    backgroundColor: Color.main,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -10,
    right: -10,
  },

  inputButton: {
    borderRadius: 5,
    width: Dim.fullWidth * 0.9,
    ...Dim.margin(10, 0, 0),
  },
  BtnActivate: {
    borderWidth: 1,
    borderColor: Color.backDeepGreen,
    backgroundColor: Color.backlightGreen,
    borderRadius: 5,
    ...Dim.size(25, 25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  BtnDisabled: {
    borderWidth: 1,
    borderColor: Color.btnGray200,
    backgroundColor: Color.btnGray100,
    borderRadius: 5,
    ...Dim.size(25, 25),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default IngredientInfo;

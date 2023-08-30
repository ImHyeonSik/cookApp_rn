import {fromJS} from 'immutable';
import {RESET_USER_DATA, SET_USER_DATA} from '../action/actionTypes';

export const initialState = fromJS({
  userData: {
    count: -1, // 장바구니 갯수 카운터
    keyHeight: null,
    img: null,
    managerIndex: '',
    chat: -1,
    chatCount: 0,
    noti: null,
    setting: null,
    login: {
      appVersion: '',
      compSeq: '',
      fcm: '',
      id: '',
      lang: '',
      os: '',
      osModel: '',
      osSoftware: '',
      osVersion: '',
      pw: '',
      sns: '',
      timeZone: '',
    },
    profile: {
      birth: '',
      bodyType: '',
      countryCode: '',
      email: '',
      gender: '',
      height: '',
      name: '',
      phone: '',
      weight: '',
      correctType: null,
      correctValue: null,
    },
  },
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      const {
        count,
        img,
        managerIndex,
        login,
        profile,
        chat,
        chatCount,
        noti,
        setting,
        keyHeight,
      } = action.data;
      // console.log('action.data =>', action.data, managerIndex)

      if (count) state = state.setIn(['userData', 'count'], count);
      if (keyHeight) state = state.setIn(['userData', 'keyHeight'], keyHeight);
      if (img) state = state.setIn(['userData', 'img'], img);
      if (managerIndex)
        state = state.setIn(['userData', 'managerIndex'], managerIndex);
      if (chatCount) state = state.setIn(['userData', 'chatCount'], chatCount);
      if (chat) state = state.setIn(['userData', 'chat'], chat);
      if (noti) state = state.setIn(['userData', 'noti'], noti);
      if (setting) state = state.setIn(['userData', 'setting'], setting);
      if (login)
        state = state.setIn(
          ['userData', 'login'],
          state.getIn(['userData', 'login']).merge(login),
        );
      if (profile)
        state = state.setIn(
          ['userData', 'profile'],
          state.getIn(['userData', 'profile']).merge(profile),
        );

      return state;
    case RESET_USER_DATA:
      return state.merge(initialState);
    default:
      return state;
  }
};

export const getUserData = state => state.user.get('userData').toJS();

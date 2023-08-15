import {fromJS} from 'immutable';
import {
  SHOW_ALERT,
  DISMISS_ALERT,
  SET_LOAD_AND_ACTION,
} from '../action/actionTypes';
import Common, {t} from '../../common';

export const initialState = fromJS({
  screen: {
    load: false,
    action: undefined,
    loadText: '',
  },
  alert: {
    visible: false,
    title: '',
    message: '',
    renderContent: () => false,
    buttons: [],
    opt: {
      cancelable: true,
      // btnDirection: alert.btnDirectionRow,
    },
  },
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOAD_AND_ACTION:
      return state
        .setIn(['screen', 'load'], action.load)
        .setIn(['screen', 'action'], action.action)
        .setIn(['screen', 'loadText'], action.loadText);
    case SHOW_ALERT:
      state = state.set('alert', initialState.get('alert'));

      state = state.setIn(
        ['alert', 'title'],
        Common.isEmpty(action.title) ? t.alert : action.title,
      );
      if (!Common.isEmpty(action.message))
        state = state.setIn(['alert', 'message'], action.message);
      if (!Common.isEmpty(action.buttons))
        state = state.setIn(['alert', 'buttons'], action.buttons);
      if (!Common.isEmpty(action.opt))
        state = state.setIn(['alert', 'opt'], action.opt);
      if (!Common.isEmpty(action.renderContent))
        state = state.setIn(['alert', 'renderContent'], action.renderContent);

      return state.setIn(['alert', 'visible'], true);
    case DISMISS_ALERT:
      return state.set('alert', initialState.get('alert'));
    default:
      return state;
  }
};

export const getAlert = state => state.alert.get('alert').toJS();

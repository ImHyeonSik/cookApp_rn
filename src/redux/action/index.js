import {
  SHOW_ALERT,
  DISMISS_ALERT,
  SET_LOAD_AND_ACTION,
  SET_USER_DATA,
  RESET_USER_DATA,
} from './actionTypes';

export const setLoadingAction = (load, action, loadText) => ({
  type: SET_LOAD_AND_ACTION,
  load,
  action,
  loadText,
});
export const showAlert = (title, message, buttons, opt, renderContent) => ({
  type: SHOW_ALERT,
  title,
  message,
  buttons,
  opt,
  renderContent,
});
export const dismissAlert = () => ({
  type: DISMISS_ALERT,
});

/** user
 * 2020.05.27
 * @function setUserData 유저의 데이터를 스토어에 저장
 * @function resetUserData 유저의 데이터를 스토어에서 제거
 */
export function setUserData(data) {
  return {type: SET_USER_DATA, data};
}
export function resetUserData(data) {
  return {type: RESET_USER_DATA, data};
}

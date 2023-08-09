import {Dimensions, Platform, PixelRatio, NativeModules} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {getBottomSpace} from 'react-native-iphone-x-helper';

const basicDimensions = {
  width: 360,
  height: 640,
};
const fullWidth = Dimensions.get('window').width;
const fullHeight =
  Platform.OS === 'android'
    ? // ? NativeModules.Device.getWindowHeight() / PixelRatio.get()
      Dimensions.get('window').height
    : Dimensions.get('window').height -
      getBottomSpace() -
      getStatusBarHeight(true);

const widthRatio = fullWidth / basicDimensions.width;
const heightRatio = fullHeight / basicDimensions.height;

const cal = w => {
  if (typeof w === 'string') return w;
  if (w === undefined) return;

  return w * widthRatio;
};
const calH = h => {
  if (typeof h === 'string') return h;
  return h * heightRatio;
};

export const cssSize = (width, height, r) => {
  if (height === undefined) return {width};
  const size = {width, height};
  if (r) size.borderRadius = r;
  return size;
};

const set = (type, args, need) => {
  const css = {};
  switch (args.length) {
    case 1:
      if (args[0] >= 0)
        css[`${type}Top`] = css[`${type}Bottom`] = need
          ? calH(args[0])
          : args[0];
      break;
    case 2:
      if (args[0] >= 0)
        css[`${type}Top`] = css[`${type}Bottom`] = need
          ? calH(args[0])
          : args[0];
      if (args[1] >= 0)
        css[`${type}Left`] = css[`${type}Right`] = need
          ? cal(args[1])
          : args[1];
      break;
    case 3:
      if (args[0] >= 0) css[`${type}Top`] = need ? calH(args[0]) : args[0];
      if (args[1] >= 0)
        css[`${type}Left`] = css[`${type}Right`] = need
          ? cal(args[1])
          : args[1];
      if (args[2] >= 0) css[`${type}Bottom`] = need ? calH(args[2]) : args[2];
      break;
    default:
      if (args[0] >= 0) css[`${type}Top`] = need ? calH(args[0]) : args[0];
      if (args[1] >= 0) css[`${type}Right`] = need ? cal(args[1]) : args[1];
      if (args[2] >= 0) css[`${type}Bottom`] = need ? calH(args[2]) : args[2];
      if (args[3] >= 0) css[`${type}Left`] = need ? cal(args[3]) : args[3];
      break;
  }
  return css;
};
export const margin = (...args) => set('margin', args);
export const padding = (...args) => set('padding', args);

export const Dim = {
  h0: cal(132), // 120pt
  h1: cal(93.5), // 85pt
  h15: cal(77), // 70pt
  h2: cal(66), // 60pt
  h3: cal(60.5), // 55pt
  h4: cal(55), // 50pt
  h5: cal(52.8), // 48pt
  h6: cal(49.5), // 45pt
  h65: cal(46.2), // 42pt
  h7: cal(44), // 40pt
  h8: cal(41.8), // 38pt
  h9: cal(38.5), // 35pt
  h10: cal(35.2), // 32pt
  h11: cal(33), // 30pt
  h12: cal(27.5), // 25pt
  x: cal,
  y: calH,
  cssSize,
  size: (w, h, r) => cssSize(cal(w), calH(h), cal(r)),
  circle: (w, h, r) => cssSize(cal(w), cal(h), cal(r)),
  margin: (...args) => set('margin', args, true),
  padding: (...args) => set('padding', args, true),

  fullWidth,
  fullHeight,
};

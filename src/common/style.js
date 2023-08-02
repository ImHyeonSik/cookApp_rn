import {StyleSheet} from 'react-native';
import {default as Color} from './color';
import {margin, padding} from './dimen';

String.prototype.firstUpper = function () {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

const border = (c = Color.shadow99, w = 1, t = '') => {
  const ob = {};
  ob[`border${t.firstUpper()}Color`] = c;
  ob[`border${t.firstUpper()}Width`] = w;
  return ob;
};

const Style = StyleSheet.create({
  inline: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
  },
  textBox: {flex: 1, flexDirection: 'row', flexWrap: 'wrap'},
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  justCenter: {
    justifyContent: 'center',
  },
  around: {
    flex: 1,
    justifyContent: 'space-around',
  },
  between: {
    flex: 1,
    justifyContent: 'space-between',
  },
  fullCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullEnd: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  fullAbs: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  shadow: {
    shadowOffset: {width: 1, height: 0.5},
    shadowColor: Color.shadow99,
    shadowOpacity: 0.3,
    elevation: 3,
  },
});
Style.border = border;
Style.margin = margin;
Style.padding = padding;

export default Style;

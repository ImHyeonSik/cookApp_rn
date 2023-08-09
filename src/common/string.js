import LocalizedStrings from 'react-native-localization';
import ko from '../lang/ko';
// import en from '../lang/en';

export const list = [
  // {code: 'en', name: 'English', fullCode: 'en-US'},
  {code: 'ko', name: '한국어', fullCode: 'ko-KR'},
];
const t = new LocalizedStrings({ko});

const str = {
  check: s => (s === undefined || isNaN(s) ? '' : `${s}`),
  getLanguageName: c => list.find(({code}) => code === c).name || '',
  getFullCode: c => list.find(({code}) => code === c).fullCode || '',
  getOnlyLanguage: () =>
    (t.getLanguage() ? t.getLanguage() : t.getInterfaceLanguage()).slice(0, 2), // ko-KR 중 언어코드(ko)
  template: (tpl, args) => tpl.replace(/{(\w+)}/g, (_, v) => args[v]),
  getCountry: () => {
    return t.getInterfaceLanguage() && t.getInterfaceLanguage().length > 4
      ? t.getInterfaceLanguage().slice(3, 5)
      : '';
  },
};

console.log('str language', t.getAvailableLanguages());
console.log('str language', t.getLanguage());

export {t, str};

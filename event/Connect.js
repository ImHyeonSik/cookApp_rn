// import fetch from 'react-native-fetch-polyfill';
import {getItemFromAsync} from '../data/storage';
import axios from 'axios';

const base = 'http://ec2-43-202-30-201.ap-northeast-2.compute.amazonaws.com:80';

const isTestServerRelease = false; // true 로 두지 않도록 주의
const isTestServer = true;
export const list = {
  // base: isTestServerRelease || (isTestServer && __DEV__) ? 'test' : 'prod',
  base: isTestServerRelease || (isTestServer && __DEV__) ? base : base,
  categorySave: '/api/v1/category',
  categoryDelete: '/api/v1/category/{id}',

  getList: '/api/v1/category/{id}/ingredients',

  getUserData: `/api/v1/storage`,
};

const formType = 'multipart/form-data';
const jsonType = 'application/json';
const postJson = {method: 'post', type: jsonType};

const connect = async ({
  auth,
  data,
  form,
  method = 'GET',
  query,
  test,
  type,
  url,
}) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': type || formType,
  };
  if (auth === false) {
  } else if (auth === undefined) {
    const token = await getItemFromAsync('token');
    headers.Authorization = token;
  } else headers.Authorization = auth;
  const addr =
    url.charAt(0) !== '/'
      ? url
      : test
      ? `http://ec2-43-202-30-201.ap-northeast-2.compute.amazonaws.com:80${url}`
      : `${list.base}${url}`;
  const res = await axios(`${addr}${query ? encode(query) : ''}`, {
    headers,
    method,
    body: form || JSON.stringify(data),
  });
  const status = res.status;
  console.log('res = ', res);
  let result = null;

  try {
    result = await res.text();
  } catch (e) {}
  return result ? await {code: status, ...JSON.parse(result)} : {code: status};
};

const encode = (params = {}) => {
  const esc = encodeURIComponent;
  return (
    '?' +
    Object.keys(params)
      .map(k => `${esc(k)}=${esc(params[k])}`)
      .join('&')
  );
};
const simple = (url, query, more) => exec(() => connect({query, url, ...more}));
// const simple = (url, query, more) => exec(() => connect({query, url, ...more}));
const post = (data, url, username, more) =>
  exec(() =>
    connect({...postJson, data: postData(data, username), url, ...more}),
  );

const postData = (data, username = false) => {
  data = {...data};
  if (username) data.username = DB.getUser().username;
  return data;
};

const exec = async func => {
  try {
    const result = await func();
    return typeof result === 'object' && 'error' in result
      ? {error: JSON.stringify(result)}
      : result
      ? result
      : {};
  } catch (error) {
    console.log('exec catch', error);
    return {error};
  }
};

export default {
  categorySave: data => {
    //console.log({data});
    return simple(list.categorySave, data, {auth: false});
  },

  getUserData: async data => {
    return simple(list.getUserData, data);
  },

  // saveProfile : async data => post(data, list.saveProfile),
};

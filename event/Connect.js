import fetch from 'react-native-fetch-polyfill';
import {getItemFromAsync} from '../data/storage';

const isTestServerRelease = false; // true 로 두지 않도록 주의
const isTestServer = true;
export const list = {
  base: isTestServerRelease || (isTestServer && __DEV__) ? 'test' : 'prod',
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
    url.charAt(0) !== '/' ? url : test ? `test${url}` : `${list.base}${url}`;
  const res = await fetch(`${addr}${query ? encode(query) : ''}`, {
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

export default {};

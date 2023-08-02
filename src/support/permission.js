import {PERMISSIONS, requestMultiple} from 'react-native-permissions';

export const permissions_iOS = () => {
  requestMultiple([
    // PERMISSIONS.IOS.CONTACTS,
    // PERMISSIONS.IOS.CAMERA,
    // PERMISSIONS.IOS.PHOTO_LIBRARY,
    // PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
    // PERMISSIONS.IOS.MICROPHONE,
  ]).then(response => {
    // console.log('MULTIPLE REQUEST RESPONSE : ', response);
    // console.log('MULTIPLE REQUEST RESPONSE IOS : ', response[PERMISSIONS.IOS.CAMERA], response[PERMISSIONS.IOS.PHOTO_LIBRARY]);
  });
};

export const permissions_And = () => {
  requestMultiple([
    // PERMISSIONS.ANDROID.CAMERA,
    // PERMISSIONS.ANDROID.CALL_PHONE,
    // PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    // PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    // PERMISSIONS.ANDROID.ST
    // PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
    // PERMISSIONS.IOS.MICROPHONE,
  ]).then(response => {
    console.log('MULTIPLE REQUEST RESPONSE AND : ', response);
  });
};

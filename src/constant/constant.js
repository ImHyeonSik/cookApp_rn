import {Color} from '../common';

const cnt = {
  STORAGE_COLD: 'COLD',
  STORAGE_ROOM: 'ROOM',
  STORAGE_FREEZE: 'FREEZE',

  getStorageType: type => {
    switch (type) {
      case cnt.STORAGE_COLD:
        return '냉장';
      case cnt.STORAGE_ROOM:
        return '실온';
      case cnt.STORAGE_FREEZE:
        return '냉동';
    }
  },

  getStorageColor: type => {
    switch (type) {
      case cnt.STORAGE_COLD:
        return Color.btnSuccess300;
      case cnt.STORAGE_ROOM:
        return Color.btnWarming300;
      case cnt.STORAGE_FREEZE:
        return Color.btnInfo300;
    }
  },
  getStorageDeepColor: type => {
    switch (type) {
      case cnt.STORAGE_COLD:
        return Color.btnSuccess500;
      case cnt.STORAGE_ROOM:
        return Color.btnWarming500;
      case cnt.STORAGE_FREEZE:
        return Color.btnInfo500;
    }
  },
};

export default cnt;

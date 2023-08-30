import {useState, useEffect} from 'react';
import {Keyboard, KeyboardEvent} from 'react-native';

const useKeyboard = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [keyboardState, setKeyboardState] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardDidHide,
    );

    function onKeyboardDidShow(e) {
      setKeyboardHeight(e.endCoordinates.height);
      setKeyboardState(true);
      // console.log('^^ ', e)
    }
    function onKeyboardDidHide() {
      setKeyboardHeight(0);
      setKeyboardState(false);
      // console.log('bbbb ')
    }

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // console.log('1111111111', keyboardHeight, keyboardState)

  return {
    keyboardHeight,
    keyboardState,
  };
};
export default useKeyboard;

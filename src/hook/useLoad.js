import React from 'react';
import {useDispatch} from 'react-redux';
import {showAlert, setLoadingAction} from '../redux/action';

const useLoad = () => {
  const dispatch = useDispatch();

  const load = async (func, callback = _ => false) => {
    try {
      // const {setLoadingAction, showAlert} = this.props;
      setLoadingAction(true, undefined);
      const {error, ...others} = await func();
      error && console.log('load error', error);
      if (error) {
        error instanceof TypeError && error.message.includes('Network')
          ? setLoadingAction(false, () => load(func, callback))
          : dispatch(
              showAlert(
                '실패',
                typeof error === 'string' ? error : JSON.stringify(error),
                [
                  {
                    text: '확인',
                    onPress: async () => {
                      try {
                        setLoadingAction(false);
                        others.callback && others.callback();
                      } catch (e) {
                        console.log('load catch', e);
                      }
                    },
                  },
                ],
              ),
            );
        return;
      }

      const result = callback(others);
      if (result === false) {
        setLoadingAction(false);
        return {...others};
      }

      setLoadingAction(false);
    } catch (e) {
      console.log('load catch', e);
    }
  };

  return [load];
};
export default useLoad;

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  RootParamList,
  RootParamListWeb,
} from '../../../mobile/src/types/paramtypes';

export const useConfigRouting = () => {
  const {dispatch} = useNavigation<NativeStackNavigationProp<RootParamList>>();

  const appNavigate = <T extends keyof RootParamList | keyof RootParamListWeb>(
    nextScreen: T,
    params?: object | undefined,
  ) => {
    console.log('nextScreenWeb', nextScreen);
    if (typeof nextScreen === 'string') {
      if (params) {
        dispatch({type: 'NAVIGATE', payload: {name: nextScreen, params}});
      } else {
        dispatch({type: 'NAVIGATE', payload: {name: nextScreen}});
      }
    } else {
      throw new Error('Invalid screen type');
    }
  };

  return {appNavigate};
};

import {useNavigation, CommonActions} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  RootParamList,
  RootParamListWeb,
} from '../../../mobile/src/types/paramtypes';

export const useConfigRouting = () => {
  const {dispatch, goBack} =
    useNavigation<NativeStackNavigationProp<RootParamList>>();

  const appNavigate = <T extends keyof RootParamList | keyof RootParamListWeb>(
    nextScreen: T | 'goBack',
    params?: object | undefined,
  ) => {
    if (nextScreen === 'goBack') {
      goBack();
    } else if (typeof nextScreen === 'string') {
      console.log('nextScreenWeb', nextScreen);
      dispatch(CommonActions.navigate({name: nextScreen, params} as any));
    } else {
      throw new Error('Invalid screen type');
    }
  };
  return {appNavigate};
};

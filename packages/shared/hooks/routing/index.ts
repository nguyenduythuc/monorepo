import {useNavigation, CommonActions} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  RootParamList,
  ScreenParamEnum,
} from '../../../mobile/src/types/paramtypes';

export const useConfigRouting = () => {
  const {dispatch, goBack} =
    useNavigation<NativeStackNavigationProp<RootParamList>>();

  const appNavigate = <T extends ScreenParamEnum>(
    nextScreen: T,
    params?: object | undefined,
  ) => {
    if (typeof nextScreen === 'string') {
      console.log('nextScreenWeb', nextScreen);
      dispatch(CommonActions.navigate({name: nextScreen, params} as any));
    } else {
      throw new Error('Invalid screen type');
    }
  };

  return {appNavigate, goBack};
};

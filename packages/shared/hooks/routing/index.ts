import {Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {PrimaryNavigatorNavigationProp} from '../../../mobile/src/navigators/RootNavigator';
import {RootParamList} from '../../../mobile/src/types/paramtypes';

export const useConfigRouting = () => {
  const {dispatch, navigate} = useNavigation();
  const appNavigate = (nextScreen: string, params?: object) => {
    console.log('nextScreenWeb', nextScreen);
    dispatch(navigate(nextScreen, params));
  };

  return {appNavigate};
};

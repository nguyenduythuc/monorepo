import {Platform} from 'react-native';
import {
  useNavigation,
  NavigationProp,
  NavigationAction,
} from '@react-navigation/native';
import {PrimaryNavigatorNavigationProp} from '../../../mobile/src/navigators/RootNavigator';
import {RootParamList} from '../../../mobile/src/types/paramtypes';
import {Dispatch} from 'redux'; // Assuming you're using redux

interface UseNavigationReturn {
  dispatch: Dispatch<NavigationAction>;
  navigate: (routeName: string, params?: object) => any;
}
export const useConfigRouting = () => {
  const {dispatch, navigate}: UseNavigationReturn = useNavigation();

  const appNavigate = (nextScreen: string, params?: object) => {
    console.log('nextScreenWeb', nextScreen);
    dispatch(navigate(nextScreen, params));
  };

  return {appNavigate};
};

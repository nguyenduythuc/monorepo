import { useNavigation, CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  RootParamList,
  ScreenParamEnum,
} from '@lfvn-customer/shared/types/paramtypes';

export const useConfigRouting = () => {
  const { dispatch, goBack } =
    useNavigation<NativeStackNavigationProp<RootParamList>>();
  const navigation = useNavigation();

  const appNavigate = <T extends ScreenParamEnum>(
    nextScreen: T,
    params?: object | undefined,
  ) => {
    if (typeof nextScreen === 'string') {
      dispatch(CommonActions.navigate({ name: nextScreen, params } as any));
    } else {
      throw new Error('Invalid screen type');
    }
  };

  const getEnumNameByValue = (value: string): keyof typeof ScreenParamEnum => {
    return Object.keys(ScreenParamEnum).find(
      key => ScreenParamEnum[key as keyof typeof ScreenParamEnum] === value,
    ) as keyof typeof ScreenParamEnum;
  };

  const getPreviousRoute = () => {
    const state = navigation.getState();
    const routes = state?.routes;
    const previousRoute = routes ? routes[routes.length - 2] : null;

    if (previousRoute) {
      return getEnumNameByValue(previousRoute.name);
    } else {
      return 'Home';
    }
  };

  return { appNavigate, goBack, getPreviousRoute };
};

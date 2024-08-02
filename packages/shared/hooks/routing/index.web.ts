import {useRouter} from 'next/navigation';
import {Platform} from 'react-native';
import {PrimaryNavigatorNavigationProp} from '../../../mobile/src/navigators/RootNavigator';
import {RootParamList} from '../../../mobile/src/types/paramtypes';

export const useConfigRouting = () => {
  const navigation = useRouter();

  const appNavigate = (nextScreen: string) => {
    console.log('nextScreenMobile', nextScreen);
    navigation.push(nextScreen);
  };

  return {appNavigate};
};

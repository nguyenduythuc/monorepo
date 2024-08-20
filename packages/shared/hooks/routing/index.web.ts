import {useRouter} from 'next/navigation';
import {ScreenParamEnum} from '../../../mobile/src/types/paramtypes';

export const useConfigRouting = () => {
  const navigation = useRouter();

  const appNavigate = (
    nextScreen: ScreenParamEnum,
    params?: {[key: string]: string | number | boolean} | undefined,
  ) => {
    if (!params) {
      navigation.push(`${nextScreen}`);
      return;
    } else {
      const queryString = params
        ? '?' + new URLSearchParams(params as Record<string, string>).toString()
        : '';

      navigation.push(`${nextScreen}${queryString}`);
    }
  };

  const goBack = () => {
    navigation.back();
  };

  return {appNavigate, goBack};
};

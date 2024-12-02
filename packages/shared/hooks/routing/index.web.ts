import {useRouter} from 'next/navigation';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';
import {useRef} from 'react';

export const useConfigRouting = () => {
  const navigation = useRouter();
  const previousRouteRef = useRef<string | null>(null);

  const appNavigate = (
    nextScreen: ScreenParamEnum,
    params?: {[key: string]: string | number | boolean} | undefined,
  ) => {
    if (!params) {
      navigation.push(`/${nextScreen}`);
    } else {
      const queryString = new URLSearchParams(
        params as Record<string, string>,
      ).toString();
      navigation.push(`/${nextScreen}?${queryString}`);
    }
  };

  const goBack = () => {
    navigation.back();
  };

  const getPreviousRoute = (): string | null => {
    console.log('previousRouteRef.current', previousRouteRef.current);

    return previousRouteRef.current;
  };

  return {appNavigate, goBack, getPreviousRoute};
};

import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootParamList = {
  home: undefined;
  Test: undefined;
  ComponentScreen: undefined;
  login: undefined;
  'verify-account': {
    type: 'LOGIN_OTP' | 'FORGOT_PASSWORD' | 'SIGN_UP';
  };
  'enter-otp': {
    authSeq: string;
    phoneNumber: string;
    identityNumber: string;
    type: 'LOGIN_OTP' | 'FORGOT_PASSWORD' | 'SIGN_UP';
  };
  'sign-up': undefined;
  SimulateScreen: undefined;
  RepaymentScheduleScreen: undefined;
  ProductIntroductionScreen: undefined;
};

export type RootParamListWeb = {
  'repayment-schedule': undefined;
  'product-introduction': undefined;
  simulate: undefined;
  goBack: undefined;
};

export type LoginScreenNavigationProps = NativeStackNavigationProp<
  RootParamList,
  'login'
>;

export type VerifyAccountScreenNavigationProps = NativeStackNavigationProp<
  RootParamList,
  'verify-account'
>;

export type VerifyAccountScreenRouteProps = RouteProp<
  RootParamList,
  'verify-account'
>;

export type EnterOTPScreenNavigationProps = NativeStackNavigationProp<
  RootParamList,
  'enter-otp'
>;

export type EnterOTPScreenRouteProps = RouteProp<RootParamList, 'enter-otp'>;

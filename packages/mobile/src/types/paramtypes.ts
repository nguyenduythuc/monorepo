import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootParamList = {
  Home: undefined;
  Test: undefined;
  ComponentScreen: undefined;
  Login: undefined;
  VerifyAccount: {
    typpe: 'LOGIN_OTP' | 'FORGOT_PASSWORD';
  };
  EnterOTP: {
    authSeq: string;
    phoneNumber: string;
    identityNumber: string;
  };
  SignUp: undefined;
};

export type LoginScreenNavigationProps = NativeStackNavigationProp<
  RootParamList,
  'Login'
>;

export type VerifyAccountScreenNavigationProps = NativeStackNavigationProp<
  RootParamList,
  'VerifyAccount'
>;

export type EnterOTPScreenNavigationProps = NativeStackNavigationProp<
  RootParamList,
  'EnterOTP'
>;

export type EnterOTPScreenRouteProps = RouteProp<RootParamList, 'EnterOTP'>;

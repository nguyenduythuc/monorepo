import {OTPTypes} from '@lfvn-customer/shared/types';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootParamList = {
  home: undefined;
  Test: undefined;
  ComponentScreen: undefined;
  login: undefined;
  'verify-account': {
    type: OTPTypes;
  };
  'enter-otp': {
    authSeq: string;
    phoneNumber: string;
    identityNumber: string;
    type: OTPTypes;
    newPassword?: string;
  };
  'sign-up': undefined;
  simulate: undefined;
  'repayment-schedule': undefined;
  'product-introduction': undefined;
  'product-detail': {productId: number; productName: string};
  'create-loan-apl': undefined;
  'reset-password': {
    phoneNumber: string;
    identityNumber: string;
  };
};

export enum ScreenParamEnum {
  Home = 'home',
  Test = 'Test',
  ComponentScreen = 'ComponentScreen',
  Login = 'login',
  VerifyAccount = 'verify-account',
  EnterOtp = 'enter-otp',
  SignUp = 'sign-up',
  Simulate = 'simulate',
  RepaymentSchedule = 'repayment-schedule',
  ProductIntroduction = 'product-introduction',
  ProductDetail = 'product-detail',
  CreateLoanApl = 'create-loan-apl',
  ResetPassword = 'reset-password',
}

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

export type ResetPasswordScreenNavigationProps = NativeStackNavigationProp<
  RootParamList,
  'reset-password'
>;

export type ResetPasswordRouteProps = RouteProp<
  RootParamList,
  'reset-password'
>;
export type ProductDetailScreenRouteProps = RouteProp<
  RootParamList,
  'product-detail'
>;

/* eslint-disable sonarjs/no-duplicate-string */
import {OTPTypes} from '@lfvn-customer/shared/types';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootParamList = {
  home: undefined;
  Test: undefined;
  login:
    | {
        deeplinkPath?: string;
      }
    | undefined;
  'verify-account': {
    type: OTPTypes;
  };
  'enter-otp': {
    authSeq: string;
    phoneNumber: string;
    identityNumber: string;
    type: OTPTypes;
    newPassword?: string;
    currentPassword?: string;
    path?: string;
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
  'verify-customer-info': undefined;
  'review-customer-ekyc-info': undefined;
  'success-account-register': undefined;
  precheck: undefined;
  'precheck-fail': undefined;
  'loan-information': undefined;
  'cif-info-pending-check': {
    flowId: string;
    productCode: string;
  };
  'vision-camera': undefined;
  'change-password': {
    phoneNumber: string;
    identityNumber: string;
  };
};

export enum ScreenParamEnum {
  Home = 'home',
  Test = 'Test',
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
  VerifyCustomerInfo = 'verify-customer-info',
  ReviewCustomerEKYCInfo = 'review-customer-ekyc-info',
  SuccessAccountRegister = 'success-account-register',
  Precheck = 'precheck',
  PrecheckFail = 'precheck-fail',
  LoanInformation = 'loan-information',
  CifInfoPendingCheck = 'cif-info-pending-check',
  VisionCamera = 'vision-camera',
  ChangePassword = 'change-password',
}

export type HomeRouteProps = RouteProp<RootParamList, 'home'>;

export type LoginScreenNavigationProps = NativeStackNavigationProp<
  RootParamList,
  'login'
>;

export type LoginPasswordRouteProps = RouteProp<RootParamList, 'login'>;

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

export type ReviewCustomerEKYCInfoScreenRouteProps = RouteProp<
  RootParamList,
  'review-customer-ekyc-info'
>;

export type CifInfoPendingCheckScreenRouteProps = RouteProp<
  RootParamList,
  'cif-info-pending-check'
>;

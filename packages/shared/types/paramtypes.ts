/* eslint-disable sonarjs/no-duplicate-string */
import {OTPTypes} from '@lfvn-customer/shared/types';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {UploadESignForSaleFile} from './services/eSignForSaleTypes';
import {ActionCreatorWithPayload} from '@reduxjs/toolkit';

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
  'success-account-register': {
    phoneNumber: string;
    identityNumber: string;
  };
  precheck: undefined;
  'precheck-fail': undefined;
  'loan-information': undefined;
  'cif-info-pending-check': {
    flowId: string;
    productCode: string;
  };
  'vision-camera': {
    doc: UploadESignForSaleFile;
    setDoc: ActionCreatorWithPayload<UploadESignForSaleFile, string>;
  };
  'change-password': {
    phoneNumber: string;
    identityNumber: string;
  };
  'cif-apl-information': {
    flowId: string;
  };
  'input-additional-information': undefined;
  'rbp-information': undefined;
  'review-loan-offer': undefined;
  'pre-scoring-pending-check': undefined;
  'upload-docs-esign-for-sale': undefined;
  'detail-folder': {
    folderEncoded: string;
  };
  'zoom-rotate-image': {
    uri: string;
  };
  'verify-idcard-esign-for-sale': {
    saleImportId: string;
    tokenEsign: string;
  };
  'check-napas': undefined;
  'verify-idcontract-esign-for-sale': {
    saleImportId: string;
    tokenEsign: string;
  };
  'view-contract-esign-for-sale': {
    uri: string;
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
  CifAndAplInformation = 'cif-apl-information',
  InputAdditionalInformation = 'input-additional-information',
  RBPInformation = 'rbp-information',
  ReviewLoanOffer = 'review-loan-offer',
  PreScoringPendingCheck = 'pre-scoring-pending-check',
  UploadDocsEsignForSale = 'upload-docs-esign-for-sale',
  DetailFolder = 'detail-folder',
  ZoomRotateImage = 'zoom-rotate-image',
  VerifyIdCardEsignForSale = 'verify-idcard-esign-for-sale',
  CheckNapas = 'check-napas',
  VerifyIdContractEsignForSale = 'verify-idcontract-esign-for-sale',
  ViewContractEsignForSale = 'view-contract-esign-for-sale',
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

export type CifAndAplInformationRouteProps = RouteProp<
  RootParamList,
  'cif-apl-information'
>;

export type SuccessAccountRegisterScreenRouteProps = RouteProp<
  RootParamList,
  'success-account-register'
>;

export type DetailFolderScreenRouteProps = RouteProp<
  RootParamList,
  'detail-folder'
>;

export type ZoomRotateImageScreenRouteProps = RouteProp<
  RootParamList,
  'zoom-rotate-image'
>;

export type VerifyIdCardEsignForSaleScreenRouteProps = RouteProp<
  RootParamList,
  'verify-idcard-esign-for-sale'
>;

export type VisionCameraRouteProps = RouteProp<RootParamList, 'vision-camera'>;

export type VerifyIdContractEsignForSaleScreenRouteProps = RouteProp<
  RootParamList,
  'verify-idcontract-esign-for-sale'
>;

export type ViewContractEsignForSaleScreenRouteProps = RouteProp<
  RootParamList,
  'view-contract-esign-for-sale'
>;

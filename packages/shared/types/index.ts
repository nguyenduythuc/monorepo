import {FieldValues, UseFormWatch} from 'react-hook-form';
import {ImageStyle, StyleProp, TextInputProps, TextProps} from 'react-native';
import {IconKeys} from '@lfvn-customer/shared/components';
import {CSSProperties} from 'react';
import ImageName from '../assets/images';

export interface SVGProps {
  color?: string;
  size?: number;
  width?: number;
  height?: number;
  transform?: boolean;
  viewBox?: string;
}

export type ApiTagType = 'Product' | never;

export interface IconProps extends SVGProps {
  name: IconKeys;
  onPress?: () => void;
  disabled?: boolean;
}

export interface ITextInputBaseProps extends TextInputProps {
  touched?: boolean;
  isFocus?: boolean;
  rightComponent?: React.ReactNode;
  leftComponent?: React.ReactNode;
  disabled?: boolean;
  label?: string;
  required?: boolean;
  containerStyle?: string;
  containerInputStyle?: string;
  containerLabelStyle?: string;
  textInputStyle?: string;
  onChangeInput?: (e: string) => void;
  watch?: UseFormWatch<FieldValues>;
  errorMessage?: string;
  unit?: string;
  watchConfirmPassword?: string;
}

export interface ITextInputProps extends ITextInputBaseProps {
  onChangeValue: (value: string) => void;
}

export interface ITextInputDisplayValidationProps extends ITextInputProps {
  validations?: InputValidationKeys[];
  colorIcon?: string;
}

export interface ILabelProps extends TextProps {
  title?: string;
  required?: boolean;
  labelStyle?: string;
  containerStyle?: string;
}

export interface ILabelValidationProps extends ILabelProps {
  validations?: InputValidationKeys[];
  value?: string;
  colors: {[key: string]: string};
}

export interface IErorMsgProps extends TextProps {
  title?: string;
  errorStyle?: string;
  containerErrorStyle?: string;
}

export interface IConfirmModalProps {
  visible: boolean;
  setVisible?: (value: boolean) => void;
  title?: string;
  content?: string;
  renderContent?: React.ReactNode;
  labelButtonLeft?: string | undefined | null;
  onButtonLeftPress?: () => void;
  labelButtonRight?: string | undefined | null;
  renderAction?: React.ReactNode;
  onButtonRightPress?: () => void;
  onPressClose?: () => void;
  singleButton?: boolean;
  textLeftStyle?: string;
  textRightStyle?: string;
  buttonRightStyle?: string;
  buttonLeftStyle?: string;
  disabled?: boolean;
  disabledPressBackdrop?: boolean;
}

export interface ICongratulationModalProps {
  visible: boolean;
  setVisible?: (value: boolean) => void;
  onButtonAgreePress?: () => void;
  onButtonCancelPress?: () => void;
  loanAmount?: number;
  interestRate?: number;
}

export interface IImageProps {
  iconName: keyof typeof ImageName;
  style?: CSSProperties | StyleProp<ImageStyle> | string;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  type?: 'svg' | 'png' | 'gif';
}

export interface IImageBackgroundProps extends IImageProps {
  children: React.ReactNode;
}

export enum OTPTypesEnum {
  LOGIN_OTP = 'LOGIN_OTP',
  RESET_PASSWORD = 'RESET_PASSWORD',
  SIGN_UP = 'SIGN_UP',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
  VERIFY_CUSTOMER_BEFORE_LOAN = 'VERIFY_CUSTOMER_BEFORE_LOAN',
  ESIGN = 'ESIGN',
  CONFIRM_ESIGN = 'CONFIRM_ESIGN',
}

export type OTPTypes =
  | OTPTypesEnum.LOGIN_OTP
  | OTPTypesEnum.RESET_PASSWORD
  | OTPTypesEnum.SIGN_UP
  | OTPTypesEnum.CHANGE_PASSWORD
  | OTPTypesEnum.VERIFY_CUSTOMER_BEFORE_LOAN
  | OTPTypesEnum.ESIGN
  | OTPTypesEnum.CONFIRM_ESIGN;

export enum InputValidationKeys {
  STRING_LENGTH_FROM_8_TO_15_CHARACTERS = 'STRING_LENGTH_FROM_8_TO_15_CHARACTERS',
  STRING_INCLUDE_UPPER_CASE_AND_LOWER_CASE = 'STRING_INCLUDE_UPPER_CASE_AND_LOWER_CASE',
  STRING_INCLUDE_NUMBER_AND_SPECIAL_CHARACTER = 'STRING_INCLUDE_NUMBER_AND_SPECIAL_CHARACTER',
}

export enum CardTypesEnum {
  CCCD = 'cccd',
  CMND = 'cmnd',
  CMQD = 'cmqd',
  PASS_PORT = 'passport',
}

export enum GenderEnum {
  MALE = 'male',
  FEMALE = 'female',
}

export enum RequestPendingStepEnum {
  PRE_CHECK = 'PRE_CHECK',
  LOAN_INFORMATION = 'LOAN_INFORMATION',
  VERIFY_INFORMATION = 'VERIFY_INFORMATION',
  UPLOAD_DOCUMENT = 'UPLOAD_DOCUMENT',
  INPUT_PROFILE_INFORMATION = 'INPUT_PROFILE_INFORMATION',
  DISBURSEMENT = 'DISBURSEMENT',
}

export enum PreCheckStatusEnum {
  PROCESSING = 'PROCESSING',
  DONE = 'DONE',
  ERROR = 'ERROR',
}

export interface IStepTabViewProps {
  questionComponents: React.ComponentType<any>[];
  currentQuestion: number;
  setCurrentQuestion: (value: number) => void;
  selectedLoanProduct?: string; // check the condition to show the question
}

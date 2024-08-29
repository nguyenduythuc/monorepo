import {FieldValues, UseFormWatch} from 'react-hook-form';
import {
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TextInputProps,
  TextProps,
} from 'react-native';
import {IconKeys} from '@lfvn-customer/shared/components';
import {CSSProperties} from 'react';

export interface SVGProps {
  color?: string;
  size?: number;
  width?: number;
  height?: number;
  transform?: boolean;
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
}

export interface IImageProps {
  source: {
    android: string;
    ios: ImageSourcePropType;
    web: string;
  };
  style?: CSSProperties | StyleProp<ImageStyle> | string;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
}

export enum OTPTypesEnum {
  LOGIN_OTP = 'LOGIN_OTP',
  RESET_PASSWORD = 'RESET_PASSWORD',
  SIGN_UP = 'SIGN_UP',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
  VERIFY_CUSTOMER_BEFORE_LOAN = 'VERIFY_CUSTOMER_BEFORE_LOAN',
}

export type OTPTypes =
  | OTPTypesEnum.LOGIN_OTP
  | OTPTypesEnum.RESET_PASSWORD
  | OTPTypesEnum.SIGN_UP
  | OTPTypesEnum.CHANGE_PASSWORD
  | OTPTypesEnum.VERIFY_CUSTOMER_BEFORE_LOAN;

export enum InputValidationKeys {
  STRING_LENGTH_FROM_8_TO_15_CHARACTERS = 'STRING_LENGTH_FROM_8_TO_15_CHARACTERS',
  STRING_INCLUDE_UPPER_CASE_AND_LOWER_CASE = 'STRING_INCLUDE_UPPER_CASE_AND_LOWER_CASE',
  STRING_INCLUDE_NUMBER_AND_SPECIAL_CHARACTER = 'STRING_INCLUDE_NUMBER_AND_SPECIAL_CHARACTER',
}

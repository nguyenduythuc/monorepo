import {UseFormWatch} from 'react-hook-form';
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
  watch: UseFormWatch<any>;
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
  colorIcon?: string;
  validations?: InputValidationKeys[];
}

export interface IErorMsgProps extends TextProps {
  title?: string;
  errorStyle?: string;
  containerErrorStyle?: string;
}

export interface IConfirmModalProps {
  visiable: boolean;
  setVisiable?: (value: boolean) => void;
  title?: string;
  content?: string;
  labelButton1?: string;
  onButton1Press?: () => void;
  labelButton2?: string;
  onButton2Press?: () => void;
  onPressClose?: () => void;
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
}

export type OTPTypes =
  | OTPTypesEnum.LOGIN_OTP
  | OTPTypesEnum.RESET_PASSWORD
  | OTPTypesEnum.SIGN_UP
  | OTPTypesEnum.CHANGE_PASSWORD;

export enum InputValidationKeys {
  ONLY_NUMBER_FLOAT = 'ONLY_NUMBER_FLOAT',
  STRING_LENGTH_FROM_8_TO_15_CHARACTERS = 'STRING_LENGTH_FROM_8_TO_15_CHARACTERS',
  STRING_INCLUDE_UPPER_CASE_AND_LOWER_CASE = 'STRING_INCLUDE_UPPER_CASE_AND_LOWER_CASE',
  STRING_INCLUDE_NUMBER_AND_SPECIAL_CHARACTER = 'STRING_INCLUDE_NUMBER_AND_SPECIAL_CHARACTER',
}

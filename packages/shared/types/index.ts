import {UseFormWatch} from 'react-hook-form';
import {TextInputProps, TextProps} from 'react-native';
import {IconKeys} from '../components';

export interface SVGProps {
  color?: string;
  size?: number;
  width?: number;
  height?: number;
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
  watch?: UseFormWatch<any>;
  errorMessage?: string;
  unit?: string;
}

export interface ITextInputProps extends ITextInputBaseProps {
  onChangeValue: (value: string) => void;
}

export interface ILabelProps extends TextProps {
  title?: string;
  required?: boolean;
  labelStyle?: string;
  containerStyle?: string;
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

import {TextInputProps, TextProps, TextInput} from 'react-native';
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
  error?: string;
  focus?: boolean;
  rightComponent?: React.ReactNode;
  leftComponent?: React.ReactNode;
  disabled?: boolean;
  label?: string;
  required?: boolean;
  containerStyle?: string;
  containerInputStyle?: string;
  containerLabelStyle?: string;
}

export interface ITextInputProps extends ITextInputBaseProps {
  onPressRightComponent?: () => void;
  onPressLeftComponent?: () => void;
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

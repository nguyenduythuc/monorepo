import {TextInputProps} from 'react-native';

export interface ITextInputProps extends TextInputProps {
  touched?: boolean;
  error?: string;
  rightComponent?: React.ReactNode;
  leftComponent?: React.ReactNode;
  disabled?: boolean;
}

import {UseControllerProps} from 'react-hook-form';
import {KeyboardTypeOptions} from 'react-native';

export enum FieldType {
  TextInput = 'TextInput',
  TextInputSearch = 'TextInputSearch',
}

export type FieldConfig = {
  label?: string;
  disabled?: boolean;
  type?: FieldType;
  controlProps: UseControllerProps;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  containerStyle?: string;
};

export type FormProps = {
  fields: FieldConfig[];
  defaultValues?: any;
};

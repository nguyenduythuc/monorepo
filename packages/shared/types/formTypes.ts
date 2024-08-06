import {UseControllerProps} from 'react-hook-form';
import {KeyboardTypeOptions} from 'react-native';
import {IconKeys} from '@lfvn-customer/shared/components';
import {dropdownOptionProduct} from './components/dropdown';

export enum FieldType {
  TextInput = 'TextInput',
  TextInputSearch = 'TextInputSearch',
  SliderWithTextInput = 'SliderWithTextInput',
  SimulateLoanAmount = 'SimulateLoanAmount',
  SimulateTenor = 'SimulateTenor',
  SelectDropdown = 'SelectDropdown',
  CheckboxWithIcon = 'CheckboxWithIcon',
}

export type FieldConfig = {
  label?: string;
  disabled?: boolean;
  type?: FieldType;
  controlProps: UseControllerProps;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  containerStyle?: string;
  textInputStyle?: string;
  secureTextEntry?: boolean;
  leftComponent?: React.ReactNode;
  maxValue?: number;
  minValue?: number;
  unit?: string;
  step?: number;
  defaultValue?: string;
  options?: dropdownOptionProduct[];
  description?: string;
  iconName?: IconKeys;
  iconColor?: string;
  isChecked?: boolean;
  checkboxColor?: string;
};

export type FormProps = {
  fields: FieldConfig[];
  defaultValues?: any;
};

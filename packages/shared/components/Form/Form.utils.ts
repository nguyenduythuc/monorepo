import {validateOnlyNumberFloat} from '../../hooks/validations';
import {FieldConfig, FieldType} from '../../types/formTypes';

export const FieldTestConfig: Record<string, FieldConfig> = {
  TestInput: {
    label: 'Input Test',
    controlProps: {
      name: 'testInput',
      rules: {
        required: 'This field is required',
        validate: (value: string) =>
          validateOnlyNumberFloat(value) || 'This field must be a number',
      },
    },
    type: FieldType.TextInput,
    keyboardType: 'numeric',
    placeholder: 'Type Something',
    containerStyle: 'mt-4',
  },
  TextInput: {
    label: 'Input Test',
    controlProps: {
      name: 'testInput',
      rules: {
        required: 'This field is required',
        validate: (value: string) =>
          validateOnlyNumberFloat(value) || 'This field must be a number',
      },
    },
    type: FieldType.TextInput,
    keyboardType: 'numeric',
    placeholder: 'Type Something',
    containerStyle: 'mt-4',
  },
  SearchTestInput: {
    label: 'Search Input Test',
    controlProps: {
      name: 'searchTestInput',
      rules: {
        required: 'This field is required',
      },
    },
    type: FieldType.TextInputSearch,
    placeholder: 'Search Something',
    containerStyle: 'mt-4',
  },
  Account: {
    label: 'Login.account',
    controlProps: {
      name: 'username',
      rules: {
        required: 'This field is required',
      },
    },
    type: FieldType.TextInput,
    placeholder: 'Login.accountPlaceholder',
    containerStyle: 'mt-4',
  },
  Password: {
    label: 'Login.password',
    controlProps: {
      name: 'password',
      rules: {
        required: 'This field is required',
      },
    },
    type: FieldType.TextInput,
    placeholder: 'Login.passwordPlaceholder',
    containerStyle: 'mt-4',
    secureTextEntry: true,
  },
};

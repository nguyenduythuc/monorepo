import React from 'react';
import {validateOnlyNumberFloat} from '../../hooks/validations';
import {FieldConfig, FieldType} from '../../types/formTypes';
import {Icon} from '../common';

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
  ConfirmPassword: {
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
  PhoneNumber: {
    label: '',
    controlProps: {
      name: 'phoneNumber',
      rules: {
        required: 'This field is required',
        validate: (value: string) =>
          validateOnlyNumberFloat(value) || 'This field must be a number',
      },
    },
    type: FieldType.TextInput,
    keyboardType: 'numeric',
    placeholder: 'VerifyAccount.phonenumberPlaceholder',
    containerStyle: 'mt-4',
    textInputStyle: 'text-xl font-medium',
    leftComponent: <Icon name="smart-phone" size={24} />,
  },
  IdCard: {
    label: '',
    controlProps: {
      name: 'idCard',
      rules: {
        required: 'This field is required',
        validate: (value: string) =>
          validateOnlyNumberFloat(value) || 'This field must be a number',
      },
    },
    type: FieldType.TextInput,
    keyboardType: 'numeric',
    placeholder: 'VerifyAccount.idCardPlacegholder',
    containerStyle: 'mt-4',
    textInputStyle: 'text-xl font-medium',
    leftComponent: <Icon name="id-card" size={24} />,
  },
  SignUpFullName: {
    label: 'SignUp.fullname',
    controlProps: {
      name: 'fullname',
      rules: {
        required: 'This field is required',
      },
    },
    type: FieldType.TextInput,
    placeholder: 'SignUp.fullnamePlaceholder',
    containerStyle: 'mt-4',
  },
  SignUpPhoneNumber: {
    label: 'SignUp.phonenumber',
    controlProps: {
      name: 'phoneNumber',
      rules: {
        required: 'This field is required',
      },
    },
    type: FieldType.TextInput,
    placeholder: 'SignUp.phonenumberPlaceholder',
    containerStyle: 'mt-4',
  },
  SignUpPersonalCard: {
    label: 'SignUp.idCard',
    controlProps: {
      name: 'idCard',
      rules: {
        required: 'This field is required',
      },
    },
    type: FieldType.TextInput,
    placeholder: 'SignUp.idCardPlaceholder',
    containerStyle: 'mt-4',
  },
};

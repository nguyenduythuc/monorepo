import React from 'react';
import {validateOnlyNumberFloat} from '@lfvn-customer/shared/hooks/validations';
import {FieldConfig, FieldType} from '@lfvn-customer/shared/types/formTypes';
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

export const FieldSimulateConfig: Record<string, FieldConfig> = {
  SimulateLoanAmount: {
    label: 'Simulate.loanAmount',
    maxValue: 5000000,
    minValue: 3000000,
    step: 100000,
    // defaultValue: '4000000',
    unit: 'VND',
    controlProps: {
      name: 'simulateLoanAmount',
      rules: {},
    },
    type: FieldType.SliderWithTextInput,
    containerStyle: '',
  },
  SimulateTenor: {
    label: 'Simulate.tenor',
    maxValue: 36,
    minValue: 6,
    step: 1,
    defaultValue: '18',
    unit: 'tháng',
    controlProps: {
      name: 'simulateTenor',
      rules: {},
    },
    type: FieldType.SliderWithTextInput,
    containerStyle: '',
  },
  SimulateLoanProduct: {
    label: 'Simulate.loanProduct',
    type: FieldType.SelectDropdown,
    controlProps: {
      name: 'simulateLoanProduct',
      rules: {},
    },
  },
  SimulateLoanPurpose: {
    label: 'Simulate.loanPurpose',
    type: FieldType.SelectDropdown,
    controlProps: {
      name: 'simulatePurpose',
      rules: {},
    },
  },
  SimulateLoanInsurance: {
    label: 'Tham gia bảo hiểm khoản vay',
    description: 'Bảo hiểm An tâm Tài chính 600.000đ',
    checkboxColor: 'red',
    iconName: 'info-icon',
    type: FieldType.CheckboxWithIcon,
    controlProps: {
      name: 'insurance',
      rules: {},
    },
  },
};

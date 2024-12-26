/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import {
  REGEX,
  validateIdentityNumber,
  validateOnlyNumberFloat,
  validateStringIncludeUpperCaseAndLowerCase,
  validateStringInlcudeNumberAndSpecialCharacter,
  validateStringLengthFrom8To15Characters,
} from '@lfvn-customer/shared/hooks/validations';
import {FieldConfig, FieldType} from '@lfvn-customer/shared/types/formTypes';
import {Icon} from '@lfvn-customer/shared/components/common';
import {InputValidationKeys} from '@lfvn-customer/shared/types';

export const FieldTestConfig: Record<string, FieldConfig> = {
  TestInput: {
    label: 'Input Test',
    controlProps: {
      name: 'testInput',
      rules: {
        required: 'Validation.fieldIsRequirement',
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
        required: 'Validation.fieldIsRequirement',
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
        required: 'Validation.fieldIsRequirement',
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
        required: 'Validation.fieldIsRequirement',
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
        required: 'Validation.fieldIsRequirement',
      },
    },
    type: FieldType.TextInput,
    placeholder: 'Login.passwordPlaceholder',
    containerStyle: 'mt-4',
    secureTextEntry: true,
  },
  ConfirmPassword: {
    label: 'ResetPassword.confirmPassword',
    controlProps: {
      name: 'confirmPassword',
      rules: {
        required: 'Validation.fieldIsRequirement',
      },
    },
    type: FieldType.TextInput,
    placeholder: 'ResetPassword.confirmPasswordPlaceholder',
    secureTextEntry: true,
  },
  CurrentPassword: {
    label: 'ChangePassword.currentPassword',
    controlProps: {
      name: 'currentPassword',
      rules: {
        required: 'Validation.fieldIsRequirement',
      },
    },
    type: FieldType.TextInput,
    placeholder: 'ChangePassword.currentPassword',
    containerStyle: 'mt-4',
    secureTextEntry: true,
  },
  PhoneNumber: {
    label: '',
    controlProps: {
      name: 'phoneNumber',
      rules: {
        required: 'Validation.fieldIsRequirement',
        pattern: {
          value: REGEX.phone,
          message: 'Validation.phonenumber',
        },
        validate: (value: string) => {
          if (!validateOnlyNumberFloat(value)) {
            return 'Validation.mustBeANumber';
          }
        },
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
        required: 'Validation.fieldIsRequirement',
        validate: (value: string) => {
          if (!validateOnlyNumberFloat(value)) {
            return 'Validation.mustBeANumber';
          }
          if (!validateIdentityNumber(value)) {
            return 'Validation.idCard';
          }
        },
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
        required: 'Validation.fieldIsRequirement',
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
        required: 'Validation.fieldIsRequirement',
        pattern: {
          value: REGEX.phone,
          message: 'Validation.phonenumber',
        },
        validate: (value: string) => {
          if (!validateOnlyNumberFloat(value)) {
            return 'Validation.mustBeANumber';
          }
        },
      },
    },
    keyboardType: 'numeric',
    type: FieldType.TextInput,
    placeholder: 'SignUp.phonenumberPlaceholder',
    containerStyle: 'mt-4',
  },
  SignUpPersonalCard: {
    label: 'SignUp.idCard',
    controlProps: {
      name: 'idCard',
      rules: {
        required: 'Validation.fieldIsRequirement',
        validate: (value: string) => {
          if (!validateOnlyNumberFloat(value)) {
            return 'Validation.mustBeANumber';
          }
          if (!validateIdentityNumber(value)) {
            return 'Validation.idCard';
          }
        },
      },
    },
    type: FieldType.TextInput,
    keyboardType: 'numeric',
    placeholder: 'SignUp.idCardPlaceholder',
    containerStyle: 'mt-4',
  },
  NewPassword: {
    label: 'ResetPassword.newPassword',
    controlProps: {
      name: 'newPassword',
      rules: {
        required: 'Validation.fieldIsRequirement',
        validate: (value: string) => {
          if (!validateStringLengthFrom8To15Characters(value)) {
            return 'ResetPassword.msgLengthPassFrom8To15Characters';
          }
          if (!validateStringIncludeUpperCaseAndLowerCase(value)) {
            return 'ResetPassword.msgPasswordNotIncludeUpperCaseAndLowerCase';
          }
          if (!validateStringInlcudeNumberAndSpecialCharacter(value)) {
            return 'ResetPassword.msgPasswordNotIncludeNumberAndSpecialCharacter';
          }
        },
      },
    },
    type: FieldType.TextInputDisplayValidation,
    placeholder: 'ResetPassword.newPasswordPlaceholder',
    containerStyle: 'mt-4',
    validations: [
      InputValidationKeys.STRING_LENGTH_FROM_8_TO_15_CHARACTERS,
      InputValidationKeys.STRING_INCLUDE_UPPER_CASE_AND_LOWER_CASE,
      InputValidationKeys.STRING_INCLUDE_NUMBER_AND_SPECIAL_CHARACTER,
    ],
    secureTextEntry: true,
  },
};

export const FieldVerifyAccount: Record<string, FieldConfig> = {
  IdCard: {
    label: '',
    controlProps: {
      name: 'idCard',
      rules: {
        required: 'Validation.fieldIsRequirement',
        validate: (value: string) => {
          if (!validateOnlyNumberFloat(value)) {
            return 'Validation.mustBeANumber';
          }
          if (!validateIdentityNumber(value)) {
            return 'Validation.idCard';
          }
        },
      },
    },
    type: FieldType.TextInput,
    keyboardType: 'numeric',
    placeholder: 'VerifyAccount.idCardPlacegholder',
    containerStyle: 'mt-4',
    textInputStyle: 'text-xl font-medium',
    leftComponent: <Icon name="id-card" size={24} />,
  },
  IdType: {
    label: 'VerifyAccount.idCard',
    type: FieldType.SelectDropdown,
    controlProps: {
      name: 'IdType',
      rules: {},
    },
    placeholder: 'VerifyAccount.chooseIdType',
    disabled: true,
    leftComponent: <Icon name="id-card" size={24} />,
  },
  PhoneNumber: {
    label: '',
    controlProps: {
      name: 'phoneNumber',
      rules: {
        required: 'Validation.fieldIsRequirement',
        pattern: {
          value: REGEX.phone,
          message: 'Validation.phonenumber',
        },
        validate: (value: string) => {
          if (!validateOnlyNumberFloat(value)) {
            return 'Validation.mustBeANumber';
          }
        },
      },
    },
    type: FieldType.TextInput,
    keyboardType: 'numeric',
    placeholder: 'VerifyAccount.phonenumberPlaceholder',
    containerStyle: 'mt-4',
    textInputStyle: 'text-xl font-medium',
    leftComponent: <Icon name="smart-phone" size={24} />,
  },
};

export const FieldESignForSale: Record<string, FieldConfig> = {
  ESignPhoneNumber: {
    label: 'ESign.phonenumber',
    controlProps: {
      name: 'phoneNumber',
      rules: {
        required: 'Validation.fieldIsRequirement',
        pattern: {
          value: REGEX.phone,
          message: 'Validation.phonenumber',
        },
        validate: (value: string) => {
          if (!validateOnlyNumberFloat(value)) {
            return 'Validation.mustBeANumber';
          }
        },
      },
    },
    keyboardType: 'numeric',
    type: FieldType.TextInput,
    placeholder: 'ESign.phonenumberPlaceholder',
    containerStyle: 'mt-4',
  },
  ESignPersonalCard: {
    label: 'ESign.idCard',
    controlProps: {
      name: 'idCard',
      rules: {
        required: 'Validation.fieldIsRequirement',
        validate: (value: string) => {
          if (!validateOnlyNumberFloat(value)) {
            return 'Validation.mustBeANumber';
          }
          if (!validateIdentityNumber(value)) {
            return 'Validation.idCard';
          }
        },
      },
    },
    type: FieldType.TextInput,
    keyboardType: 'numeric',
    placeholder: 'ESign.idCardPlaceholder',
    containerStyle: 'mt-4',
  },
};

export const FieldCheckNapas: Record<string, FieldConfig> = {
  CheckNapasBankList: {
    label: 'ProfileInformation.bankName',
    type: FieldType.SelectDropdown,
    controlProps: {
      name: 'bankName',
      rules: {required: 'Validation.fieldIsRequirement'},
    },
    placeholder: 'CheckNapas.chooseBank',
  },
  CheckNapasBankAccount: {
    label: 'CheckNapas.accountNumber',
    controlProps: {
      name: 'bankAccount',
      rules: {
        required: 'Validation.fieldIsRequirement',
        validate: (value: string) => {
          if (!validateOnlyNumberFloat(value)) {
            return 'Validation.mustBeANumber';
          }
        },
      },
    },
    type: FieldType.TextInput,
    keyboardType: 'numeric',
    placeholder: 'CheckNapas.accountNumberPlaceholder',
    containerStyle: 'mt-4',
    // textInputStyle: 'text-xl font-medium',
  },
  CheckNapasAccountName: {
    label: 'CheckNapas.accountName',
    controlProps: {
      name: 'accountName',
      rules: {
        required: 'Validation.fieldIsRequirement',
      },
    },
    type: FieldType.TextInput,
    placeholder: 'CheckNapas.accountNamePlaceholder',
    containerStyle: 'mt-4',
  },
  CheckNapasAccountBranch: {
    label: 'CheckNapas.accountBranch',
    controlProps: {
      name: 'accountBranch',
    },
    type: FieldType.TextInput,
    placeholder: 'CheckNapas.accountBranchPlaceholder',
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
      rules: {required: 'Validation.fieldIsRequirement'},
    },
    type: FieldType.SliderWithTextInput,
    containerStyle: '',
  },
  SimulateLoanProduct: {
    label: 'Simulate.loanProduct',
    type: FieldType.SelectDropdown,
    controlProps: {
      name: 'simulateLoanProduct',
      rules: {required: 'Validation.fieldIsRequirement'},
    },
    placeholder: 'Simulate.chooseLoanProduct',
  },
  SimulateLoanPurpose: {
    label: 'Simulate.loanPurpose',
    type: FieldType.SelectDropdown,
    controlProps: {
      name: 'simulatePurpose',
      rules: {required: 'Validation.fieldIsRequirement'},
    },
    placeholder: 'Simulate.chooseLoanPurpose',
  },
  SimulateLoanInsurance: {
    label: 'Tham gia bảo hiểm khoản vay',
    description: 'Bảo hiểm An tâm Tài chính 600.000đ',
    checkboxColor: 'red',
    iconName: 'info-icon',
    type: FieldType.CheckboxWithIcon,
    controlProps: {
      name: 'insuranceConfirm',
      rules: {required: 'Validation.fieldIsRequirement'},
    },
  },
};

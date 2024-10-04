import {KeyboardTypeOptions} from 'react-native';
import {IconKeys} from '@lfvn-customer/shared/components';
import {dropdownOptionProduct} from '../components/dropdown';

export enum AnswerType {
  Input = 'input',
  SelectOption = 'select-option',
  DropdownOption = 'dropdown-option',
  Checkbox = 'checkbox',
  Slider = 'slider',
  RadioButton = 'radio-button',
}

export enum LoanInformationAnswerName {
  LoanProduct = 'schemeCode',
  LoanAmount = 'amount',
  LoanTenor = 'loanTerm',
  LoanInsurance = 'participateInLoanInsurance',
  LoanIncomePerMonth = 'incomePerMonth',
  LoanPurpose = 'loanPurpose',
}

export interface AnswerProps {
  type: AnswerType;
  name: LoanInformationAnswerName;
  title: string;
  description?: string;
  required?: boolean;
  value?: string | dropdownOptionProduct | boolean | number;
  validate?: (value: string) => string | undefined;
  unit?: string;
  options?: dropdownOptionProduct[];
  minValue?: number;
  maxValue?: number;
  defaultValue?: string;
  step?: number;
  iconCheckboxColor?: string;
  iconCheckboxName?: IconKeys;
  checkboxColor?: string;
  keyboardType?: KeyboardTypeOptions;
  disabled?: boolean;
  placeholder?: string;
}

export interface Question {
  title: string;
  description?: string;
  answers: AnswerProps[];
  condition?: (selectedLoanProduct: string) => boolean; // The condition to show this question
}

export interface StepProps {
  id: number;
  name: string;
  description?: string;
  questions?: Question[];
}

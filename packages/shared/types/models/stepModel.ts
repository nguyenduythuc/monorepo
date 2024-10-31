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
  CalenderDatePicker = 'calender-date-picker',
  AddressInputModal = 'address-input-modal',
}

export enum LoanInformationAnswerName {
  LoanProduct = 'schemeCode',
  LoanAmount = 'amount',
  LoanTenor = 'loanTerm',
  LoanInsurance = 'participateInLoanInsurance',
  LoanIncomePerMonth = 'incomePerMonth',
  LoanPurpose = 'loanPurpose',
  LoanPreviousCompanyWorkingTime = 'loanPreviousCompanyWorkingTime',
  LoanInsuranceDuration = 'loanInsuranceDuration',
  LoanMarriedStatus = 'loanMarriedStatus',
  LoanResidentAddress = 'loanResidentAddress',
  LoanResidentAddressType = 'loanResidentAddressType',
  LoanResidentAddressDuration = 'loanResidentAddressDuration',
  LoanCustomerOccupation = 'loanOccupation',
}

export enum InputAdditionalInfo {
  OtherIdDoc = 'otherIdDoc',
  OtherIdType = 'otherIdType',
  HouseholdBookAddressType = 'householdBookAddressType',
  HouseholdBookAddress = 'householdBookAddress',
  HouseholdBookAddressDuration = 'householdBookAddressDuration',
  JobInformation = 'jobInformation',
  CompanyType = 'companyInformation',
  CompanyName = 'companyName',
  CompanyWorkingTime = 'companyWorkingTime',
  CompanyAddress = 'companyAddress',
  ReferralContactName = 'referralContactName',
  ReferralContactPhoneNumber = 'referralContactPhoneNumber',
  ReferralRelationship = 'referralRelationship',
  BeneficiaryBank = 'beneficiaryBank',
  BeneficiaryFullName = 'beneficiaryFullName',
  BeneficiaryAccount = 'beneficiaryAccount',
}

export interface AnswerProps {
  type: AnswerType;
  name: LoanInformationAnswerName | InputAdditionalInfo;
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
  flexStyle?: string;
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

// import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
// const t = useTranslations()

export type ekycDataType = {
  idNumber?: string;
  dob?: string;
  doi?: string;
  dueDate?: string;
  fullname?: string;
  givenPlace?: string;
  origin?: string;
  address?: string;
  documentNumber?: string;
  ethnicity?: string;
  fatherName?: string;
  gender?: string;
  identifyingCharacteristics?: string;
  motherName?: string;
  nationality?: string;
  passportNumber?: string;
  placeOfBirth?: string;
  spouseName?: string;
  oldIdNumber?: string;
  marriedStatus?: string;
  province?: string;
  district?: string;
  ward?: string;
  detailAdd?: string;
  occupation?: string;
  monthlyIncome?: string;
  companyName?: string;
  companyWork?: string;
  referralRelationship?: string;
  bankName?: string;
  bankAccountNum?: string;
  bankAccountName?: string;
  phoneNumber?: string;
  loanProduct?: string;
  loanAmount?: string;
  loanTenor?: string;
  interestMonthly?: string;
  interestRate?: string;
  loanInsuranceFee?: string;
};

export type profileInformationType = {
  untitled?: ekycDataType;
  residenceAddress?: ekycDataType;
  registerAddress?: ekycDataType;
  occupationInformation?: ekycDataType;
  workPlaceInformation?: ekycDataType;
  companyAddress?: ekycDataType;
  referralContact?: ekycDataType;
  beneficiary?: ekycDataType;
  // loanOffer?: ekycDataType
};

export const mapProfileInformationValue = {
  residenceAddress: 'ProfileInformation.residenceAddress',
  registerAddress: 'ProfileInformation.registerAddress',
  occupationInformation: 'ProfileInformation.occupationInformation',
  workPlaceInformation: 'ProfileInformation.workPlaceInformation',
  companyAddress: 'ProfileInformation.companyAddress',
  referralContact: 'ProfileInformation.referralContact',
  beneficiary: 'ProfileInformation.beneficiary',
};

export type webEkycDetailObject = {value: string};

export type webEkycDataType = {
  id_number?: webEkycDetailObject;
  id_old_number?: webEkycDetailObject;
  dob?: webEkycDetailObject;
  doi?: webEkycDetailObject;
  due_date?: webEkycDetailObject;
  name?: webEkycDetailObject;
  ethnicity?: webEkycDetailObject;
  gender?: {name: string};
  nationality?: webEkycDetailObject;
  id_origin?: webEkycDetailObject;
  id_address?: webEkycDetailObject;
} | null;

export const mapEkycKeyValue = {
  idNumber: 'VerifyCustomer.idNumber',
  fullname: 'VerifyCustomer.fullname',
  doi: 'VerifyCustomer.doi',
  dob: 'VerifyCustomer.dob',
  ethnicity: 'VerifyCustomer.ethnicity',
  fatherName: 'VerifyCustomer.fatherName',
  gender: 'VerifyCustomer.gender',
  identifyingCharacteristics: 'VerifyCustomer.identifyingCharacteristics',
  motherName: 'VerifyCustomer.motherName',
  nationality: 'VerifyCustomer.nationality',
  passportNumber: 'VerifyCustomer.passportNumber',
  placeOfBirth: 'VerifyCustomer.placeOfBirth',
  spouseName: 'VerifyCustomer.spouseName',
  dueDate: 'VerifyCustomer.dueDate',
  documentNumber: 'VerifyCustomer.documentNumber',
  origin: 'VerifyCustomer.origin',
  address: 'VerifyCustomer.address',
  oldIdNumber: 'VerifyCustomer.oldIdNumber',
  givenPlace: 'VerifyCustomer.givenPlace',
  rawImage: 'VerifyCustomer.rawImage',
  marriedStatus: 'VerifyCustomer.marriedStatus',
  province: 'ProfileInformation.province',
  district: 'ProfileInformation.district',
  ward: 'ProfileInformation.ward',
  detailAdd: 'ProfileInformation.detailAdd',
  occupation: 'ProfileInformation.occupation',
  monthlyIncome: 'ProfileInformation.monthlyIncome',
  companyName: 'ProfileInformation.companyName',
  companyWork: 'ProfileInformation.workplace',
  referralRelationship: 'ProfileInformation.referralRelationship',
  bankName: 'ProfileInformation.bankName',
  bankAccountNum: 'ProfileInformation.bankAccountNum',
  bankAccountName: 'ProfileInformation.bankAccountName',
  phoneNumber: 'ProfileInformation.phoneNumber',
  loanProduct: 'ReviewLoanOffer.loanProduct',
  loanAmount: 'ReviewLoanOffer.loanAmount',
  loanTenor: 'ReviewLoanOffer.loanTenor',
  interestMonthly: 'ReviewLoanOffer.interestMonthly',
  interestRate: 'ReviewLoanOffer.interestRate',
  loanInsuranceFee: 'ReviewLoanOffer.loanInsuranceFee',
};

export type NFCResultType = {
  code: number;
  errorMessage: string;
  nfcInfo: string;
  nfcData: string;
};

export type OCRResultType = {
  clientId: string;
  errorMessage: string;
  code: number;
  decision: object;
  idInfo: ekycDataType;
  rawImage?: {
    selfie?: string;
    front?: string;
    back?: string;
  };
};

export type WebOCRResultType = {
  clientId: string;
  errorMessage: string;
  code: number;
  decision: object;
  idInfo: webEkycDataType;
  ekycResult: {kyc_result: {back: {given_date: {value: string}}}};
  rawImage?: {
    selfie?: string;
    front?: string;
    back?: string;
  };
};

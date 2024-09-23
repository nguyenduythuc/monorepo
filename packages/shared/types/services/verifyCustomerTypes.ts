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
} | null;

export type webEkycDetailObject = { value: string }

export type webEkycDataType = {
  id_number?: webEkycDetailObject;
  id_old_number?: webEkycDetailObject;
  dob?: webEkycDetailObject;
  doi?: webEkycDetailObject;
  due_date?: webEkycDetailObject;
  name?: webEkycDetailObject;
  ethnicity?: webEkycDetailObject;
  gender?: { name: string };
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
};

export type NFCResultType = {
  code: number;
  errorMessage: string;
  nfcInfo: string;
};

export type OCRResultType = {
  clientId: string;
  errorMessage: string;
  code: number;
  decision: object;
  idInfo: ekycDataType;
};

export type WebOCRResultType = {
  clientId: string;
  errorMessage: string;
  code: number;
  decision: object;
  idInfo: webEkycDataType;
  ekycResult: { kyc_result: { back: { given_date: { value: string } } } };
};
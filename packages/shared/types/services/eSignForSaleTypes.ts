import {OTPTypes} from '@lfvn-customer/shared/types';
import {FileProps} from '../models/loanModel';

export enum ESignForSaleDocType {
  CARD = 'docIdCard',
  SELFIE = 'docSelfie',
  ADDRESS = 'docGtct',
  DEGREE = 'docVb',
  RESUME = 'docSyll',
  BANK_INFO = 'docBank',
}

export interface UploadESignForSaleFile {
  title: string;
  type: ESignForSaleDocType;
  links: {
    id: string;
    uri: string;
  }[];
}

export interface UploadFile {
  file: Blob;
  fileName: string;
}

export interface SaleimportDocsUploadWebRequestProps {
  saleImportId: string;
  idCardNumber: string;
  docIdCard: UploadFile;
  docSelfie: UploadFile;
  docGtct: UploadFile;
  docVb: UploadFile;
  docSyll: UploadFile;
  docBank: UploadFile;
  tokenEsign: string;
}

export interface VerifySaleRequestProps {
  token: string;
  idCardNumber: string;
  id: number;
}

export interface VerifySaleContractRequestProps {
  token: string;
  idCardNumber: string;
  id: number;
  phoneNumber: string;
}

export interface CheckNapasResponseProps {
  result: boolean;
  message: string;
}
export interface CheckNapasRequestProps {
  id: string;
  bankCode: string;
  accountNo: string;
  idCardNumber: string;
  tokenEsign: string;
}

export interface GenerateOTPResponseProps {
  authSeq: string;
  code: string;
  message: string;
  status: boolean;
}
export interface GenerateOTPRequestProps {
  phoneNumber: string;
  identityNumber: string;
  type: OTPTypes;
}

export interface VerifyOTPResponseProps {
  authSeq: string;
  code: string;
  message: string;
  status: boolean;
}
export interface VerifyOTPRequestProps {
  authSeq: string;
  code: string;
  type: OTPTypes;
}

export interface ResendOTPResponseProps {
  authSeq: string;
  code: string;
  message: string;
  status: boolean;
}
export interface ResendOTPRequestProps {
  phoneNumber: string;
  identityNumber: string;
  authSeq: string;
  type: OTPTypes;
}

export interface CheckEKYCResponseProps {
  authSeq: string;
  code: string;
  message: string;
  status: boolean;
}
export interface CheckEKYCRequestProps {
  id: number;
  idCardNumber: string;
}

export interface VerifyEKYCResponseProps {
  billCode: string;
  notificationMessage: string;
  authorizeCredential: string;
}
export interface VerifyEKYCRequestProps {
  id: string;
  idCardNumber: string;
  selfiePhoto: FileProps;
  tokenEsign: string;
  idCardIssuedAt: string;
  idCardIssuedBy: string;
}

export interface VerifyEKYCRequestWebProps {
  id: string;
  idCardNumber: string;
  selfiePhoto: Blob;
  fileName: string;
  tokenEsign: string;
  idCardIssuedAt: string;
  idCardIssuedBy: string;
}

export interface SaleSelfCertResponseProps {
  agreementUUID: string;
  billCode: string;
}
export interface SaleSelfCertRequestProps {
  id: number;
  idCardNumber: string;
  tokenEsign: string;
}

export interface SignContractResponseProps {
  agreementUUID: string;
  billCode: string;
}
export interface SignContractRequestProps {
  id: number;
  idCardNumber: string;
  billCode: string;
  otp: string;
  tokenEsign: string;
}

export interface ResendOTPSignContractResponseProps {
  agreementUUID: string;
  billCode: string;
}
export interface ResendOTPSignContractRequestProps {
  id: number;
  idCardNumber: string;
  tokenEsign: string;
}

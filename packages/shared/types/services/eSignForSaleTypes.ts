import {OTPTypes} from '@lfvn-customer/shared/types';
import {FileProps} from '../models/loanModel';

export enum ESignForSaleDocType {
  DOC_CCCD = 'DOC_CCCD',
  DOC_SELFIE = 'DOC_SELFIE',
  DOC_GTCT = 'DOC_GTCT',
  DOC_VB = 'DOC_VB',
  DOC_SYLL = 'DOC_SYLL',
  BANK_INFO = 'DOC_BANK',
}

export interface UploadESignForSaleFile {
  title: string;
  type: ESignForSaleDocType;
  links?: UploadFile;
}

export interface DraftImagesESignForSale {
  type: ESignForSaleDocType;
  links: {
    id: string;
    uri: string;
  }[];
}

export interface UploadFile {
  file: Blob;
  fileName: string;
  id: string;
}

export interface SaleimportDocsUploadWebRequestProps {
  saleImportId: string;
  idCardNumber: string;
  docIdCard?: UploadFile;
  docSelfie?: UploadFile;
  docGtct?: UploadFile;
  docVb?: UploadFile;
  docSyll?: UploadFile;
  docBank?: UploadFile;
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
  accountName: string;
  accountBranch: string;
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
  action: 'EKYC' | 'ESIGN' | 'REJECT';
  message: string;
}
export interface CheckEKYCRequestProps {
  id: number;
  idCardNumber: string;
  tokenEsign: string;
}

export interface VerifyEKYCResponseProps {
  billCode: string;
  notificationMessage: string;
  authorizeCredential: string;
}
export interface VerifyEKYCRequestProps {
  id: string;
  idCardNumber: string;
  selfiePhoto?: FileProps;
  frontSidePhoto?: FileProps;
  backSidePhoto?: FileProps;
  tokenEsign: string;
  idCardIssuedAt?: string;
  idCardIssuedBy?: string;
}

export interface VerifyEKYCRequestWebProps {
  id: string;
  idCardNumber: string;
  selfiePhoto?: Blob;
  frontSidePhoto?: Blob;
  backSidePhoto?: Blob;
  selfieFileName?: string;
  frontSideFileName?: string;
  backSideFileName?: string;
  tokenEsign: string;
  idCardIssuedAt?: string;
  idCardIssuedBy?: string;
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
  signedFileData: string;
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

export interface UpdateEKYCRequestProps {
  id: string;
  idCardNumber: string;
  tokenEsign: string;
  ekycResult: boolean;
}

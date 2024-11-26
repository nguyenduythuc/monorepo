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

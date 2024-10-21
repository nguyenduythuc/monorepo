export interface ProductProps {
  interest: string;
  maxAmount: string;
  minAmount?: string;
  maxTenor?: string;
  minTenor?: string;
  productCode: string;
  productName: string;
  business?: string;
  product?: string;
  subproduct?: string;
  process?: string;
  id: string;
}

export interface PurposeProps {
  name: string;
  code: string;
  product: string;
  template: null;
}

export interface CifMetadataProps {
  cifId: boolean;
  productCode: boolean;
  validTime: boolean;
  productCodeTR: string;
  interestRate: number;
  loanTerm: number;
  loanAmount: number;
  flowId: string;
}

export interface FileProps {
  name: string;
  type: string;
  size?: string;
  uri: string;
}

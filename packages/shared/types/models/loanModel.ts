export interface ProductProps {
  interest: number;
  maxAmount: string;
  productCode: string;
  productName: string;
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

export interface ProductResponseProps {
  data: ProductDataType[];
  code: string;
  message: string;
}

export interface PurposeResponseProps {
  data: PurposeDataType[];
  code: string;
  message: string;
}

export interface ProductDataType {
  interest: number;
  maxAmount: string;
  productCode: string;
  productName: string;
}

export interface PurposeDataType {
  name: string;
  code: string;
  product: string;
  template: null;
}

export interface MetadataResponseProps {
  code: string;
  message: string;
  data: any;
}

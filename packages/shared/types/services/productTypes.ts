import { IconKeys } from '@lfvn-customer/shared/components';

export interface ProductResponseProps {
  data: { data: ProductDataType[] };
  code: string;
  message: string;
}

export interface ProductDetailResponseProps {
  id: number;
  name: string;
  code: string;
  desc: null;
  maxAmount: null;
  minAmount: null;
  title: null;
  fromDate: null;
  toDate: null;
  status: number;
  createdBy: string;
  createdDate: string;
  checkedBy: null;
  checkedDate: null;
  syncBy: null;
  syncDate: null;
  icon: null;
  productGroupInfos: [];
}

export interface ProductGroupProps {
  data: ProductIntroDataType[];
  code: string;
  message: string;
}

export interface ProductIntroDataType {
  id: number;
  name: string;
  code: string;
  desc: null;
  maxAmount: null;
  title: null;
  fromDate: null;
  toDate: null;
  status: number;
  createdBy: string;
  createdDate: string;
  checkedBy: null;
  checkedDate: null;
  syncBy: null;
  syncDate: null;
  icon?: IconKeys;
  productGroupInfos: [];
}

export interface PurposeResponseProps {
  data: {
    count: number;
    data: PurposeDataType[];
  };
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

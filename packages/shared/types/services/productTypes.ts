import {IconKeys} from '@lfvn-customer/shared/components';

export interface ProductResponseProps {
  data: {data: ProductDataType[]};
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
  _id: string;
}

export interface MetadataResponseProps {
  code: string;
  message: string;
  data: any;
}

export interface ProductScheme {
  id: number;
  losId: string;
  losStatus: string;
  losCreatedAt: string;
  losUpdatedAt: string;
  business: string;
  product: string;
  businessECM: string;
  subProduct: string;
  name: string;
  code: string;
  description: string;
  insuranceFee: number;
  repaymentPenaltyValue: number;
  repaymentPenalty: string;
  department?: string;
  poscode?: string;
  region?: string;
  dti: number;
  ltv: number;
  risk?: string;
  process: string;
  repaymentMethod: string;
  interest: string;
  age: string;
  loanAmount: string;
  loanPeriod: string;
  status: string;
  sid: string;
  company: string;
  businessInfo: string;
  productInfo: string;
  subProductInfo: string;
  createdAt: string;
  updatedAt: string;
  activatedBy?: string;
  deactivatedBy?: string;
  activatedAt: string;
  deactivatedAt: string;
  campaignId: string;
  note?: string;
  updatedBy: string;
  criterias: string;
  lmsUpdatedAt?: string;
  thinfile?: string;
}

export interface ProductSchemeProps {
  data: ProductScheme[];
  code: string;
  message: string;
}

export interface schemeInterest {
  interest_one: {
    value: string,
    code: string,
    period: string
  },
  interest_two?: {
    value: string,
    code: string,
    period: string
  },
  interest_three?: {
    value: string,
    code: string,
    period: string
  },
  maxBalloonPercentage: string
}
import {IconKeys} from '../../components';

export type AddressListType = {
  _id: number;
  name: string;
  code: string;
  country?: string;
  province?: string;
  description?: string;
  district?: string;
  image?: IconKeys;
};

export type OccupationType = {
  _id: string;
  sid: string;
  name: string;
  code: string;
  order: number;
  employmentStatus: string;
};

export type BankListType = {
  _id: string;
  bankName: string;
  phone?: string;
  swiftCode?: string;
  address?: string;
  trustAccountNumber?: string;
  trustAccountName?: string;
  operationAccountNumber?: string;
  operationAccountName?: string;
  expenseGL?: string;
  incomeGL?: string;
  bankType?: string;
  status: string;
  code: string;
  //   createdAt?: string;
  updatedAt?: string;
  logo?: string;
  //   isDeleted?: boolean;
  //   isDefault?: boolean;
  //   createdBy?: string;
  //   updatedBy?: string;
};

export interface AddressLocalListResponseProps {
  count: number;
  data: AddressListType[];
  errorCode: number;
  errorMsg: string;
}

export interface BankListResponseProps {
  count: number;
  data: BankListType[];
  errorCode: number;
  errorMsg: string;
}

export interface OccupationListResponseProps {
  count: number;
  data: OccupationType[];
  errorCode: number;
  errorMsg: string;
}

export interface GetLocalListRequestProps {
  queryInput: {
    region?: string;
    country?: string;
    province?: string;
    district?: string;
  };
  limit?: number;
  skip?: number;
  sort?: [];
}

export interface GetBankListRequestProps {
  queryInput: {};
  limit?: number;
  skip?: number;
  sort?: [];
}

import {PreCheckStatusEnum, PreCheckStepEnum} from '..';

export interface PreCheckRequestProps {
  customerName: string;
  customerNric: string;
  customerNricType: string;
  customerOldNric: string;
  customerAdditionalNric: [];
  customerProvince: string;
  customerDistrict: string;
  customerWard: string;
  customerAddress: string;
  customerNricDate: string;
  customerNricExpiry: string;
  customerNricIssuer: string;
  customerDOB: string;
  customerGender: string;
  customerNationality: string;
  identityReport: string[];
  schemeCode: string;
  userId: string;
}

export interface PreCheckResponseProps {
  currentStep: string;
}

export interface RequestPendingByUserRequestProps {
  queryInput: {
    userId: string;
  };
}

export interface RequestPendingByUserResponseProps {
  userId: string;
  currentStep: PreCheckStepEnum;
  productCode: string;
  status: PreCheckStatusEnum;
}

export interface PreCheckResponseSocketProps {
  userId: string;
  currentStep: PreCheckStepEnum;
  productCode: string;
  metadata: {
    email: string;
    phoneNumber: string;
    gender: string;
    precheckData: {
      err: number;
      message: string;
      data: {
        errorCode: number;
        errorMsg: string;
        metadata: {
          duplicateResult?: string;
          blacklistResult?: string;
          s37Result?: string;
          rawS37Result?: string;
          duplicateMessage?: string;
          isException?: boolean;
          messageException?: string;
        };
      };
    };
  };
}

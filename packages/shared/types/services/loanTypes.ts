import {PreCheckStatusEnum, RequestPendingStepEnum} from '..';

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
  loanSimulateProps: LoanSimulateProps;
}

export interface PreCheckResponseProps {
  currentStep: string;
}

export interface RequestPendingByUserRequestProps {
  queryInput: {
    userId: string;
  };
}

export interface MetadataPrecheckProps {
  duplicateResult?: string;
  blacklistResult?: string;
  s37Result?: string;
  rawS37Result?: string;
  duplicateMessage?: string;
  isException?: boolean;
  messageException?: string;
}

export interface PreCheckDataMetadataProps {
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
}

export interface MetaDataResponseProps {
  status: PreCheckStatusEnum;
  requestData: string;
  precheckData: PreCheckDataMetadataProps;
}

export interface RequestPendingByUserResponseProps {
  userId: string;
  currentStep: RequestPendingStepEnum;
  productCode: string;
  metadata: MetaDataResponseProps;
  status: string;
}

export interface PreCheckResponseSocketProps {
  userId: string;
  currentStep: RequestPendingStepEnum;
  productCode: string;
  metadata: {
    email: string;
    phoneNumber: string;
    gender: string;
    status: PreCheckStatusEnum;
    precheckData: PreCheckDataMetadataProps;
  };
}

export interface ExpectedRepaymentScheduleProps {
  interestRate: number;
  interestMonthly: string;
  principalMonthly: string;
  totalMonthlyRepayment: string;
  remaining: string;
  date: string;
}

export interface LoanSimulateProps {
  amount: number;
  loanTerm: string;
  schemeId: string;
  schemeCode: string; // same meaning with productCode
  schemeName: string;
  loanPurpose: string;
  participateInLoanInsurance: boolean;
  expectedRepaymentSchedule: ExpectedRepaymentScheduleProps[];
}

export interface MetaDataRequestProps
  extends Partial<PreCheckRequestProps>,
    Partial<LoanSimulateProps> {
  preCheckId?: string;
  createdOn?: string;
}

export interface RequestPendingRequestProps {
  userId: string;
  currentStep: RequestPendingStepEnum;
  productCode: string;
  metadata: MetaDataRequestProps;
}

export interface RequestPendingResponseProps {
  userId: string;
  currentStep: RequestPendingStepEnum;
  productCode: string;
  status: PreCheckStatusEnum;
  metadata: MetaDataRequestProps;
}

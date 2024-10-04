import {PreCheckStatusEnum, RequestPendingStepEnum} from '..';
import {CifMetadataProps} from '../models/loanModel';

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
  folderId: string;
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
  precheckId: string;
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
  identityEntryMethod?: string;
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

export interface CreateAPLResponseProps {
  data: {
    flowId: string;
  };
}

export interface FindCifInfoRequestProps {
  flowId: string;
}

export interface FindCifInfoResponseProps {
  data: {
    apl: {
      createdAt: string;
      applicantId: string;
      name: string;
      schemeId: string;
      requestAmount: number;
      status: 'open';
      flowId: string;
      customer: {
        cif: string;
      };
    };
  };
}

export interface CheckTRandProductRequestProps {
  cifId: string;
  productCode: string;
  aplCreatedAt: string;
}

export interface CheckTRandProductResponseProps {
  metadata: CifMetadataProps;
}

export interface SubmmitSuggestTRRequestProps {
  flowId: string;
  action: 'approve';
  trUserConfirm: "Don't agree" | 'Agree';
}

export interface SubmmitSuggestTRResponseProps {
  metadata: {
    cifId: boolean;
    productCode: boolean;
    validTime: boolean;
    productCodeTR: string;
    interestRate: number;
    loanTerm: number;
    loanAmount: number;
  };
}

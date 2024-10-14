import {PreCheckStatusEnum, RequestPendingStepEnum} from '..';
import {CifMetadataProps, FileProps} from '../models/loanModel';

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
  amount: string;
  loanTerm: string;
  schemeId: string;
  schemeCode: string; // same meaning with productCode
  schemeName: string;
  loanPurpose: string;
  participateInLoanInsurance: boolean;
  expectedRepaymentSchedule: ExpectedRepaymentScheduleProps[];
  insuranceFee?: string;
  business?: string;
  product?: string;
  subproduct?: string;
  process?: string;
  interest?: string;
}

export interface MetaDataRequestProps
  extends Partial<PreCheckRequestProps>,
    Partial<LoanSimulateProps> {
  preCheckId?: string;
  createdOn?: string;
  identityEntryMethod?: string;
  flowId?: string;
  incomeMonthly?: string;
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

export interface SubmitRbpInfoRequestProps {
  flowId?: string;
  action?: 'approve';
  schemeId?: string; // Scheme ID
  loanAmount?: string; // Số tiền vay
  loanTerm?: string; // Thời hạn vay
  interest?: string; // Lãi suất vay
  paymentMonthly?: string; // Số tiền trả hàng tháng dự kiến
  insurance?: boolean; // Optional - Bảo hiểm khoản vay
  insuranceAmount?: string; // Optional - Số tiền phí bảo hiểm
  incomeMonthly?: string; // Thu nhập hàng tháng
  purposeUse?: string; // Mục đích sử dụng vốn --> Lấy dữ liệu ở dataset loan purpose
  workingTime?: string; // Thời gian làm việc
  insuranceTime?: string; // Optional - Thời gian đóng bảo hiểm
  merialStatus?: string; // Tình trạng hôn nhân [single, married, divorced, others]
  residentialAddress?: string; // Địa chỉ cư trú
  province?: string; // Tỉnh / Thành phố
  district?: string; // Quận / huyện
  ward?: string; // Phường / xã
  address?: string; // Địa chỉ chi tiết
  mailingProvince?: string; // [Thông tin cư trú] - Tỉnh / Thành phố
  mailingDistrict?: string; // [Thông tin cư trú] - Quận / huyện
  mailingWard?: string; // [Thông tin cư trú] - Phường / xã
  mailingAddress?: string; // [Thông tin cư trú] - Địa chỉ chi tiết,
  occupation?: string; // Nghề nghiệp
}

export interface SubmitRbpInfoResponseProps {
  data: {
    folderId: string;
  };
}

export interface CreateFolderEcmRequestProps {
  identity: string;
  datecreated: string;
  customerName: string;
  business: string;
  product: string;
  subproduct: string;
  process: string;
}

export interface CreateFolderEcmResponseProps {
  data: {
    folderId: string;
  };
}

export interface UploadDocumentEcmRequestProps {
  objectid: string;
  docType: string;
  docName: string;
  fileType: string;
  identity: string;
  file: FileProps;
}

export interface UploadDocumentEcmResponseProps {
  data: {
    uploadedResult: {
      documentList: {
        folderId: string;
        mimeType: string;
        docId: string;
        fileType: string;
        docType: string;
        docName: string;
      };
    };
  };
}

import {PreCheckStatusEnum, RequestPendingStepEnum} from '..';
import {CifMetadataProps, FileProps} from '../models/loanModel';
import {ekycDataType} from './verifyCustomerTypes';

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
  identityReport?: string[];
  folderId?: string;
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
  expectedMonthlyPayment?: string;
  insuranceFee?: string;
  business?: string;
  product?: string;
  subproduct?: string;
  process?: string;
  interest?: string;
}

export interface LoanOfferResultProps {
  result: string;
  productOffer: string;
  schemeOffer: string;
  amtOffer: number;
  irOffer: string;
  emiOffer: number;
  insuranceOffer: number;
  offer: number;
  interestRate: string;
  paymentMonthly: number;
  insuranceFee: number;
}

export interface MetaDataRequestProps
  extends Partial<PreCheckRequestProps>,
    Partial<LoanSimulateProps> {
  preCheckId?: string;
  createdOn?: string;
  identityEntryMethod?: string;
  flowId?: string;
  incomeMonthly?: string;
  loanPreviousCompanyWorkingTime?: string;
  loanInsuranceDuration?: string;
  loanMarriedStatus?: string;
  loanResidentAddress?: string;
  loanOccupation?: string;
  loanOfferResult?: LoanOfferResultProps;
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

export interface SubmitSuggestTRRequestProps {
  flowId: string;
  action: 'approve';
  trUserConfirm: "Don't agree" | 'Agree';
}

export interface SubmitSuggestTRResponseProps {
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
  amount?: string; // Số tiền vay
  loanTerm?: string; // Thời hạn vay
  interest?: string; // Lãi suất vay
  paymentMonthly?: string; // Số tiền trả hàng tháng dự kiến
  insurance?: boolean; // Optional - Bảo hiểm khoản vay
  insuranceAmount?: string; // Optional - Số tiền phí bảo hiểm
  incomeMonthly?: string; // Thu nhập hàng tháng
  purposeUse?: string; // Mục đích sử dụng vốn --> Lấy dữ liệu ở dataset loan purpose
  workingTime?: string; // Thời gian làm việc
  insuranceTime?: string; // Optional - Thời gian đóng bảo hiểm
  expectedMonthlyPayment?: string;
  insuranceFee?: string;
  loanPurpose?: string;
  customerMonthlyIncome?: string;
  customerWorkingTime?: string;
  customerMaritalStatus?: string;
  customerMailingProvince?: string;
  customerMailingDistrict?: string;
  customerMailingWard?: string;
  customerMailingAddress?: string;
  customerOccupation?: string;
  participateInLoanInsurance?: string;
}

export interface SubmitRbpInfoResponseProps {
  folderId: string;
  err: string;
  message: string;
  statusCode: string;
  status: string;
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

export interface UploadDocumentEcmWebRequestProps {
  objectid: string;
  docType: string;
  docName: string;
  fileType: string;
  identity: string;
  file: Blob;
  fileName: string;
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

export interface aplCustomerDataType {
  name: string;
  gender: string;
  nric: string;
  nricType: string;
  nricDate: string;
  nricExpiry: string;
  oldNric: string;
  demographic: {
    dob: string;
    nationality: string;
    placeOfOrigin: string;
    maritalStatus: string;
  };
  homeContact: {
    province: string;
    district: string;
    ward: string;
    address: string;
  };
  financial: {
    monthlyIncome: string;
  };
  workingTime: string;
}
export interface GetAPLDataRequestProps {
  flowId: string;
}

export interface GetAPLDataResponseProps {
  err: number;
  message: string;
  data: {
    errorCode: number;
    errorMsg: string;
    err: string;
    status: string;
    statusCode: string;
    apl: GetAPLDataTypeProps;
  };
}

export interface GetAPLDataTypeProps {
  customer: aplCustomerDataType | undefined;
  loanOfferResult: LoanOfferResultProps;
}

export interface GetCifDataRequestProps {
  deviceId: string;
  flowId: string;
  customerNric: string;
  customerAdditionalNric: string;
  customerName: string;
}

export interface GetCifDataResponseProps {
  err: number;
  message: string;
  data: {
    errorCode: number;
    errorMsg: string;
    data: {
      errorCode: number;
      isExisted: boolean;
      cifs: object[];
      cif: string;
      result: string;
    };
  };
}

export interface LoanReviewInfoProps extends ekycDataType {
  loanProduct?: string;
  loanAmount?: string;
  loanTenor?: string;
  interestMonthly?: string;
  interestRate?: string;
  loanInsuranceFee?: string;
}

export interface LoanOfferRequestProps {
  flowId: string;
  action: string; // only approve
  userConfirmLoanOffer: string; // string of boolean
}

export interface UploadedResultProps {
  LOTTE_Business: string;
  Lotte_Note: string;
  UWAccount: string;
  LOTTE_KeepbyUser: string;
  SAAccount: string;
  LOTTE_Subproduct: string;
  DEAccount: string;
  RejectedEkycNote: string;
  SelfieGPS: string;
  UWNote: string;
  CmIsMarkedForDeletion: string;
  SalesCode: string;
  NFC: string;
  LOTTE_Identify: string;
  LOTTE_Product: string;
  System: string;
  ASM: string;
  OPNote: string;
  LOTTE_Status: string;
  ClosedReason: string;
  CmIndexingFailureCode: string;
  IndexationId: string;
  LOTTE_ReasonSellerApp: string;
  OPAccount: string;
  ApplicationNo: string;
  SellerLead: string;
  SignType: string;
  Process: string;
  LOTTE_Fullname: string;
  SANote: string;
  ekycResult: string;
}

export interface LoanOfferResponseProps {
  err: number;
  message: string;
  data: {
    errorCode: number;
    errorMsg: string;
  };
}

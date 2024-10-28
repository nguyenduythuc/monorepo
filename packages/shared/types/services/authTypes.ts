import {FileProps} from '@lfvn-customer/shared/types/models/loanModel';

export interface GetAccountResponseProps {
  id: number;
  login: string;
  fullName: string;
  phoneNumber: string;
  identityNumber: string;
  email: string;
  imageUrl: string;
  activated: boolean;
  langKey: 'en' | 'vi';
  changeRequired: boolean;
  identityIssue: string;
  birthDate: string;
  birthPlace: string;
  gender: string;
  nationality: string;
  identityNumberOld?: null;
  authorities: string[];
}

export interface UpdateAccountResponseProps {
  id: string;
}

export interface UpdateAccountRequestProps {
  login?: string;
  fullName?: string;
  phoneNumber?: string;
  identityNumber?: string;
  email?: string;
  imageUrl?: string;
  activated?: boolean;
  changeRequired?: boolean;
  langKey?: string;
  identityIssue?: string;
  birthDate?: string;
  birthPlace?: string;
  /**
    MALE,
    FEMALE,
    OTHER,
  */
  gender?: string;
  /**
    VIETNAMESE,
    KOREAN,
    AMERICAN,
    CANADIAN,
    BRITISH,
    FRENCH,
    GERMAN,
    AUSTRALIAN,
    INDIAN,
    CHINESE,
    JAPANESE,
    OTHER,
  */
  nationality?: string;
  identityNumberOld?: string | null;
  authorities?: string[];
}

export interface UpdateOCRIdentityNumberRequestProps {
  login: string;
  identityNumber: string;
}

export interface UpdateOCRIdentityNumberResponseProps {
  id: number;
  login: string;
  fullName: string;
  phoneNumber: string;
  identityNumber: string;
  email: string;
  imageUrl: string;
  activated: boolean;
  changeRequired: null;
  langKey: string;
  identityIssue: null;
  birthDate: null;
  birthPlace: null;
  gender: null;
  nationality: null;
  identityNumberOld: null;
  createdBy: string;
  createdDate: null;
  lastModifiedBy: string;
  lastModifiedDate: string;
  authorities: [];
}

export interface UploadUserResourceRequestProps {
  resourceType: string;
  file: FileProps;
  login: string;
}

export interface UploadUserResourceWebRequestProps {
  resourceType: string;
  file: Blob;
  login: string;
  fileName: string;
}

export interface GetUserResourceRequestProps {
  userId: string;
}

export interface GetFileRequestProps {
  fileName: string;
}

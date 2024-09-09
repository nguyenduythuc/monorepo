export interface UserProfileProps {
  id: number;
  login: string;
  fullName: string;
  phoneNumber: string;
  identityNumber: string;
  email: string;
  imageUrl: string;
  activated: boolean;
  langKey: 'en' | 'vi';
  changeRequired?: boolean;
  identityIssue?: string;
  birthDate?: string;
  birthPlace?: string;
  gender?: string;
  nationality?: string;
  identityNumberOld?: null;
  authorities?: string[];
}

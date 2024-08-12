export interface UserProfileProps {
  id: number;
  login: 'string';
  fullName: 'string';
  phoneNumber: 'string';
  identityNumber: 'string';
  email: 'string';
  imageUrl: 'string';
  activated: boolean;
  langKey: 'en' | 'vi';
}

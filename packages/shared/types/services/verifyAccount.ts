export interface VerifyAccountResponse {
  type: AccountType;
}

export interface VerifyAccountRequest {
  identityNumber: string;
  phoneNumber: string;
}

export enum AccountType {
  Register = 'register',
  Login = 'login',
  Error = 'error',
}

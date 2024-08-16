export interface LoginRequestProps {
  username: string;
  password: string;
}

export interface ProductDetailProps {
  productId: string;
}

export interface LoginResponseProps {
  id_token: string;
}

export interface RegisterRequestProps {
  login: string;
  fullName: string;
  phoneNumber: string;
  identityNumber: string;
  password: string;
}

export interface RegisterResponseProps {
  authSeq: string;
  code: string;
  message: string | null;
  status: boolean;
}

export interface ActiveAccountRequestProps {
  key: string;
  otp: string;
}

export interface ActiveAccountResponseProps {
  authSeq: string;
  code: string;
  message: string | null;
  status: boolean;
}

export interface GenerateOTPRequestProps {
  phoneNumber: string;
  identityNumber: string;
  authSeq: null;
  type: 'AUTH';
}

export interface GenerateOTPResponseProps {
  authSeq: string;
  message: string | null;
  code: string;
  status: boolean;
}

export interface VerifyOTPRequestProps {
  authSeq: string;
  code: string;
  type: 'AUTH';
}

export interface VerifyOTPResponseProps {
  authSeq: string;
  code: string;
  status: boolean;
  token: string;
}

export interface ResendOTPRequestProps {
  phoneNumber: string;
  identityNumber: string;
  authSeq: string;
  type: 'AUTH';
}

export interface ResendOTPResponseProps {
  code: string;
  message: string;
  data: {
    phoneNumber: string;
    authSeq: string;
    type: string | null;
    code: string;
    status: boolean;
  };
}

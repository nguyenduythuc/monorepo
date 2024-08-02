export interface LoginRequestProps {
  username: string;
  password: string;
}

export interface LoginResponseProps {
  id_token: string;
}

export interface GenerateOTPRequestProps {
  phoneNumber: string;
  identityNumber: string;
  authSeq: null;
  type: 'AUTH';
}

export interface GenerateOTPResponseProps {
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

export interface VerifyOTPRequestProps {
  authSeq: string;
  code: string;
  type: 'AUTH';
}

export interface VerifyOTPResponseProps {
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

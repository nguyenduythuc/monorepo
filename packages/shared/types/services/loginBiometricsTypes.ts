export interface CheckBiometricRequestProps {
  login: string;
  uuid: string;
  token: string;
}

export interface CheckBiometricResponseProps {
  isActive: boolean | null;
}

export interface ActiveBiometricRequestProps {
  login: string;
  uuid: string;
  deviceName: string;
  brandName: string;
  location: string;
  biometricType: string;
}

export interface ActiveBiometricResponseProps {
  token: string;
}

export interface DeactiveBiometricRequestProps {
  login: string;
  uuid: string;
  token: string;
}

export interface DeactiveBiometricResponseProps {
  id_token: string;
}

export interface BiometricTokenRequestProps {
  login: string;
  uuid: string;
  token: string;
}

export interface BiometricTokenResponseProps {
  id_token: string;
}

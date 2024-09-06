export type ekycDataType = {
  idNumber?: string;
  dob?: string;
  doi?: string;
  dueDate?: string;
  fullname?: string;
  givenPlace?: string;
  origin?: string;
  address?: string;
  documentNumber?: string;
  ethnicity?: string;
  fatherName?: string;
  gender?: string;
  identifyingCharacteristics?: string;
  motherName?: string;
  nationality?: string;
  passportNumber?: string;
  placeOfBirth?: string;
  spouseName?: string;
  oldIdNumber?: string;
} | null;

export const mapEkycKeyValue = {
  idNumber: 'Số CCCD',
  fullname: 'Họ và tên',
  doi: 'Ngày cấp',
  dob: 'Ngày sinh',
  ethnicity: 'Dân tộc',
  fatherName: 'Tên bố',
  gender: 'Giới tính',
  identifyingCharacteristics: 'Đặc điểm nhận dạng',
  motherName: 'Tên mẹ',
  nationality: 'Quốc tịch',
  passportNumber: 'Số hộ chiếu',
  placeOfBirth: 'Nơi sinh',
  spouseName: 'Tên vợ chồng',
  dueDate: 'Ngày hết hạn',
  documentNumber: 'Số hồ sơ',
  origin: 'Quê quán',
  address: 'Địa chỉ',
  oldIdNumber: 'Số CMND cũ',
};

export type NFCResultType = {
  code: number;
  errorMessage: string;
  nfcInfo: string;
};

export type OCRResultType = {
  clientId: string;
  errorMessage: string;
  code: number;
  decision: object;
  idInfo: ekycDataType;
};

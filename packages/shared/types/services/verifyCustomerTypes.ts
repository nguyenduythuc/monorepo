export type ekycDataType = {
  cardNumber: string;
  dateOfBirth: string;
  dateOfExpiry: string;
  dateOfIssue: string;
  documentNumber: string;
  ethnicity: string;
  fatherName: string;
  gender: string;
  identifyingCharacteristics: string;
  motherName: string;
  name: string;
  nationality: string;
  passportNumber: string;
  placeOfBirth: string;
  placeOfResidence: string;
  spouseName: string;
};

export const mapEkycKeyValue: ekycDataType = {
  cardNumber: 'Số CCCD',
  name: 'Họ và tên',
  dateOfIssue: 'Ngày cấp',
  dateOfBirth: 'Ngày sinh',
  ethnicity: 'Dân tộc',
  fatherName: 'Tên bố',
  gender: 'Giới tính',
  identifyingCharacteristics: 'Đặc điểm nhận dạng',
  motherName: 'Tên mẹ',
  nationality: 'Quốc tịch',
  passportNumber: 'Số hộ chiếu',
  placeOfBirth: 'Nơi sinh',
  placeOfResidence: 'Nơi thường trú',
  spouseName: 'Tên vợ chồng',
  dateOfExpiry: 'Ngày hết hạn',
  documentNumber: 'Số hồ sơ',
};

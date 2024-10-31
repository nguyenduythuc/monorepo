export const marriedStatusOption = [
  {
    name: 'Độc thân',
    code: 'single',
  },
  {
    name: 'Đã kết hôn',
    code: 'married',
  },
  {
    name: 'Đã ly hôn',
    code: 'divorced',
  },
];

export const residentSameAsID = [
  {
    name: 'Yes',
    code: 'yes',
  },
  {
    name: 'No',
    code: 'no',
  },
];

export const lifeInsuranceDuration = [
  {
    name: '≥ 6 tháng',
    code: '01',
  },
  {
    name: '≥ 1 năm',
    code: '02',
  },
  {
    name: '≥ 2 năm',
    code: '03',
  },
  {
    name: '≥ 3 năm',
    code: '04',
  },
];

export const defaultSelectProductInfo = {
  loanAmount: {max: '0', min: '0'},
  loanPeriod: {max: '0', min: '0'},
};

export const defaultPurposeData = {
  name: 'Vay tiêu dùng',
  code: '02',
  product: '999994',
  template: null,
};

export const defaultSelectProductData = {
  maxAmount: '100000000',
  minAmount: '10000000',
  interest: 10,
  minTenor: '6',
  maxTenor: '36',
  id: 1,
};

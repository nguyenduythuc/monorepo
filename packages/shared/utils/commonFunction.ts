export const formatNewAmount = (value: number) => {
  const formatterVND = new Intl.NumberFormat('vn-VN', {
    style: 'currency',
    currency: 'VND',
  });

  let loanEstimatePayFormat = formatterVND.format(value);

  const currencySymbolVND = loanEstimatePayFormat.slice(0, 1);

  loanEstimatePayFormat = loanEstimatePayFormat.replace(currencySymbolVND, '');

  return {loanEstimatePayFormat, currencySymbolVND};
};

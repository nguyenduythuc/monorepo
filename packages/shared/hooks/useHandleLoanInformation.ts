import {useCallback, useEffect, useMemo, useState} from 'react';
import {
  useGetProductSchemeListQuery,
  useGetPurposeQuery,
} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {
  AnswerType,
  LoanInformationAnswerName,
  StepProps,
} from '@lfvn-customer/shared/types/models/stepModel';
import {Control, FieldValues, useWatch} from 'react-hook-form';
import {useAppSelector} from '@lfvn-customer/shared/redux/store';
import {ProductScheme} from '../types/services/productTypes';
import useSimulateScreen from '../hooks/useSimulateScreen';
import eventEmitter, {
  EventEmitterEnum,
} from '@lfvn-customer/shared/utils/eventEmitter';
import {
  lifeInsuranceDuration,
  defaultSelectProductInfo,
} from '@lfvn-customer/shared/data/data';
import {useDispatch} from 'react-redux';
import {setProductSelected} from '@lfvn-customer/shared/redux/slices/productSlices';

const useHandleLoanInformation = ({
  control,
  stepNumber,
}: {
  control: Control<FieldValues>;
  stepNumber: number;
}) => {
  const {data: productSchemeListData} = useGetProductSchemeListQuery();
  const {data: purposeData} = useGetPurposeQuery();

  const dispatch = useDispatch();

  const {requestPendingMetadata} = useAppSelector(state => state.product);

  const {estimatePaymentMonthlyParamsInput} = useSimulateScreen();

  const productData: ProductScheme[] = useMemo(() => {
    return (productSchemeListData ?? []).map(item => {
      return {
        ...item,
        interest: JSON.parse(item.interest).interest_one.value,
      };
    });
  }, [productSchemeListData]);

  const {cifMetadata} = useAppSelector(state => state.product);

  const [selectProductLoan, setSelectProductLoan] = useState(
    defaultSelectProductInfo,
  );

  const simulateLoanProduct = useWatch({
    control,
    name: LoanInformationAnswerName.LoanProduct,
    defaultValue: requestPendingMetadata?.schemeCode,
  });
  const simulateLoanTenor = useWatch({
    control,
    name: LoanInformationAnswerName.LoanTenor,
    defaultValue: requestPendingMetadata?.loanTerm,
  });
  const simulateLoanAmount = useWatch({
    control,
    name: LoanInformationAnswerName.LoanAmount,
    defaultValue: requestPendingMetadata?.amount,
  });
  const simulateLoanInsurance = useWatch({
    control,
    name: LoanInformationAnswerName.LoanInsurance,
    defaultValue: requestPendingMetadata?.participateInLoanInsurance,
  });

  const simulateLoanIncomePerMonth = useWatch({
    control,
    name: LoanInformationAnswerName.LoanIncomePerMonth,
    defaultValue: requestPendingMetadata?.incomeMonthly,
  });

  const simulateLoanPurpose = useWatch({
    control,
    name: LoanInformationAnswerName.LoanPurpose,
    defaultValue: requestPendingMetadata?.loanPurpose,
  });

  const selectProduct = useMemo(() => {
    const selectItem = productData.find(
      item => item.code === simulateLoanProduct,
    );
    if (!selectItem) {
      return productData[0];
    }
    return selectItem;
  }, [productData, simulateLoanProduct]);

  useEffect(() => {
    if (selectProduct) {
      setSelectProductLoan({
        loanAmount: {
          max: JSON.parse(selectProduct.loanAmount).max,
          min: JSON.parse(selectProduct.loanAmount).min,
        },
        loanPeriod: {
          max: JSON.parse(selectProduct.loanPeriod).max,
          min: JSON.parse(selectProduct.loanPeriod).min,
        },
      });
      dispatch(setProductSelected(selectProduct));
    }
  }, [selectProduct]);

  const simulateLoanPreviousCompanyWorkingTime = useWatch({
    control,
    name: LoanInformationAnswerName.LoanPreviousCompanyWorkingTime,
  });
  const simulateLoanInsuranceDuration = useWatch({
    control,
    name: LoanInformationAnswerName.LoanInsuranceDuration,
  });

  const getEstimate = useMemo(() => {
    if (selectProduct && simulateLoanTenor && simulateLoanAmount) {
      return estimatePaymentMonthlyParamsInput(
        selectProduct.interest,
        simulateLoanTenor,
        simulateLoanAmount,
      );
    }
    return '0';
  }, [selectProduct, simulateLoanTenor, simulateLoanAmount]);

  const getInterest = useMemo(() => {
    if (selectProduct) {
      return selectProduct.interest;
    }
    return '0';
  }, [selectProduct]);

  const descriptionDefault = 'Step.addMoreInformation';

  const getDuration = (date: string) => {
    const [startMonth, startYear] = date.split('/').map(Number);

    // Get today's date
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // getMonth() is zero-indexed, so add 1
    const currentYear = today.getFullYear();

    // Calculate the difference in years and months
    let years = currentYear - startYear;
    let months = currentMonth - startMonth;

    // Adjust if months difference is negative
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return {years, months};
  };

  const getPreviousWorkingDuration = useMemo(() => {
    if (
      simulateLoanPreviousCompanyWorkingTime &&
      simulateLoanPreviousCompanyWorkingTime.length === 7
    ) {
      return getDuration(simulateLoanPreviousCompanyWorkingTime);
    }
  }, [simulateLoanPreviousCompanyWorkingTime]);

  useEffect(() => {
    let isDisabled = true;
    switch (stepNumber) {
      case 1:
        isDisabled = !(
          simulateLoanProduct &&
          simulateLoanTenor &&
          simulateLoanAmount &&
          simulateLoanInsurance
        );
        break;
      case 2:
        isDisabled = !simulateLoanIncomePerMonth;
        break;
      case 3:
        isDisabled = !simulateLoanPurpose;
        break;
      case 4:
        isDisabled = !simulateLoanPreviousCompanyWorkingTime;
        break;
      case 5:
        isDisabled = !simulateLoanInsuranceDuration;
        break;
    }
    eventEmitter.emit(EventEmitterEnum.WatchFormData, {stepNumber, isDisabled});
  }, [
    simulateLoanProduct,
    simulateLoanTenor,
    simulateLoanAmount,
    simulateLoanInsurance,
    simulateLoanIncomePerMonth,
    simulateLoanPurpose,
    simulateLoanPreviousCompanyWorkingTime,
    simulateLoanInsuranceDuration,
    requestPendingMetadata,
    stepNumber,
  ]);

  useEffect(() => {
    if (productSchemeListData) {
      const selectItem = productSchemeListData.find(
        item => item.code === simulateLoanProduct,
      );
      if (selectItem) {
        const selectProductLoanAmount = {
          loanAmount: JSON.parse(selectItem.loanAmount),
          loanPeriod: JSON.parse(selectItem.loanPeriod),
        };
        setSelectProductLoan(selectProductLoanAmount);
      }
    }
  }, [simulateLoanProduct]);

  const loanProductOptions = useMemo(() => {
    return productSchemeListData?.map(item => {
      return {
        productCode: item.code,
        productName: item.name,
      };
    });
  }, [productSchemeListData]);

  const getStep = useCallback(
    ({stepNumber}: {stepNumber: number}): StepProps => {
      switch (stepNumber) {
        case 1:
          return {
            id: 1,
            name: 'ProductInformation.title',
            description: 'ProductInformation.desc',
            questions: [
              {
                title: '',
                answers: [
                  {
                    name: LoanInformationAnswerName.LoanProduct,
                    type: AnswerType.DropdownOption,
                    title: 'ProductInformation.loanProduct',
                    options: loanProductOptions,
                    value: simulateLoanProduct,
                  },
                  {
                    name: LoanInformationAnswerName.LoanAmount,
                    type: AnswerType.Slider,
                    title: 'ProductInformation.loanAmount',
                    maxValue: parseInt(selectProductLoan.loanAmount.max), // todo: get max value from api
                    minValue: parseInt(selectProductLoan.loanAmount.min),
                    defaultValue: (
                      parseInt(selectProductLoan.loanAmount.max) / 2
                    ).toString(), // todo: get default value from min-max value
                    unit: 'VND',
                    value: requestPendingMetadata?.amount,
                    step: 1000000,
                  },
                  {
                    name: LoanInformationAnswerName.LoanTenor,
                    type: AnswerType.Slider,
                    title: 'ProductInformation.loanTenor',
                    maxValue: parseInt(selectProductLoan.loanPeriod.max),
                    minValue: parseInt(selectProductLoan.loanPeriod.min),
                    defaultValue: '6',
                    value: requestPendingMetadata?.loanTerm,
                    unit: 'tháng',
                    step: 1,
                  },
                  {
                    name: LoanInformationAnswerName.LoanInsurance,
                    type: AnswerType.Checkbox,
                    title: 'ProductInformation.loanInsurance',
                    description: 'ProductInformation.loanInsuranceDes',
                    value: requestPendingMetadata?.participateInLoanInsurance,
                  },
                ],
              },
            ],
          };
        case 2:
          return {
            id: 2,
            name: 'IncomePerMonth.title',
            description: descriptionDefault,
            questions: [
              {
                title: '',
                answers: [
                  {
                    name: LoanInformationAnswerName.LoanIncomePerMonth,
                    type: AnswerType.Input,
                    title: 'IncomePerMonth.incomePerMonth',
                    value: requestPendingMetadata?.incomeMonthly,
                    keyboardType: 'numeric',
                    unit: 'VND',
                  },
                ],
              },
            ],
          };
        case 3:
          return {
            id: 3,
            name: 'LoanPurpose.title',
            description: descriptionDefault,
            questions: [
              {
                title: '',
                answers: [
                  {
                    name: LoanInformationAnswerName.LoanPurpose,
                    type: AnswerType.RadioButton,
                    title: 'LoanPurpose.loanPurpose',
                    options: purposeData?.data.data ?? [],
                    value: requestPendingMetadata?.loanPurpose,
                  },
                ],
              },
            ],
          };
        case 4:
          return {
            id: 4,
            name: 'PreviousCompanyWorkingTime.title',
            description: descriptionDefault,
            questions: [
              {
                title: '',
                answers: [
                  {
                    name: LoanInformationAnswerName.LoanPreviousCompanyWorkingTime,
                    type: AnswerType.CalenderDatePicker,
                    title: 'PreviousCompanyWorkingTime.workingSince',
                    value: '',
                    keyboardType: 'numeric',
                  },
                ],
              },
            ],
          };
        case 5:
          return {
            id: 5,
            name: 'LifeInsuranceDuration.title',
            description: descriptionDefault,
            questions: [
              {
                title: '',
                answers: [
                  {
                    name: LoanInformationAnswerName.LoanInsuranceDuration,
                    type: AnswerType.RadioButton,
                    title: 'LifeInsuranceDuration.answer',
                    options: lifeInsuranceDuration ?? [],
                  },
                ],
              },
            ],
          };
        default:
          return {
            id: 0,
            name: 'Default',
            description: 'Default description',
          };
      }
    },
    [
      selectProductLoan,
      productSchemeListData,
      purposeData,
      loanProductOptions,
      requestPendingMetadata,
      simulateLoanProduct,
    ],
  );

  return {
    getStep,
    productSchemeListData,
    getInterest,
    getEstimate,
    getPreviousWorkingDuration,
    cifMetadata,
  };
};
export default useHandleLoanInformation;

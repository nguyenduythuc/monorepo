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
import eventEmitter from '@lfvn-customer/shared//utils/eventEmitter';
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
  // const eventEmitter = new EventEmitter();

  const [selectProductLoan, setSelectProductLoan] = useState({
    loanAmount: {max: '300000000', min: '100000000'},
    loanPeriod: {max: '36', min: '6'},
  });

  const simulateLoanProduct = useWatch({
    control,
    name: LoanInformationAnswerName.LoanProduct,
  });
  const simulateLoanTenor = useWatch({
    control,
    name: LoanInformationAnswerName.LoanTenor,
  });
  const simulateLoanAmount = useWatch({
    control,
    name: LoanInformationAnswerName.LoanAmount,
  });
  const simulateLoanInsurance = useWatch({
    control,
    name: LoanInformationAnswerName.LoanInsurance,
  });

  const simulateLoanIncomePerMonth = useWatch({
    control,
    name: LoanInformationAnswerName.LoanIncomePerMonth,
  });

  const simulateLoanPurpose = useWatch({
    control,
    name: LoanInformationAnswerName.LoanPurpose,
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

  useEffect(() => {
    if (stepNumber === 1) {
      const isDisabled = !(
        simulateLoanProduct &&
        simulateLoanTenor &&
        simulateLoanAmount &&
        simulateLoanInsurance
      );
      eventEmitter.emit('watch-form-data', {stepNumber, isDisabled});
    }
    if (stepNumber === 2) {
      const isDisabled = !simulateLoanIncomePerMonth;
      eventEmitter.emit('watch-form-data', {stepNumber, isDisabled});
    }
    if (stepNumber === 3) {
      const isDisabled = !simulateLoanPurpose;
      eventEmitter.emit('watch-form-data', {stepNumber, isDisabled});
    }
  }, [
    simulateLoanProduct,
    simulateLoanTenor,
    simulateLoanAmount,
    simulateLoanInsurance,
    simulateLoanIncomePerMonth,
    simulateLoanPurpose,
    stepNumber,
  ]);

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
                    step: 1000000,
                  },
                  {
                    name: LoanInformationAnswerName.LoanTenor,
                    type: AnswerType.Slider,
                    title: 'ProductInformation.loanTenor',
                    maxValue: parseInt(selectProductLoan.loanPeriod.max),
                    minValue: parseInt(selectProductLoan.loanPeriod.min),
                    defaultValue: '6',
                    unit: 'tháng',
                    step: 1,
                  },
                  {
                    name: LoanInformationAnswerName.LoanInsurance,
                    type: AnswerType.Checkbox,
                    title: 'ProductInformation.loanInsurance',
                    description: 'ProductInformation.loanInsuranceDes',
                  },
                ],
              },
            ],
          };
        case 2:
          return {
            id: 2,
            name: 'IncomePerMonth.title',
            description: 'Step.addMoreInformation',
            questions: [
              {
                title: '',
                answers: [
                  {
                    name: LoanInformationAnswerName.LoanIncomePerMonth,
                    type: AnswerType.Input,
                    title: 'IncomePerMonth.incomePerMonth',
                    value: '',
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
            description: 'Step.addMoreInformation',
            questions: [
              {
                title: '',
                answers: [
                  {
                    name: LoanInformationAnswerName.LoanPurpose,
                    type: AnswerType.RadioButton,
                    title: 'LoanPurpose.loanPurpose',
                    options: purposeData?.data.data ?? [],
                  },
                ],
              },
            ],
          };
        case 4:
          return {
            id: 4,
            name: 'Step 4: Document Upload',
            description: 'Please upload the required documents',
          };
        default:
          return {
            id: 0,
            name: 'Default',
            description: 'Default description',
          };
      }
    },
    [selectProductLoan, productSchemeListData, purposeData, loanProductOptions],
  );

  return {
    getStep,
    productSchemeListData,
    getInterest,
    getEstimate,
  };
};
export default useHandleLoanInformation;

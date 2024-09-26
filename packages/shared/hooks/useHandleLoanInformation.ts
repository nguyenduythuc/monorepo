import {useCallback} from 'react';
import {
  useGetProductSchemeListQuery,
  useGetPurposeQuery,
} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {
  AnswerType,
  LoanInformationAnswerName,
} from '@lfvn-customer/shared/types/models/stepModel';
import {FieldValues, UseFormWatch} from 'react-hook-form';
import {useAppSelector} from '@lfvn-customer/shared/redux/store';

const useHandleLoanInformation = ({
  watch,
}: {
  watch: UseFormWatch<FieldValues>;
}) => {
  const {data: productSchemeListData} = useGetProductSchemeListQuery();
  const {data: purposeData} = useGetPurposeQuery();

  const {requestPendingMetadata} = useAppSelector(state => state.product);

  const [simulateLoanProduct] = watch([LoanInformationAnswerName.LoanProduct]);

  console.log('simulateLoanProduct', simulateLoanProduct); // change content step when change product

  const getStep = useCallback(
    ({stepNumber}: {stepNumber: number}) => {
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
                    options: productSchemeListData,
                  },
                  {
                    name: LoanInformationAnswerName.LoanAmount,
                    type: AnswerType.Slider,
                    title: 'ProductInformation.loanAmount',
                    maxValue: 50000000, // todo: get max value from api
                    minValue: 10000000,
                    defaultValue:
                      requestPendingMetadata?.amount ?? 5000000 + '', // todo: get default value from min-max value
                    unit: 'VND',
                    step: 100000,
                  },
                  {
                    name: LoanInformationAnswerName.LoanTenor,
                    type: AnswerType.Slider,
                    title: 'ProductInformation.loanTenor',
                    maxValue: 36,
                    minValue: 6,
                    defaultValue: 12 + '',
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
                    options: purposeData?.data?.data ?? [],
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
    [productSchemeListData, purposeData],
  );

  return {
    getStep,
    productSchemeListData,
  };
};
export default useHandleLoanInformation;

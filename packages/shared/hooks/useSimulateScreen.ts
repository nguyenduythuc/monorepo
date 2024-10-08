import { useCallback, useEffect, useMemo, useState } from 'react';
import { useCustomForm } from '@lfvn-customer/shared/components/Form/Form.hook';
import { FieldSimulateConfig } from '@lfvn-customer/shared/components/Form/Form.utils';
import {
  useGetMetadataQuery,
  useGetProductQuery,
  useGetProductSchemeListQuery,
  useGetPurposeQuery,
  usePreCheckMutation,
} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {
  ProductProps,
  PurposeProps,
} from '@lfvn-customer/shared/types/models/loanModel';
import { handleExecute } from '@lfvn-customer/shared/utils/simulateCalculate';
import { decryptAES } from '@lfvn-customer/shared/utils/decryptText';
import { useDispatch } from 'react-redux';
import { setSimulate } from '@lfvn-customer/shared/redux/slices/publicSlices';
import { useAppSelector } from '@lfvn-customer/shared/redux/store';
import { useConfigRouting } from '.';
import { ScreenParamEnum } from '@lfvn-customer/shared/types/paramtypes';
import { OTPTypesEnum, CardTypesEnum } from '@lfvn-customer/shared/types';
import {
  clearLoadingScreen,
  setLoadingScreen,
} from '../redux/slices/loadingSlices';
import { handleEnvByPlatform } from '@lfvn-customer/shared/utils/handleEnvByPlatform';

const useSimulateScreen = () => {
  const dispatch = useDispatch();
  const { appNavigate } = useConfigRouting();

  const { data: metaData, error: metadataError } = useGetMetadataQuery();
  const { user } = useAppSelector(state => state.auth);
  const [precheck] = usePreCheckMutation();

  if (!metadataError) {
    useEffect(() => {
      dispatch(setSimulate(metaData?.data.simulate.jsFunctionContent));
    }, []);
  } else {
    const defaultSimulate = handleEnvByPlatform(
      'NEXT_PUBLIC_DEFAULT_SIMULATE_FORMULATE',
    );

    useEffect(() => {
      dispatch(setSimulate(defaultSimulate));
    }, []);
  }

  const { data: productData } = useGetProductQuery();

  const { data: purposeData } = useGetPurposeQuery();

  const { data: productSchemeListData } = useGetProductSchemeListQuery();

  const loanProductOptions = useMemo(() => {
    return productSchemeListData?.map(item => {
      return {
        maxAmount: JSON.parse(item.loanAmount).max,
        minAmount: JSON.parse(item.loanAmount).min,
        minTenor: JSON.parse(item.loanPeriod).min,
        maxTenor: JSON.parse(item.loanPeriod).max,
        interest: JSON.parse(item.interest).interest_one.value,
        productCode: item.code,
        productName: item.name,
      };
    });
  }, [productSchemeListData]);

  const loanSimulate = useAppSelector(state => state.public.simulate);

  const stringFunc: string | null = useMemo(() => {
    const decodeKey = handleEnvByPlatform('NEXT_PUBLIC_DECODE_KEY');
    return decryptAES(loanSimulate, decodeKey);
  }, [loanSimulate]);

  const defaultProductData = {
    productCode: '999995',
    productName: 'Car Loan Stepup',
    maxAmount: '1000000000',
    minAmount: '10000000',
    minTenor: "6",
    maxTenor: "36",
    interest: 10,
  };
  const defaultPurposeData = {
    name: 'Vay tiêu dùng',
    code: '02',
    product: '999994',
    template: null,
  };

  const [loanProductData, setLoanProductData] = useState(loanProductOptions || []);

  const loanPurposeData: PurposeProps[] = purposeData?.data.data || [
    defaultPurposeData,
  ];

  const [selectProduct, setSelectProduct] = useState(loanProductData[0] ||
  {
    maxAmount: "100000000",
    minAmount: "10000000",
    interest: 10,
    minTenor: "6",
    maxTenor: "36"
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fields = useMemo(() => {
    return [
      {
        ...FieldSimulateConfig.SimulateLoanProduct,
        options: loanProductData,
      },
      {
        ...FieldSimulateConfig.SimulateLoanPurpose,
        options: loanPurposeData,
      },
      {
        ...FieldSimulateConfig.SimulateLoanAmount,
        maxValue: parseInt(selectProduct.maxAmount || '100000000'),
        minValue: parseInt(selectProduct.minAmount || '10000000'),
        step: 1000000,
        defaultValue: (
          parseInt(selectProduct?.maxAmount || '10000000') / 2
        ).toString(),
      },
      {
        ...FieldSimulateConfig.SimulateTenor,
        maxValue: parseInt(selectProduct?.maxTenor || 36),
        minValue: parseInt(selectProduct?.minTenor || 6),
        step: 1,
        defaultValue: (
          parseInt(selectProduct?.maxTenor || 36) / 2
        ).toString(),
      },
      FieldSimulateConfig.SimulateLoanInsurance,
    ];
  }, [selectProduct, productData, purposeData]);

  const { reset, renderFrom, handleSubmit, watch, control, setValue, getValues } =
    useCustomForm({
      fields,
      defaultValues: {},
    });

  const [simulateLoanProduct, simulateTenor, simulateLoanAmount] = watch([
    'simulateLoanProduct',
    'simulateTenor',
    'simulateLoanAmount',
  ]);

  const estimatePaymentMonthly = useMemo(() => {
    if (stringFunc) {
      return handleExecute(
        stringFunc,
        selectProduct.interest / (12 * 100) || 0,
        simulateTenor,
        simulateLoanAmount,
      );
    } else return '0';
  }, [stringFunc, simulateTenor, simulateLoanAmount, selectProduct.interest]);

  const estimatePaymentMonthlyParamsInput = useCallback((interestRate: string, tenor: string, loanAmount: string) => {
    if (stringFunc) {
      return handleExecute(
        stringFunc,
        parseFloat(interestRate) / (12 * 100) || 0,
        tenor,
        loanAmount,
      );
    } else return '0';
  }, [stringFunc])

  useEffect(() => {
    if (loanProductData) {
      const optionData = loanProductData.find(
        item => item.productCode === simulateLoanProduct,
      );

      const simulateLoanAmount = (
        parseInt(optionData?.maxAmount ?? '1') / 2
      ).toString();

      if (optionData) {
        setSelectProduct(optionData);
        setLoanProductData(loanProductOptions || [])
      }
      setValue('simulateLoanAmount', simulateLoanAmount);
    }

  }, [simulateLoanProduct]);

  const onPressSubmit = async () => {
    const simulateForm = getValues();
    const {
      simulateLoanAmount,
      simulateLoanProduct,
      simulatePurpose,
      simulateTenor,
      insuranceConfirm,
    } = simulateForm;
    if (insuranceConfirm) {
      if (user) {
        dispatch(setLoadingScreen());
        await precheck({
          customerName: 'Đặng Hữu Thanh', // user.fullName,
          customerNric: '020200006487', // user.identityNumber,
          customerNricType: CardTypesEnum.CCCD,
          customerOldNric: user.identityNumberOld ?? '',
          customerAdditionalNric: [],
          customerProvince: '01',
          customerDistrict: '01009',
          customerWard: '0100900355',
          customerAddress: '267 Khương Trunggg',
          customerNricDate: user.identityIssue ?? '2021-08-13T13:00:00.000Z',
          customerNricExpiry: '2028-05-31T13:00:00.000Z',
          customerNricIssuer: '068',
          customerDOB: user.birthDate ?? '2000-05-31T13:00:00.000Z',
          customerGender: user.gender ?? 'male',
          customerNationality: user.nationality ?? 'VN',
          identityReport: ['idf_703FEB8E-0000-C83A-A11C-D6E750511B6F'],
          folderId: 'idf_703FEB8E-0000-C83A-A11C-D6E750511B6F',
          schemeCode: simulateLoanProduct,
          userId: user.login,
          loanSimulateProps: {
            amount: simulateLoanAmount,
            loanTerm: simulateTenor,
            schemeId: '0208522397770119', // TODO: get from product
            schemeCode: simulateLoanProduct,
            schemeName: selectProduct?.productName,
            loanPurpose: simulatePurpose,
            participateInLoanInsurance: insuranceConfirm,
            expectedRepaymentSchedule: [
              {
                interestRate: 13.4,
                interestMonthly: '198949',
                principalMonthly: '8873051',
                totalMonthlyRepayment: '9072000',
                remaining: '8943268',
                date: '09/03/2028',
              },
            ],
          },
        });
        dispatch(clearLoadingScreen());
        appNavigate(ScreenParamEnum.Precheck);
      } else {
        appNavigate(ScreenParamEnum.VerifyAccount, {
          type: OTPTypesEnum.VERIFY_CUSTOMER_BEFORE_LOAN,
        });
      }
    } else {
      setIsModalVisible(true);
    }
  };

  return {
    reset,
    renderFrom,
    handleSubmit,
    watch,
    control,
    setValue,
    getValues,
    selectProduct,
    estimatePaymentMonthly,
    estimatePaymentMonthlyParamsInput,
    onPressSubmit,
    isModalVisible,
    setIsModalVisible,
  };
};

export default useSimulateScreen;

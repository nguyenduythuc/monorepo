import { useEffect, useMemo, useState } from 'react';
import { useCustomForm } from '@lfvn-customer/shared/components/Form/Form.hook';
import { FieldSimulateConfig } from '@lfvn-customer/shared/components/Form/Form.utils';
import {
  useGetMetadataQuery,
  useGetProductQuery,
  useGetPurposeQuery,
  usePreCheckMutation,
} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {
  ProductDataType,
  PurposeDataType,
} from '@lfvn-customer/shared/types/services/productTypes';
import { handleExecute } from '@lfvn-customer/shared/utils/simulateCalculate';
import { decryptAES } from '@lfvn-customer/shared/utils/decryptText';
import { useDispatch } from 'react-redux';
import { setSimulate } from '@lfvn-customer/shared/redux/slices/publicSlices';
import { useAppSelector } from '@lfvn-customer/shared/redux/store';
import Config from 'react-native-config';
import { Platform } from 'react-native';
import { useConfigRouting } from '.';
import { ScreenParamEnum } from '@lfvn-customer/shared/types/paramtypes';
import { OTPTypesEnum, CardTypesEnum } from '../types';
import {
  clearLoadingScreen,
  setLoadingScreen,
} from '../redux/slices/loadingSlices';

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
    const defaultSimulate =
      Platform.OS !== 'web'
        ? Config.DEFAULT_SIMULATE_FORMULATE
        : process.env.DEFAULT_SIMULATE_FORMULATE;

    useEffect(() => {
      dispatch(setSimulate(defaultSimulate));
    }, []);
  }

  const { data: productData } = useGetProductQuery();

  const { data: purposeData } = useGetPurposeQuery();

  const loanSimulate = useAppSelector(state => state.public.simulate);

  const stringFunc: string | null = useMemo(() => {
    // console.log((getState() as any).public.simulate)
    const decodeKey =
      Platform.OS !== 'web' ? Config.DECODE_KEY : process.env.DECODE_KEY;
    return decryptAES(loanSimulate, decodeKey);
  }, [loanSimulate]);

  const defaultProductData = {
    productCode: '999995',
    productName: 'Car Loan Stepup',
    maxAmount: '1000000000',
    minAmount: '10000000',
    interest: 10,
  };
  const defaultPurposeData = {
    name: 'Vay tiêu dùng',
    code: '02',
    product: '999994',
    template: null,
  };

  const loanProductData: ProductDataType[] = productData?.data || [
    defaultProductData,
  ];

  const loanPurposeData: PurposeDataType[] = purposeData?.data || [
    defaultPurposeData,
  ];

  const [selectProduct, setSelectProduct] = useState(loanProductData[0]);
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
        maxValue: parseInt(selectProduct?.maxAmount || '1'),
        minValue: 10000000,
        step: 1000000,
        defaultValue: (
          parseInt(selectProduct?.maxAmount || '1') / 2
        ).toString(),
      },
      {
        ...FieldSimulateConfig.SimulateTenor,
        maxValue: 36,
        minValue: 6,
        step: 1,
        defaultValue: '18',
      },
      FieldSimulateConfig.SimulateLoanInsurance,
    ];
  }, [selectProduct, productData, purposeData]);

  const { reset, renderFrom, handleSubmit, watch, control, setValue, getValues } =
    useCustomForm({
      fields,
      defaultValues: {},
    });

  const [
    simulateLoanProduct,
    simulateTenor,
    simulateLoanAmount,
    insuranceConfirm,
  ] = watch([
    'simulateLoanProduct',
    'simulateTenor',
    'simulateLoanAmount',
    'insuranceConfirm',
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

  useEffect(() => {
    const optionData = loanProductData.find(
      item => item.productCode === simulateLoanProduct,
    );

    const simulateLoanAmount = (
      parseInt(optionData?.maxAmount ?? '1') / 2
    ).toString();

    setSelectProduct(
      optionData || {
        productCode: '999994',
        productName: 'Car Loan Mix Ballon Stepup',
        maxAmount: '1000000000',
        interest: 10,
      },
    );
    setValue('simulateLoanAmount', simulateLoanAmount);
  }, [simulateLoanProduct]);

  const onPressSubmit = async () => {
    const simulateForm = getValues();
    console.log('simulateForm', simulateForm);
    if (insuranceConfirm) {
      if (user) {
        dispatch(setLoadingScreen());
        await precheck({
          customerName: user.fullName,
          customerNric: user.identityNumber,
          customerNricType: CardTypesEnum.CCCD,
          customerOldNric: user.identityNumberOld || '',
          customerAdditionalNric: [],
          customerProvince: '01',
          customerDistrict: '01009',
          customerWard: '0100900355',
          customerAddress: '267 Khương Trunggg',
          customerNricDate: user.identityIssue || '',
          customerNricExpiry: '2028-05-31T13:00:00.000Z',
          customerNricIssuer: '068',
          customerDOB: user.birthDate || '',
          customerGender: user.gender || '',
          customerNationality: user.nationality || '',
          identityReport: ['idd_4036F68C-0000-C614-890D-29E3A6F28D4F'],
          schemeCode: '',
          userId: user.login,
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
    onPressSubmit,
    isModalVisible,
    setIsModalVisible,
  };
};

export default useSimulateScreen;

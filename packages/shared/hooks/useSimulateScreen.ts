import {useEffect, useMemo, useState} from 'react';
import {useCustomForm} from '@lfvn-customer/shared/components/Form/Form.hook';
import {FieldSimulateConfig} from '@lfvn-customer/shared/components/Form/Form.utils';
import {
  useGetMetadataQuery,
  useGetProductQuery,
  useGetPurposeQuery,
} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {
  ProductDataType,
  PurposeDataType,
} from '@lfvn-customer/shared/types/services/productTypes';
import {handleExecute} from '@lfvn-customer/shared/utils/simulateCalculate';
import {decryptAES} from '@lfvn-customer/shared/utils/decryptText';
import {useDispatch} from 'react-redux';
import {setSimulate} from '@lfvn-customer/shared/redux/slices/publicSlices';
import {useAppSelector} from '@lfvn-customer/shared/redux/store';
import Config from 'react-native-config';
import {Platform} from 'react-native';

const useSimulateScreen = () => {
  const dispatch = useDispatch();

  const {data: metaData, error: metadataError} = useGetMetadataQuery();

  if (!metadataError) {
    dispatch(setSimulate(metaData?.data.simulate.jsFunctionContent));
  } else {
    const defaultSimulate =
      Platform.OS !== 'web'
        ? Config.DEAULT_SIMULATE_FORMULATE
        : process.env.DEAULT_SIMULATE_FORMULATE;
    dispatch(setSimulate(defaultSimulate));
  }

  const {data: productData} = useGetProductQuery();

  const {data: purposeData} = useGetPurposeQuery();

  const loanSimulate = useAppSelector(state => state.public.simulate);

  const stringFunc: string | null = useMemo(() => {
    // console.log((getState() as any).public.simulate)
    const decodeKey =
      Platform.OS !== 'web' ? Config.DECODE_KEY : process.env.DECODE_KEY;
    return decryptAES(loanSimulate, decodeKey);
  }, [loanSimulate]);

  const defaultData = {
    productCode: '999995',
    productName: 'Car Loan Stepup',
    maxAmount: '1000000000',
    minAmount: '10000000',
    interest: 10,
  };

  const loanProductData: ProductDataType[] = productData?.data || [defaultData];

  const loanPurposeData: PurposeDataType[] = purposeData?.data || [];

  const [selectProduct, setSelectProduct] = useState(loanProductData[0]);

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

  const {reset, renderFrom, handleSubmit, watch, control, setValue, getValues} =
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

  const submitAction = handleSubmit(() => {
    const simulateForm = getValues();
    console.log('simulateForm', simulateForm);
  });

  useEffect(() => {
    const optionData = loanProductData.find(
      item => item.productCode === simulateLoanProduct,
    );

    setSelectProduct(
      optionData || {
        productCode: '999994',
        productName: 'Car Loan Mix Ballon Stepup',
        maxAmount: '1000000000',
        interest: 10,
      },
    );
    setValue(
      'simulateLoanAmount',
      (parseInt(optionData?.maxAmount ?? '1') / 2).toString(),
    );
  }, [simulateLoanProduct]);

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
    submitAction,
  };
};

export default useSimulateScreen;

import {useEffect, useMemo, useState} from 'react';
import {useCustomForm} from '../components/Form/Form.hook';
import {FieldSimulateConfig} from '../components/Form/Form.utils';
import {dropdownOptionProduct} from '../types/components/dropdown';
import {
  useGetMetadataQuery,
  useGetProductQuery,
  useGetPurposeQuery,
} from '../redux/slices/apiSlices';
import {ProductDataType, PurposeDataType} from '../types/services/productTypes';
import {handleExecute} from '../utils/simulateCalculate';
import {decryptAES} from '../utils/decryptText';
import {useDispatch} from 'react-redux';
import {setSimulate} from '../redux/slices/publicSlices';
import {useAppSelector} from '../redux/store';

const useSimulateScreen = () => {
  const {
    data: productData,
    error: productError,
    isLoading: productLoading,
  } = useGetProductQuery();

  const {
    data: purposeData,
    error: purposeError,
    isLoading: purposeLoading,
  } = useGetPurposeQuery();

  const {
    data: metaData,
    error: metadataError,
    isLoading: metadataLoading,
  } = useGetMetadataQuery();

  // dispatch(setSimulate(metaData?.data.simulate.jsFunctionContent));
  const loanSimulate = useAppSelector(state => state.public.simulate);

  const stringFunc: string | null = useMemo(() => {
    // console.log((getState() as any).public.simulate)
    // console.log('loanSimulate', loanSimulate);
    return decryptAES(loanSimulate, 'bG90dGVmaW5hbmNlMjAyNGVmaW5hbmNl');
  }, []);

  const defaultData = {
    productCode: '999995',
    productName: 'Car Loan Stepup',
    maxAmount: '1000000000',
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
        minValue: 1,
        step: 100000,
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
  }, [selectProduct]);

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
      (parseInt(optionData?.maxAmount || '1') / 2).toString(),
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

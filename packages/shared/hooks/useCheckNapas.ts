import {useEffect, useMemo, useState} from 'react';
import {useCustomForm} from '@lfvn-customer/shared/components/Form/Form.hook';
import {FieldCheckNapas} from '@lfvn-customer/shared/components/Form/Form.utils';
import {
  useCheckNapasAccountMutation,
  useGetBankListDataMutation,
} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '@lfvn-customer/shared/redux/store';
import {useConfigRouting} from '.';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';

const useCheckNapas = () => {
  const dispatch = useDispatch();
  const [listBank] = useGetBankListDataMutation();
  const [checkNapasAccount] = useCheckNapasAccountMutation();

  const {dataSaleInfo} = useAppSelector(state => state.eSignForSale);
  const {appNavigate} = useConfigRouting();

  const getBankList = async () => {
    const result = await listBank({
      queryInput: {},
      limit: 100,
      skip: 0,
      sort: [],
    });

    if (result.data) {
      const options: {code: string; name: string}[] = [];
      result.data.data.map(item => {
        if (item.code) {
          options.push({
            name: item.bankName,
            code: item.code,
          });
        }
      });
      setListBankOption(options);
    } else {
      console.log('error', result.error);
    }
  };

  const [listBankOption, setListBankOption] = useState<
    {
      code: string;
      name: string;
    }[]
  >();

  useEffect(() => {
    getBankList();
  }, []);

  const fields = useMemo(() => {
    return [
      {
        ...FieldCheckNapas.CheckNapasBankList,
        options: listBankOption,
      },
      {
        ...FieldCheckNapas.CheckNapasBankAccount,
        value: '',
      },
    ];
  }, [listBankOption]);

  const {reset, renderFrom, handleSubmit, watch, control, setValue, getValues} =
    useCustomForm({
      fields,
      defaultValues: {},
    });

  useEffect(() => {
    if (listBankOption && listBankOption.length > 0) {
      setValue('bankName', listBankOption[0]?.code); // Update the bankName field with the first option
    }
  }, [listBankOption, setValue]);

  const [bankAccount, bankName] = watch(['bankAccount', 'bankName']);

  const onPressSubmit = async () => {
    const checkNapasForm = getValues();
    const {bankAccount, bankName} = checkNapasForm;

    const checkNapasBody = {
      id: dataSaleInfo?.saleImportId ?? '3',
      bankCode: bankName,
      accountNo: bankAccount,
      idCardNumber: dataSaleInfo?.idCardNumber ?? '017097000089',
      tokenEsign: dataSaleInfo?.tokenEsign ?? '',
    };

    const result = await checkNapasAccount(checkNapasBody);

    if (result.data) {
      if (result.data.result) {
        appNavigate(ScreenParamEnum.Home);
      } else {
        console.log('error', result.data.result);
      }
    } else {
      console.log('error');
    }
  };

  return {
    renderFrom,
    watch,
    handleSubmit,
    onPressSubmit,
  };
};

export default useCheckNapas;

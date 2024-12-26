import {useEffect, useMemo, useState} from 'react';
import {useCustomForm} from '@lfvn-customer/shared/components/Form/Form.hook';
import {FieldCheckNapas} from '@lfvn-customer/shared/components/Form/Form.utils';
import {
  useCheckNapasAccountMutation,
  useLazyGetBankListNapasDataQuery,
  useSaleImportDocsUploadWebMutation,
} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {useAppSelector} from '@lfvn-customer/shared/redux/store';
import {useConfigRouting} from '.';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';
import {useDispatch} from 'react-redux';
import {
  clearLoadingScreen,
  setLoadingScreen,
} from '@lfvn-customer/shared/redux/slices/loadingSlices';
import useShowToast from './useShowToast';
import {clearDataESignForSale} from '../redux/slices/eSignForSaleSlice';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {Keyboard} from 'react-native';

const useCheckNapas = () => {
  const [listBank] = useLazyGetBankListNapasDataQuery();
  const [checkNapasAccount] = useCheckNapasAccountMutation();
  const [uploadDocs] = useSaleImportDocsUploadWebMutation();

  const t = useTranslations();

  const dispatch = useDispatch();

  const {
    cccdInfo,
    avatarInfo,
    addressInfo,
    degreeInfo,
    resumeInfo,
    bankInfo,
    dataSaleInfo,
  } = useAppSelector(state => state.eSignForSale);
  const {appNavigate} = useConfigRouting();
  const {showCommonErrorToast, handleShowToast} = useShowToast();

  const getBankList = async () => {
    const result = await listBank();

    if (result.data) {
      const options: {code: string; name: string}[] = [];
      result.data.map(item => {
        if (item.code) {
          options.push({
            name: item.name,
            code: item.bankCode,
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
      {
        ...FieldCheckNapas.CheckNapasAccountName,
        value: '',
      },
      {
        ...FieldCheckNapas.CheckNapasAccountBranch,
        value: '',
      },
    ];
  }, [listBankOption]);

  const {renderFrom, handleSubmit, watch, setValue, getValues} = useCustomForm({
    fields,
    defaultValues: {},
  });

  useEffect(() => {
    if (listBankOption && listBankOption.length > 0) {
      setValue('bankName', listBankOption[0]?.code); // Update the bankName field with the first option
    }
  }, [listBankOption, setValue]);

  const onPressSubmit = handleSubmit(async () => {
    Keyboard.dismiss();
    const checkNapasForm = getValues();
    const {bankAccount, bankName, accountName, accountBranch} = checkNapasForm;
    const checkNapasBody = {
      id: dataSaleInfo?.saleImportId ?? '3',
      bankCode: bankName,
      accountNo: bankAccount,
      accountName,
      accountBranch,
      idCardNumber: dataSaleInfo?.idCardNumber ?? '017097000089',
      tokenEsign: dataSaleInfo?.tokenEsign ?? '',
    };
    try {
      dispatch(setLoadingScreen());
      const result = await checkNapasAccount(checkNapasBody);
      if (result.data) {
        if (result.data.result) {
          // upload docs esign
          const uploadDocsResult = await uploadDocs({
            saleImportId: dataSaleInfo?.saleImportId ?? '',
            idCardNumber: dataSaleInfo?.idCardNumber ?? '',
            docIdCard: cccdInfo?.links,
            docSelfie: avatarInfo?.links,
            docGtct: addressInfo?.links,
            docVb: degreeInfo?.links,
            docSyll: resumeInfo?.links,
            docBank: bankInfo?.links,
            tokenEsign: dataSaleInfo?.tokenEsign ?? '',
          });
          if (uploadDocsResult.data) {
            dispatch(clearDataESignForSale());
            handleShowToast({
              type: 'success',
              msg: t('CheckNapas.uploadSuccess'),
            });
            appNavigate(ScreenParamEnum.Home);
          } else {
            showCommonErrorToast();
          }
        } else {
          showCommonErrorToast();
        }
      } else {
        showCommonErrorToast();
      }
    } catch {
      showCommonErrorToast();
    } finally {
      dispatch(clearLoadingScreen());
    }
  });

  return {
    renderFrom,
    watch,
    onPressSubmit,
  };
};

export default useCheckNapas;

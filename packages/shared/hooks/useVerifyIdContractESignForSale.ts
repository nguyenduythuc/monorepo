import {useCustomForm} from '@lfvn-customer/shared/components/Form/Form.hook';
import {FieldESignForSale} from '@lfvn-customer/shared/components/Form/Form.utils';
import {Keyboard} from 'react-native';
import useShowToast from './useShowToast';
import {useConfigRouting} from './routing';
import useTranslations from './useTranslations';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';
import {useDispatch} from 'react-redux';
import {
  clearDataESignForSale,
  setDataSaleInfo,
} from '@lfvn-customer/shared/redux/slices/eSignForSaleSlice';
import downloadDraftContractApi from '@lfvn-customer/shared/redux/slices/apiSlices/downloadDraftContractApi';
import {
  clearLoadingScreen,
  setLoadingScreen,
} from '@lfvn-customer/shared/redux/slices/loadingSlices';

const useVerifyIdContractESignForSale = ({
  tokenEsign,
  saleImportId,
}: {
  tokenEsign: string;
  saleImportId: string;
}) => {
  const t = useTranslations();
  const fields = [
    FieldESignForSale.ESignPersonalCard,
    FieldESignForSale.ESignPhoneNumber,
  ];
  const {appNavigate} = useConfigRouting();
  const {showCommonErrorToast, handleShowToast} = useShowToast();

  const dispatch = useDispatch();

  const {reset, renderFrom, handleSubmit, watch, control, setValue, getValues} =
    useCustomForm({
      fields,
      defaultValues: {},
    });

  const onPressSubmit = handleSubmit(async () => {
    Keyboard.dismiss();
    dispatch(clearDataESignForSale());
    const {idCard, phoneNumber} = getValues();
    dispatch(
      setDataSaleInfo({
        saleImportId,
        tokenEsign,
        idCardNumber: idCard,
        phoneNumber,
      }),
    );
    try {
      dispatch(setLoadingScreen());
      const response = await downloadDraftContractApi({
        token: tokenEsign,
        idCardNumber: idCard,
        id: Number(saleImportId),
        phoneNumber,
      });
      // Read the file as a Blob
      if (response) {
        appNavigate(ScreenParamEnum.ViewContractEsignForSale, {
          uri: response,
        });
      } else {
        handleShowToast({
          msg: t('VerifyIdCardESignForSale.checkFail'),
          type: 'error',
        });
      }
    } catch (err) {
      console.log(err);
      showCommonErrorToast();
    } finally {
      dispatch(clearLoadingScreen());
    }
  });

  return {
    reset,
    renderFrom,
    handleSubmit,
    watch,
    control,
    setValue,
    getValues,
    onPressSubmit,
  };
};

export default useVerifyIdContractESignForSale;

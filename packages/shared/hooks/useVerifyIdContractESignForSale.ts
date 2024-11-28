import {useCustomForm} from '@lfvn-customer/shared/components/Form/Form.hook';
import {FieldESignForSale} from '@lfvn-customer/shared/components/Form/Form.utils';
import {useGetESignDraftMutation} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {Keyboard, Platform} from 'react-native';
import useShowToast from './useShowToast';
import {useConfigRouting} from './routing';
import useTranslations from './useTranslations';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';
import {useDispatch} from 'react-redux';
import {setDataSaleInfo} from '@lfvn-customer/shared/redux/slices/eSignForSaleSlice';
import downloadDraftContractApi from '@lfvn-customer/shared/redux/slices/apiSlices/downloadDraftContractApi.web';
import {
  clearLoadingScreen,
  setLoadingScreen,
} from '../redux/slices/loadingSlices';

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
  const [getESignDraft] = useGetESignDraftMutation();
  const {showCommonErrorToast, handleShowToast} = useShowToast();

  const dispatch = useDispatch();

  const {reset, renderFrom, handleSubmit, watch, control, setValue, getValues} =
    useCustomForm({
      fields,
      defaultValues: {},
    });

  const onPressSubmit = handleSubmit(async () => {
    Keyboard.dismiss();
    const {idCard, phoneNumber} = getValues();
    try {
      dispatch(setLoadingScreen());
      if (Platform.OS === 'web') {
        const response = await downloadDraftContractApi({
          token: tokenEsign,
          idCardNumber: idCard,
          id: Number(saleImportId),
          phoneNumber,
        });
        // Read the file as a Blob
        if (response) {
          const fileBlob = await response.blob();
          dispatch(
            setDataSaleInfo({
              saleImportId,
              tokenEsign,
              idCardNumber: idCard,
            }),
          );
          let pdfUri = URL.createObjectURL(fileBlob);
          appNavigate(ScreenParamEnum.ViewContractEsignForSale, {
            uri: pdfUri,
          });
        } else {
          handleShowToast({
            msg: t('VerifyIdCardESignForSale.checkFail'),
            type: 'error',
          });
        }
      } else {
        const response = await getESignDraft({
          token: tokenEsign,
          idCardNumber: idCard,
          id: Number(saleImportId),
          phoneNumber,
        });
        if (response.data) {
          const pdfUri = `data:application/pdf;base64,${response.data}`;
          appNavigate(ScreenParamEnum.ViewContractEsignForSale, {
            uri: pdfUri,
          });
        } else {
          handleShowToast({
            msg: t('VerifyIdCardESignForSale.checkFail'),
            type: 'error',
          });
        }
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

import {useCustomForm} from '@lfvn-customer/shared/components/Form/Form.hook';
import {FieldTestConfig} from '@lfvn-customer/shared/components/Form/Form.utils';
import {useVerifySaleMutation} from '@lfvn-customer/shared/redux/slices/apiSlices';
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
import {
  setLoadingScreen,
  clearLoadingScreen,
} from '@lfvn-customer/shared/redux/slices/loadingSlices';

const useVerifyIdCardESignForSale = ({
  tokenEsign,
  saleImportId,
  docTypes,
}: {
  tokenEsign: string;
  saleImportId: string;
  docTypes?: string;
}) => {
  const t = useTranslations();
  const fields = [FieldTestConfig.SignUpPersonalCard];
  const {appNavigate} = useConfigRouting();
  const [verifySale] = useVerifySaleMutation();
  const {showCommonErrorToast, handleShowToast} = useShowToast();

  const dispatch = useDispatch();

  const {reset, renderFrom, handleSubmit, watch, control, setValue, getValues} =
    useCustomForm({
      fields,
      defaultValues: {},
    });

  const onPressSubmit = handleSubmit(async () => {
    Keyboard.dismiss();
    const {idCard} = getValues();
    dispatch(clearDataESignForSale());
    try {
      dispatch(setLoadingScreen());
      const response = await verifySale({
        token: tokenEsign,
        idCardNumber: idCard,
        id: Number(saleImportId),
      });
      if (response.data) {
        dispatch(
          setDataSaleInfo({
            saleImportId,
            tokenEsign,
            idCardNumber: idCard,
            rollbackDocsTypes: docTypes,
          }),
        );
        if (!docTypes) {
          appNavigate(ScreenParamEnum.UploadDocsEsignForSale, {
            saleImportId,
            tokenEsign,
          });
        } else {
          appNavigate(ScreenParamEnum.UploadDocsRollbackEsignForSale);
        }
      } else {
        handleShowToast({
          msg: t('VerifyIdCardESignForSale.checkFail'),
          type: 'error',
        });
      }
    } catch {
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

export default useVerifyIdCardESignForSale;

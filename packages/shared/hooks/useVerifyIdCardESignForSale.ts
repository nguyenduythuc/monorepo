import {useCustomForm} from '@lfvn-customer/shared/components/Form/Form.hook';
import {FieldTestConfig} from '@lfvn-customer/shared/components/Form/Form.utils';
import {useVerifySaleMutation} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {Keyboard} from 'react-native';
import useShowToast from './useShowToast';
import {useConfigRouting} from './routing';
import useTranslations from './useTranslations';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';
import {useDispatch} from 'react-redux';
import {setDataSaleInfo} from '../redux/slices/eSignForSaleSlice';

const useVerifyIdCardESignForSale = ({
  tokenEsign,
  saleImportId,
}: {
  tokenEsign: string;
  saleImportId: string;
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
    try {
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
          }),
        );
        appNavigate(ScreenParamEnum.UploadDocsEsignForSale, {
          saleImportId,
          tokenEsign,
        });
      } else {
        handleShowToast({
          msg: t('VerifyIdCardESignForSale.checkFail'),
          type: 'error',
        });
      }
    } catch {
      showCommonErrorToast();
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

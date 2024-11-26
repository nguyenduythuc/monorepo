import {useCustomForm} from '@lfvn-customer/shared/components/Form/Form.hook';
import {FieldESignForSale} from '@lfvn-customer/shared/components/Form/Form.utils';
import {useGetESignDraftMutation} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {Keyboard} from 'react-native';
import useShowToast from './useShowToast';
import {useConfigRouting} from './routing';
import useTranslations from './useTranslations';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';
import {useDispatch} from 'react-redux';
import {setDataSaleInfo} from '../redux/slices/eSignForSaleSlice';

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
      const response = await getESignDraft({
        token: tokenEsign,
        idCardNumber: idCard,
        id: Number(saleImportId),
        phoneNumber,
      });
      if (response.data) {
        dispatch(
          setDataSaleInfo({
            saleImportId,
            tokenEsign,
            idCardNumber: idCard,
          }),
        );
        appNavigate(ScreenParamEnum.VerifyEsignForSale, {
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

export default useVerifyIdContractESignForSale;

import {
  useCreateAPLMutation,
  useSubmitSuggestTRMutation,
} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {useConfigRouting} from './routing';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';
import {
  MetaDataRequestProps,
  SubmmitSuggestTRRequestProps,
} from '@lfvn-customer/shared/types/services/loanTypes';
import useShowToast from './useShowToast';
import useTranslations from './useTranslations';
import {useDispatch} from 'react-redux';
import {
  setLoadingScreen,
  clearLoadingScreen,
} from '@lfvn-customer/shared/redux/slices/loadingSlices';

const useHandleCreateAPL = () => {
  const {appNavigate} = useConfigRouting();
  const [createAPL] = useCreateAPLMutation();
  const [submitSuggestTRMutation] = useSubmitSuggestTRMutation();
  const dispatch = useDispatch();

  const t = useTranslations();
  const {handleShowToast} = useShowToast();

  const onHandleShowToast = () => {
    handleShowToast({
      msg: t('ErrorCommon.message'),
      type: 'error',
    });
  };

  const onHandleCreateAPL = async (body: MetaDataRequestProps) => {
    dispatch(setLoadingScreen());
    try {
      const response = await createAPL(body);
      const flowId = response.data?.data.flowId;
      if (!flowId) {
        onHandleShowToast();
        return;
      }
      appNavigate(ScreenParamEnum.CifInfoPendingCheck, {
        flowId,
        productCode: body.schemeCode,
      });
    } catch {
      handleShowToast({
        msg: t('ErrorCommon.message'),
        type: 'error',
      });
    } finally {
      dispatch(clearLoadingScreen());
    }
  };

  const onHandleSubmitSuggestTR = async (
    body: SubmmitSuggestTRRequestProps,
  ) => {
    dispatch(setLoadingScreen());
    try {
      // TODO: handle step after 6.3
      await submitSuggestTRMutation(body);
    } catch {
      onHandleShowToast();
    } finally {
      dispatch(clearLoadingScreen());
    }
  };

  return {
    onHandleCreateAPL,
    onHandleSubmitSuggestTR,
  };
};

export default useHandleCreateAPL;

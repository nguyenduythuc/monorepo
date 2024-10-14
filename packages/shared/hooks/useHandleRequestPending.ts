import {
  useRequestPendingByUserMutation,
  useSaveDaftAPLMutation,
} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {useDispatch} from 'react-redux';
import {
  PreCheckStatusEnum,
  RequestPendingStepEnum,
} from '@lfvn-customer/shared/types';
import {useConfigRouting} from './routing';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';
import {
  PreCheckRequestProps,
  RequestPendingRequestProps,
} from '@lfvn-customer/shared/types/services/loanTypes';
import {setRequestPendingMetadata} from '@lfvn-customer/shared/redux/slices/productSlices';
import useShowToast from './useShowToast';
import useTranslations from './useTranslations';

const useHandleRequestPending = () => {
  const {appNavigate} = useConfigRouting();
  const {handleShowToast} = useShowToast();

  const [saveDaftAPL] = useSaveDaftAPLMutation();
  const [requestPendingByUser] = useRequestPendingByUserMutation();

  const t = useTranslations();
  const dispatch = useDispatch();

  const onHandleShowToast = () => {
    handleShowToast({
      msg: t('ErrorCommon.message'),
      type: 'error',
    });
  };

  const onHandleSaveDaftAPL = async (body: RequestPendingRequestProps) => {
    const saveDaftAPLResult = await saveDaftAPL(body);
    if (saveDaftAPLResult.data?.metadata) {
      dispatch(setRequestPendingMetadata(saveDaftAPLResult.data.metadata));
    }
  };

  const onCheckRequestPending = async (userId: string) => {
    try {
      const result = await requestPendingByUser({
        queryInput: {
          userId,
        },
      });
      if (result?.data) {
        if (result.data.currentStep === RequestPendingStepEnum.PRE_CHECK) {
          if (result.data.metadata.status === PreCheckStatusEnum.DONE) {
            const requestData = JSON.parse(
              result.data.metadata.requestData,
            ) as PreCheckRequestProps;
            const {loanSimulateProps, ...rest} = requestData;
            const bodyRequestPending = {
              userId,
              currentStep: RequestPendingStepEnum.LOAN_INFORMATION,
              productCode: loanSimulateProps.schemeCode,
              metadata: {
                ...rest,
                ...loanSimulateProps,
                createdOn: new Date().toISOString(),
                preCheckId: result.data.metadata.precheckId,
                folderId: 'idf_703FEB8E-0000-C83A-A11C-D6E750511B6F', // TODO: get folderId from api
              },
            };
            await onHandleSaveDaftAPL(bodyRequestPending);
          } else if (
            result.data.metadata.status === PreCheckStatusEnum.PROCESSING
          ) {
            appNavigate(ScreenParamEnum.Precheck);
          }
        } else {
          dispatch(setRequestPendingMetadata(result.data.metadata));
        }
      } else {
        onHandleShowToast();
      }
    } catch {
      onHandleShowToast();
    }
  };

  return {
    onCheckRequestPending,
    onHandleSaveDaftAPL,
  };
};

export default useHandleRequestPending;

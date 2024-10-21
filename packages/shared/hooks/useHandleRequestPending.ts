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

const useHandleRequestPending = () => {
  const {appNavigate} = useConfigRouting();
  const {showCommonErrorToast} = useShowToast();

  const [saveDaftAPL] = useSaveDaftAPLMutation();
  const [requestPendingByUser] = useRequestPendingByUserMutation();

  const dispatch = useDispatch();

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
      if (!result?.data) {
        showCommonErrorToast();
        return;
      }
      if (result.data.currentStep !== RequestPendingStepEnum.PRE_CHECK) {
        dispatch(setRequestPendingMetadata(result.data.metadata));
        return;
      }
      if (result.data.metadata.status === PreCheckStatusEnum.PROCESSING) {
        appNavigate(ScreenParamEnum.Precheck);
        return;
      }
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
            // folderId: 'idf_703FEB8E-0000-C83A-A11C-D6E750511B6F', // TODO: get folderId from api
          },
        };
        await onHandleSaveDaftAPL(bodyRequestPending);
        return;
      }
      appNavigate(ScreenParamEnum.Precheck);
    } catch {
      showCommonErrorToast();
    }
  };

  return {
    onCheckRequestPending,
    onHandleSaveDaftAPL,
  };
};

export default useHandleRequestPending;

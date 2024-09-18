import {
  useRequestPendingByUserMutation,
  useSaveDaftAPLMutation,
} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {useDispatch} from 'react-redux';
import {PreCheckStatusEnum, RequestPendingStepEnum} from '../types';
import {useConfigRouting} from './routing';
import {ScreenParamEnum} from '../types/paramtypes';
import {PreCheckRequestProps} from '../types/services/loanTypes';
import {setRequestPendingMetadata} from '../redux/slices/productSlices';

const useHandleRequestPending = () => {
  const {appNavigate} = useConfigRouting();
  const [saveDaftAPL] = useSaveDaftAPLMutation();
  const [requestPendingByUser] = useRequestPendingByUserMutation();

  const dispatch = useDispatch();

  const onCheckRequestPending = async (userId: string) => {
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
          const saveDaftAPLResult = await saveDaftAPL({
            userId,
            currentStep: RequestPendingStepEnum.LOAN_INFORMATION,
            productCode: loanSimulateProps.schemeCode,
            metadata: {
              ...rest,
              ...loanSimulateProps,
              createdOn: new Date().toISOString(),
            },
          });
          dispatch(setRequestPendingMetadata(saveDaftAPLResult.data?.metadata));
        } else if (
          result.data.metadata.status === PreCheckStatusEnum.PROCESSING
        ) {
          appNavigate(ScreenParamEnum.Precheck);
        }
      } else {
        dispatch(setRequestPendingMetadata(result.data.metadata));
      }
    }
  };

  return {
    onCheckRequestPending,
  };
};

export default useHandleRequestPending;

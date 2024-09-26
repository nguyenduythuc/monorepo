import {useCreateAPLMutation} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {useConfigRouting} from './routing';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';
import {MetaDataRequestProps} from '@lfvn-customer/shared/types/services/loanTypes';

const useHandleCreateAPL = () => {
  const {appNavigate} = useConfigRouting();
  const [createAPL] = useCreateAPLMutation();

  const onHandleCreateAPL = async (body: MetaDataRequestProps) => {
    await createAPL(body);
    appNavigate(ScreenParamEnum.Home); // todo : check T/R
  };

  return {
    onHandleCreateAPL,
  };
};

export default useHandleCreateAPL;

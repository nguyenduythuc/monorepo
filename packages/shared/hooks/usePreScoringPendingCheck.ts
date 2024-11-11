import {useEffect} from 'react';
import {useConfigRouting} from './routing';
import {useGetAplDataMutation} from '../redux/slices/apiSlices';
import useShowToast from './useShowToast';
import {useDispatch} from 'react-redux';
import {setLoanOfferResult} from '../redux/slices/productSlices';
import {useAppSelector} from '../redux/store';

const INTERVAL_TIME = 3000;

const usePreScoringPendingCheck = () => {
  const {goBack} = useConfigRouting();
  const {showCommonErrorToast} = useShowToast();
  const dispatch = useDispatch();

  const {requestPendingMetadata} = useAppSelector(state => state.product);

  const [getAplData] = useGetAplDataMutation();

  useEffect(() => {
    const unsubcribe = setInterval(async () => {
      try {
        const responseAplInfo = await getAplData({
          flowId: requestPendingMetadata?.flowId ?? '',
        });
        if (responseAplInfo.data) {
          const aplData = responseAplInfo.data;
          if (aplData?.data?.apl?.loanOfferResult) {
            const loanOfferResult = aplData?.data.apl.loanOfferResult;
            if (loanOfferResult.result === 'Qualify') {
              dispatch(setLoanOfferResult(loanOfferResult));
            } else {
              // review loan offer fail
            }
            clearInterval(unsubcribe);
            goBack();
          }
        }
      } catch {
        showCommonErrorToast();
      }
    }, INTERVAL_TIME);
    return () => {
      clearInterval(unsubcribe);
    };
  }, []);
};

export default usePreScoringPendingCheck;

import {useEffect, useMemo} from 'react';
import useShowToast from './useShowToast';
import {useDispatch} from 'react-redux';
import {setLoanOfferResult} from '@lfvn-customer/shared/redux/slices/productSlices';
import {useAppSelector} from '@lfvn-customer/shared/redux/store';
import useHandleRequestPending from './useHandleRequestPending';
import {
  LoanReviewInfoProps,
  MetaDataRequestProps,
} from '@lfvn-customer/shared/types/services/loanTypes';
import {RequestPendingStepEnum} from '@lfvn-customer/shared/types';
import {useConfigRouting} from './routing';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';
import {useLoanOfferMutation} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {
  clearLoadingScreen,
  setLoadingScreen,
} from '@lfvn-customer/shared/redux/slices/loadingSlices';

const useReviewLoanOffer = () => {
  const {showCommonErrorToast, handleShowToast} = useShowToast();
  const dispatch = useDispatch();

  const {appNavigate} = useConfigRouting();

  const {requestPendingMetadata, loanOfferResult} = useAppSelector(
    state => state.product,
  );

  const {onHandleSaveDaftAPL} = useHandleRequestPending();
  const [loanOffer] = useLoanOfferMutation();

  const cardRawData: LoanReviewInfoProps = useMemo(() => {
    return {
      loanProduct: requestPendingMetadata?.product,
      loanAmount: requestPendingMetadata?.amount,
      loanTenor: requestPendingMetadata?.loanTerm,
      interestMonthly:
        requestPendingMetadata?.expectedRepaymentSchedule?.[0]?.interestMonthly,
      interestRate:
        requestPendingMetadata?.expectedRepaymentSchedule?.[0]?.interestMonthly,
      loanInsuranceFee: requestPendingMetadata?.insuranceFee,
    };
  }, [requestPendingMetadata]);

  useEffect(() => {
    if (loanOfferResult) {
      (async () => {
        try {
          const metadata: MetaDataRequestProps = {
            ...requestPendingMetadata,
            loanOfferResult,
          };
          const bodyRequestPending = {
            userId: requestPendingMetadata?.userId ?? '',
            currentStep: RequestPendingStepEnum.VERIFY_INFORMATION,
            productCode: requestPendingMetadata?.schemeCode ?? '',
            metadata,
          };
          await onHandleSaveDaftAPL(bodyRequestPending);
          dispatch(setLoanOfferResult(undefined)); // remove data when save to draft apl
        } catch {
          showCommonErrorToast();
        }
      })();
    }
  }, [loanOfferResult, requestPendingMetadata]);

  const handleConfirmLoanOffer = async (isAcceptLoanOffer: boolean) => {
    try {
      dispatch(setLoadingScreen());
      const response = await loanOffer({
        flowId: requestPendingMetadata?.flowId ?? '',
        action: 'approve',
        userConfirmLoanOffer: isAcceptLoanOffer ? 'true' : 'false',
      });
      if (response.data) {
        if (isAcceptLoanOffer) {
          appNavigate(ScreenParamEnum.Home);
          handleShowToast({
            msg: 'Đồng ý khoản vay thành công', // TODO: should be countinue step 9.1
            type: 'success',
          });
        } else {
          appNavigate(ScreenParamEnum.LoanInformation);
        }
      } else {
        showCommonErrorToast();
      }
    } catch {
      showCommonErrorToast();
    } finally {
      dispatch(clearLoadingScreen());
    }
  };

  return {
    handleConfirmLoanOffer,
    cardRawData,
  };
};

export default useReviewLoanOffer;

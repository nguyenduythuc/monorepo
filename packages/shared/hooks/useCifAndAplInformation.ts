import {useEffect, useState} from 'react';
import {useConfigRouting} from './routing';
import {
  //   useCheckTRAndProductMutation,
  useGetAplDataMutation,
  useGetCifDataMutation,
  //   useLazyGetCifInfoQuery,
} from '../redux/slices/apiSlices';
import useTranslations from './useTranslations';
import {useDispatch} from 'react-redux';
// import {setCifMetadata} from '../redux/slices/productSlices';
import {getVerifyAccountInfo} from '../utils/commonFunction';
import {DEVICE_INFO} from '../utils/constants';
import {
  GetAPLDataTypeProps,
  MetaDataRequestProps,
} from '../types/services/loanTypes';
import useShowToast from './useShowToast';
import {
  clearLoadingScreen,
  setLoadingScreen,
} from '../redux/slices/loadingSlices';
import {ScreenParamEnum} from '../types/paramtypes';
import {useAppSelector} from '../redux/store';
import {RequestPendingStepEnum} from '../types';
import useHandleRequestPending from './useHandleRequestPending';

const INTERVAL_TIME = 3000;

const useCifAndAplInformation = ({flowId}: {flowId: string}) => {
  //   const {handleShowToast} = useShowToast();
  const dispatch = useDispatch();
  const {handleShowToast} = useShowToast();

  const t = useTranslations();
  const {appNavigate, goBack} = useConfigRouting();
  const {requestPendingMetadata} = useAppSelector(state => state.product);
  const {onHandleSaveDaftAPL} = useHandleRequestPending();
  //   const [getCifInfo] = useLazyGetCifInfoQuery();
  //   const [checkTRAndProduct] = useCheckTRAndProductMutation();
  const [cifData, setCifData] = useState<object[]>([]);
  const [aplData, setAplDate] = useState<GetAPLDataTypeProps | undefined>();

  const [getCifData] = useGetCifDataMutation();
  const [getAplData] = useGetAplDataMutation();

  const deviceInfo = JSON.parse(getVerifyAccountInfo(DEVICE_INFO) || '');

  const onHandleGetCifData = async () => {
    try {
      const body = {
        deviceId: deviceInfo.deviceIdData,
        flowId: flowId,
        customerNric: '020200006487',
        customerAdditionalNric: '',
        customerName: 'Đặng Hữu Thanh',
      };
      const responseCifData = await getCifData(body);
      if (responseCifData.data) {
        const cifData = responseCifData.data.data;
        setCifData(cifData.data.cifs);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onHandleGetAplData = async () => {
    try {
      const body = {flowId: flowId};
      const responseAplData = await getAplData(body);
      if (responseAplData.data) {
        const aplData = responseAplData.data.data;
        setAplDate(aplData.apl);
      }
    } catch (error) {
      console.log('err', error);
    }
  };

  const onHandlePrescoring = () => {
    const interval = setInterval(async () => {
      dispatch(setLoadingScreen());
      try {
        const responseAplInfo = await getAplData({flowId});
        if (responseAplInfo.data) {
          const aplData = responseAplInfo.data;
          if (aplData?.data.apl) {
            console.log('aplData?.data.apl', aplData?.data.apl);
            const loanOfferResult = aplData?.data.apl.loanOfferResult;
            if (loanOfferResult.result === 'Qualify') {
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
              console.log('bodyRequestPending1234', bodyRequestPending);
              await onHandleSaveDaftAPL(bodyRequestPending);

              dispatch(clearLoadingScreen());
              clearInterval(interval);
              appNavigate(ScreenParamEnum.LoanOffer);
              // Go to loan offer screen
            }
          }
        }
      } catch {
        handleShowToast({
          msg: t('ErrorCommon.message'),
          type: 'error',
        });
      }
    }, INTERVAL_TIME);

    return () => {
      clearInterval(interval);
    };
  };

  const setTimeForPrescoring = () => {
    const setTime = setTimeout(() => {
      onHandlePrescoring();
    }, 10000);
    return clearTimeout(setTime);
  };

  return {
    onHandleGetCifData,
    onHandleGetAplData,
    cifData,
    aplData,
    onHandlePrescoring,
    setTimeForPrescoring,
  };
};

export default useCifAndAplInformation;

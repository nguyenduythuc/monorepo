import {
  useCreateAPLMutation,
  useCreateFolderEcmMutation,
  useLazyGetUserResourceQuery,
  useSubmitRbpInfoMutation,
  useSubmitSuggestTRMutation,
} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {useConfigRouting} from './routing';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';
import {
  MetaDataRequestProps,
  SubmitRbpInfoRequestProps,
  SubmitSuggestTRRequestProps,
} from '@lfvn-customer/shared/types/services/loanTypes';
import useShowToast from './useShowToast';
import useTranslations from './useTranslations';
import {useDispatch} from 'react-redux';
import {
  setLoadingScreen,
  clearLoadingScreen,
} from '@lfvn-customer/shared/redux/slices/loadingSlices';
import useHandleRequestPending from '@lfvn-customer/shared/hooks/useHandleRequestPending';
import {useAppSelector} from '@lfvn-customer/shared/redux/store';
import {RequestPendingStepEnum} from '@lfvn-customer/shared/types';

import moment from 'moment';
import useHandleSaveFile from './useHandleSaveFile';

const useHandleCreateAPL = () => {
  const {requestPendingMetadata} = useAppSelector(state => state.product);
  const {appNavigate} = useConfigRouting();
  const [createAPL] = useCreateAPLMutation();
  const [createFolderEcm] = useCreateFolderEcmMutation();
  const [submitSuggestTRMutation] = useSubmitSuggestTRMutation();
  const [submitRbpInfo] = useSubmitRbpInfoMutation();
  const [getUserResource] = useLazyGetUserResourceQuery();

  const {onHandleSaveDaftAPL} = useHandleRequestPending();
  const dispatch = useDispatch();

  const {handleUploadDocEcm} = useHandleSaveFile();

  const t = useTranslations();
  const {handleShowToast} = useShowToast();

  const onHandleShowToast = () => {
    handleShowToast({
      msg: t('ErrorCommon.message'),
      type: 'error',
    });
  };

  const handleDownloadUserResourceFileAndUploadEcm = async (
    body: MetaDataRequestProps,
    flowId: string,
  ) => {
    const docIds: string[] = [];
    const userResourceResponse = await getUserResource({
      userId: body.customerNric ?? '',
    });
    if (!userResourceResponse.data?.length) {
      return docIds;
    }
    await Promise.all(
      userResourceResponse.data.map(async item => {
        const uploadDocEcmResponse = await handleUploadDocEcm({
          fileName: item.fileName,
          flowId,
          customerNric: body.customerNric ?? '',
        });
        if (uploadDocEcmResponse?.data.uploadedResult.documentList.docId) {
          docIds.push(
            uploadDocEcmResponse.data.uploadedResult.documentList.docId,
          );
        }
      }),
    );
    return docIds;
  };

  const onHandleCreateAPL = async (body: MetaDataRequestProps) => {
    dispatch(setLoadingScreen());
    try {
      const responseCreateFolder = await createFolderEcm({
        identity: body.customerNric ?? '',
        datecreated: moment().format('YYYYMMDD'),
        customerName: body.customerName ?? '',
        // business: body.business ?? '',
        // product: body.product ?? '',
        // subproduct: body.subproduct ?? '',
        // process: body.process ?? '',
        business: 'DL', // TODO: get data from BE
        product: 'DL_CARLOAN1',
        subproduct: 'DC055',
        process: 'CarLoan',
      });
      if (!responseCreateFolder?.data) {
        onHandleShowToast();
        return;
      }
      const folderId = responseCreateFolder.data?.data.folderId;
      const docIds = await handleDownloadUserResourceFileAndUploadEcm(
        body,
        folderId,
      );
      const createAPLBody = {
        ...body,
        folderId,
        identityReport: docIds,
      };
      const response = await createAPL(createAPLBody);
      const flowId = response.data?.data.flowId;
      if (!flowId) {
        onHandleShowToast();
        return;
      }
      const metadata: MetaDataRequestProps = {
        ...createAPLBody,
        flowId,
      };
      const bodyRequestPending = {
        userId: requestPendingMetadata?.userId ?? '',
        currentStep: RequestPendingStepEnum.LOAN_INFORMATION,
        productCode: requestPendingMetadata?.schemeCode ?? '',
        metadata,
      };
      await onHandleSaveDaftAPL(bodyRequestPending);
      appNavigate(ScreenParamEnum.CifInfoPendingCheck, {
        flowId,
        productCode: body.schemeCode,
      });
    } catch {
      onHandleShowToast();
    } finally {
      dispatch(clearLoadingScreen());
    }
  };

  const onHandleSubmitSuggestTR = async (body: SubmitSuggestTRRequestProps) => {
    dispatch(setLoadingScreen());
    try {
      // TODO: check loan offer from response BE (step 8.3)
      await submitSuggestTRMutation(body);
    } catch {
      onHandleShowToast();
    } finally {
      dispatch(clearLoadingScreen());
    }
  };

  const onHandleSubmitRbpInfo = async (data: MetaDataRequestProps) => {
    dispatch(setLoadingScreen());
    const body: SubmitRbpInfoRequestProps = {
      flowId: data.flowId,
      action: 'approve',
      schemeId: data.schemeId,
      amount: data.amount,
      loanTerm: data.loanTerm,
      interest: data.interest,
      expectedMonthlyPayment: '750000',
      insuranceFee: data.insuranceFee,
      participateInLoanInsurance: data.participateInLoanInsurance?.toString(),
      loanPurpose: data.loanPurpose,
      customerMonthlyIncome: data.incomeMonthly,
      customerWorkingTime: data.loanPreviousCompanyWorkingTime,
      insuranceTime: data.loanInsuranceDuration,
      customerMaritalStatus: data.loanMarriedStatus,
      customerMailingProvince: data.customerProvince,
      customerMailingDistrict: data.customerDistrict,
      customerMailingWard: data.customerWard,
      customerMailingAddress: data.customerAddress,
      customerOccupation: data.loanOccupation,
    };
    try {
      const result = await submitRbpInfo(body);
      if (result.data?.message === 'success') {
        appNavigate(ScreenParamEnum.PreScoringPendingCheck);
      } else {
        console.log();
      }
    } catch {
      onHandleShowToast();
    } finally {
      dispatch(clearLoadingScreen());
    }
  };

  return {
    onHandleCreateAPL,
    onHandleSubmitSuggestTR,
    onHandleSubmitRbpInfo,
  };
};

export default useHandleCreateAPL;

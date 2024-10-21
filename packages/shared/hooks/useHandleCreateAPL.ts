import {
  useCreateAPLMutation,
  useCreateFolderEcmMutation,
  useLazyGetUserResourceQuery,
  useSubmitRbpInfoMutation,
  useSubmitSuggestTRMutation,
  useUploadDocumentEcmMutation,
} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {useConfigRouting} from './routing';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';
import {
  MetaDataRequestProps,
  SubmitRbpInfoRequestProps,
  SubmmitSuggestTRRequestProps,
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
import RNFS from 'react-native-fs';
import {handleEnvByPlatform} from '@lfvn-customer/shared/utils/handleEnvByPlatform';
import {getToken} from '@lfvn-customer/shared/redux/slices/apiSlices/config';
import moment from 'moment';
import {removeFileAfterUpload} from '@lfvn-customer/shared/utils';

const useHandleCreateAPL = () => {
  const {requestPendingMetadata} = useAppSelector(state => state.product);

  const {appNavigate} = useConfigRouting();
  const [createAPL] = useCreateAPLMutation();
  const [createFolderEcm] = useCreateFolderEcmMutation();
  const [submitSuggestTRMutation] = useSubmitSuggestTRMutation();
  const [submitRbpInfo] = useSubmitRbpInfoMutation();
  const [getUserResource] = useLazyGetUserResourceQuery();
  const [uploadDocumentEcmMutation] = useUploadDocumentEcmMutation();

  const {onHandleSaveDaftAPL} = useHandleRequestPending();
  const dispatch = useDispatch();

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
        const url = `${handleEnvByPlatform('BASE_API_URL')}/api/files/download/${item.fileName}`;
        const filePath = RNFS.DocumentDirectoryPath + `/${item.fileName}`;
        await RNFS.downloadFile({
          fromUrl: url,
          toFile: filePath,
          background: true,
          discretionary: true,
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
          .promise.then(async () => {
            const uploadDocEcmResponse = await uploadDocumentEcmMutation({
              objectid: flowId,
              docType: 'DOC100',
              docName: 'KH CMND/CCCD/CMTQĐ/ Hộ chiếu',
              fileType: 'jpg',
              identity: body.customerNric ?? '',
              file: {
                uri: filePath,
                type: 'image/jpeg',
                name: item.fileName,
              },
            });

            if (
              uploadDocEcmResponse.data?.data.uploadedResult.documentList.docId
            ) {
              docIds.push(
                uploadDocEcmResponse.data?.data.uploadedResult.documentList
                  .docId,
              );
              // Delete file after upload
              removeFileAfterUpload(filePath);
            }
          })
          .catch(err => {
            console.log('Download error:', err);
          });
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

  const onHandleSubmitSuggestTR = async (
    body: SubmmitSuggestTRRequestProps,
  ) => {
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
      loanAmount: data.amount,
      loanTerm: data.loanTerm,
      interest: data.interest,
      paymentMonthly: '750000', // Số tiền trả hàng tháng dự kiến
      insurance: data.participateInLoanInsurance,
      insuranceAmount: data.insuranceFee,
      incomeMonthly: data.incomeMonthly,
      purposeUse: data.loanPurpose,
      workingTime: '50', // TODO: get from data input
      insuranceTime: '15', // TODO: Chưa biết lấy data ở đâu
      merialStatus: 'married', // TODO: get from data input
      residentialAddress: 'Đồng Cương - Yên Lạc - Vĩnh Phúc', // TODO: get from verify cus step
      province: 'Hà Nội', // TODO: get from verify cus step
      district: 'Đống Đa', // TODO: get from verify cus step
      ward: 'Khâm Thiên', // TODO: get from verify cus step
      address: data.customerAddress,
      mailingProvince: data.customerProvince,
      mailingDistrict: data.customerDistrict,
      mailingWard: data.customerWard,
      mailingAddress: data.customerAddress,
      occupation: '132', // TODO: get from data input
    };
    try {
      await submitRbpInfo(body);
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

import {
  ekycDataType,
  webEkycDataType,
  WebOCRResultType,
} from '@lfvn-customer/shared/types/services/verifyCustomerTypes';
import useShowToast from './useShowToast';
import useHandleSaveFile from './useHandleSaveFile';
import {webConfigInfo} from '@lfvn-customer/shared/utils/TrueId';
import {useUpdateEKYCMutation} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {useAppSelector} from '@lfvn-customer/shared/redux/store';
import useTranslations from './useTranslations';

const useHandleStartEkyc = () => {
  const {handleShowToast} = useShowToast();
  const {handleUploadUserResouce} = useHandleSaveFile();
  const [updateEKYC] = useUpdateEKYCMutation();

  const t = useTranslations();

  const {dataSaleInfo} = useAppSelector(state => state.eSignForSale);

  const closeEkycLabel = 'Close EKYC';

  const startEkyc = ({
    identityNumber,
    handleEkycSubmit,
  }: {
    identityNumber?: string;
    handleEkycSubmit: (
      ekycData: ekycDataType | webEkycDataType,
      selfieImg?: string,
      frontSide?: string,
      backSide?: string,
    ) => void;
  }) => {
    // Todo set up true id web
    if (window?.TrueIDSDK && window?.TrueIDSDK.start) {
      let callBack = async (result: WebOCRResultType) => {
        console.log('SDK result', result);
        if (result.code == 0) {
          // user close sdk
          handleShowToast({
            msg: closeEkycLabel,
            type: 'info',
          });
        } else if (result.code == 1) {
          await updateEKYC({
            id: dataSaleInfo?.saleImportId ?? '',
            idCardNumber: dataSaleInfo?.idCardNumber ?? '',
            tokenEsign: dataSaleInfo?.tokenEsign ?? '',
            ekycResult: result.decision.decision !== 'REJECTED',
          });
          if (result.decision.decision === 'REJECTED') {
            handleShowToast({
              msg: t('VerifyIdCardESignForSale.notMatch'),
              type: 'error',
            });
            return;
          } else {
            if (
              dataSaleInfo?.idCardNumber !== result.idInfo?.id_number?.value
            ) {
              handleShowToast({
                msg: t('VerifyIdCardESignForSale.notMatch'),
                type: 'error',
              });
              return;
            }
            // success
            if (result?.rawImage?.front && identityNumber) {
              await handleUploadUserResouce({
                rawImage: result.rawImage?.front,
                resourceType: 'IDCARD_FRONT',
                identityNumber,
              });
            }
            if (result?.rawImage?.back && identityNumber) {
              await handleUploadUserResouce({
                rawImage: result.rawImage?.back,
                resourceType: 'IDCARD_BACK',
                identityNumber,
              });
            }
            if (result?.rawImage?.selfie && identityNumber) {
              await handleUploadUserResouce({
                rawImage: result.rawImage?.selfie,
                resourceType: 'IDCARD_SELFIE',
                identityNumber,
              });
            }
            // success
            const data: ekycDataType = {
              fullname: result.idInfo?.name?.value,
              dob: result.idInfo?.dob?.value,
              ethnicity: result.idInfo?.ethnicity?.value,
              idNumber: result.idInfo?.id_number?.value,
              doi: result.ekycResult?.kyc_result.back?.given_date.value,
              gender: result.idInfo?.gender?.name,
              nationality: result.idInfo?.nationality?.value,
              origin: result.idInfo?.id_origin?.value,
              oldIdNumber: result.idInfo?.id_old_number?.value,
            };
            handleEkycSubmit(
              data,
              result?.rawImage?.selfie,
              result?.rawImage?.front,
              result?.rawImage?.back,
            );
          }
        } else {
          // handle error
          await updateEKYC({
            id: dataSaleInfo?.saleImportId ?? '',
            idCardNumber: dataSaleInfo?.idCardNumber ?? '',
            tokenEsign: dataSaleInfo?.tokenEsign ?? '',
            ekycResult: false,
          });
          console.log('errorMesssage : ', result.errorMessage);
          handleShowToast({
            msg: t('VerifyIdCardESignForSale.cccdFail'),
            type: 'error',
          });
        }
      };
      window?.TrueIDSDK.start(webConfigInfo, callBack);
    } else {
      console.log('NULL');
    }
  };

  return {startEkyc};
};

export default useHandleStartEkyc;

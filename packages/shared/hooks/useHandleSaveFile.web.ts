import moment from 'moment';
import useShowToast from './useShowToast';
import {
  useUploadDocumentEcmWebMutation,
  useUploadUserResourceWebMutation,
  useVerifyEKYCWebMutation,
} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {UploadUserResourceWebRequestProps} from '@lfvn-customer/shared/types/services/authTypes';
import {UploadDocumentEcmResponseProps} from '@lfvn-customer/shared/types/services/loanTypes';
import downloadFileApi from '@lfvn-customer/shared/redux/slices/apiSlices/downloadFileApi.web';
import {VerifyEKYCRequestWebProps} from '../types/services/eSignForSaleTypes';

const useHandleSaveFile = () => {
  const [uploadUserResource] = useUploadUserResourceWebMutation();
  const {showCommonErrorToast} = useShowToast();
  const [uploadDocumentEcmMutation] = useUploadDocumentEcmWebMutation();
  const [verifyEKYC] = useVerifyEKYCWebMutation();

  const saveEKYCImageBase64ToFile = async (base64Data: string) => {
    try {
      const prefix = `data:image/jpeg;base64,`;
      const validBase64 = base64Data.startsWith(prefix)
        ? base64Data
        : `${prefix}${base64Data}`;

      const byteString = atob(validBase64.split(',')[1]);
      const mimeString = validBase64.split(',')[0].split(':')[1].split(';')[0];

      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      // Return blob file
      return new Blob([ab], {type: mimeString});
    } catch (error) {
      console.error('Error saving file:', error);
      showCommonErrorToast();
      return undefined;
    }
  };

  const removeFileAfterUpload = (filePath: string) => {
    // Revoke Object URL for cleanup memory
    URL.revokeObjectURL(filePath);
  };

  const handleUploadUserResouce = async ({
    rawImage,
    resourceType,
    identityNumber,
  }: {
    rawImage: string;
    resourceType: string;
    identityNumber: string;
  }) => {
    const fileName =
      identityNumber +
      `_${resourceType}_` +
      moment().format('YYYYMMDDHHmmss') +
      '.jpg';
    const file = await saveEKYCImageBase64ToFile(rawImage);
    if (!file) {
      showCommonErrorToast();
      return;
    }
    const body: UploadUserResourceWebRequestProps = {
      resourceType,
      file,
      login: identityNumber ?? '',
      fileName,
    };
    await uploadUserResource(body);
  };

  const handleUploadDocEcm = async ({
    fileName,
    flowId,
    customerNric,
  }: {
    fileName: string;
    flowId: string;
    customerNric: string;
  }): Promise<UploadDocumentEcmResponseProps | undefined> => {
    const response = await downloadFileApi({
      fileName,
    });

    // Read the file as a Blob
    const fileBlob = await response.blob();
    const file = new File([fileBlob], fileName, {type: 'image/jpeg'});
    const uploadDocEcmResponse = await uploadDocumentEcmMutation({
      objectid: flowId,
      docType: 'DOC100',
      docName: 'KH CMND/CCCD/CMTQĐ/ Hộ chiếu',
      fileType: 'jpg',
      identity: customerNric,
      file,
      fileName,
    });
    return uploadDocEcmResponse?.data;
  };

  const handleVerifyEKYCSubmit = async ({
    selfieImg,
    id,
    idCardNumber,
    idCardIssuedAt,
    idCardIssuedBy,
    tokenEsign,
  }: {
    selfieImg: string;
    id: string;
    idCardNumber: string;
    idCardIssuedAt: string;
    idCardIssuedBy: string;
    tokenEsign: string;
  }) => {
    const selfiePhoto = await saveEKYCImageBase64ToFile(selfieImg);
    if (!selfiePhoto) {
      showCommonErrorToast();
      return false;
    }
    const body: VerifyEKYCRequestWebProps = {
      id,
      idCardNumber,
      selfiePhoto,
      fileName: `${id}_selfie.jpg`,
      idCardIssuedAt,
      idCardIssuedBy,
      tokenEsign,
    };
    const result = await verifyEKYC(body);
    return result?.data;
  };

  return {
    saveEKYCImageBase64ToFile,
    removeFileAfterUpload,
    handleUploadUserResouce,
    handleUploadDocEcm,
    handleVerifyEKYCSubmit,
  };
};
export default useHandleSaveFile;

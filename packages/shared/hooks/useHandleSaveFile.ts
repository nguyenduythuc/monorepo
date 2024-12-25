import RNFS from 'react-native-fs';
import {
  useUploadDocumentEcmMutation,
  useUploadUserResourceMutation,
  useVerifyEKYCMutation,
} from '../redux/slices/apiSlices';
import moment from 'moment';
import {UploadUserResourceRequestProps} from '@lfvn-customer/shared/types/services/authTypes';
import useShowToast from './useShowToast';
import {UploadDocumentEcmResponseProps} from '@lfvn-customer/shared/types/services/loanTypes';
import downloadFileApi from '@lfvn-customer/shared/redux/slices/apiSlices/downloadFileApi';
import {VerifyEKYCRequestProps} from '../types/services/eSignForSaleTypes';

const useHandleSaveFile = () => {
  const [uploadUserResource] = useUploadUserResourceMutation();
  const {showCommonErrorToast} = useShowToast();
  const [uploadDocumentEcmMutation] = useUploadDocumentEcmMutation();

  const [verifyEKYC] = useVerifyEKYCMutation();

  const saveEKYCImageBase64ToFile = async (
    base64Data: string,
    fileName: string,
  ) => {
    try {
      const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;

      const prefix = `data:image/jpeg;base64,`;
      const validBase64 = base64Data.startsWith(prefix)
        ? base64Data
        : `${prefix}${base64Data}`;

      // save base64 to file
      await RNFS.writeFile(
        path,
        validBase64.replace(/^data:image\/\w+;base64,/, ''),
        'base64',
      );
      return path;
    } catch (error) {
      console.error('Error saving file: ', error);
    }
  };

  const removeFileAfterUpload = (filePath: string) => {
    RNFS.unlink(filePath);
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
    const filePath = await saveEKYCImageBase64ToFile(rawImage, fileName);
    if (!filePath) {
      showCommonErrorToast();
      return;
    }
    const body: UploadUserResourceRequestProps = {
      resourceType,
      file: {
        uri: filePath,
        // eslint-disable-next-line sonarjs/no-duplicate-string
        type: 'image/jpeg',
        name: fileName,
      },
      login: identityNumber ?? '',
    };
    await uploadUserResource(body);
    removeFileAfterUpload(filePath);
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
    const filePath = await downloadFileApi({
      fileName,
    });
    const uploadDocEcmResponse = await uploadDocumentEcmMutation({
      objectid: flowId,
      docType: 'DOC100',
      docName: 'KH CMND/CCCD/CMTQĐ/ Hộ chiếu',
      fileType: 'jpg',
      identity: customerNric ?? '',
      file: {
        uri: filePath,
        type: 'image/jpeg',
        name: fileName,
      },
    });

    removeFileAfterUpload(filePath);
    return uploadDocEcmResponse?.data;
  };

  const handleVerifyEKYCSubmit = async ({
    selfieImg,
    frontSide,
    backSide,
    id,
    idCardNumber,
    idCardIssuedAt,
    idCardIssuedBy,
    tokenEsign,
  }: {
    selfieImg: string;
    frontSide: string;
    backSide: string;
    id: string;
    idCardNumber: string;
    idCardIssuedAt: string;
    idCardIssuedBy: string;
    tokenEsign: string;
  }) => {
    const selfieFileName =
      idCardNumber + `_SELFIE_` + moment().format('YYYYMMDDHHmmss') + '.jpg';
    const selfieFileNameFilePath = await saveEKYCImageBase64ToFile(
      selfieImg,
      selfieFileName,
    );
    const frontSideFileName =
      idCardNumber + `_FRONT_` + moment().format('YYYYMMDDHHmmss') + '.jpg';
    const frontSideFileNameFilePath = await saveEKYCImageBase64ToFile(
      frontSide,
      frontSideFileName,
    );
    const backSideFileName =
      idCardNumber + `_BACK_` + moment().format('YYYYMMDDHHmmss') + '.jpg';
    const backSideFileNameFilePath = await saveEKYCImageBase64ToFile(
      backSide,
      backSideFileName,
    );
    if (
      !selfieFileNameFilePath ||
      !frontSideFileNameFilePath ||
      !backSideFileNameFilePath
    ) {
      showCommonErrorToast();
      return false;
    }
    const body: VerifyEKYCRequestProps = {
      id,
      idCardNumber,
      idCardIssuedAt,
      idCardIssuedBy,
      selfiePhoto: {
        uri: selfieFileNameFilePath,
        type: 'image/jpeg',
        name: selfieFileName,
      },
      frontSidePhoto: {
        uri: frontSideFileNameFilePath,
        type: 'image/jpeg',
        name: frontSideFileName,
      },
      backSidePhoto: {
        uri: backSideFileNameFilePath,
        type: 'image/jpeg',
        name: backSideFileName,
      },
      tokenEsign,
    };
    const result = await verifyEKYC(body);
    removeFileAfterUpload(selfieFileNameFilePath);
    removeFileAfterUpload(frontSideFileNameFilePath);
    removeFileAfterUpload(backSideFileNameFilePath);
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

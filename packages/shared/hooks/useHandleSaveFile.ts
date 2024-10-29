import RNFS from 'react-native-fs';
import {
  useUploadDocumentEcmMutation,
  useUploadUserResourceMutation,
} from '../redux/slices/apiSlices';
import moment from 'moment';
import {UploadUserResourceRequestProps} from '@lfvn-customer/shared/types/services/authTypes';
import useShowToast from './useShowToast';
import {UploadDocumentEcmResponseProps} from '@lfvn-customer/shared/types/services/loanTypes';
import downloadFileApi from '@lfvn-customer/shared/redux/slices/apiSlices/downloadFileApi';

const useHandleSaveFile = () => {
  const [uploadUserResource] = useUploadUserResourceMutation();
  const {showCommonErrorToast} = useShowToast();
  const [uploadDocumentEcmMutation] = useUploadDocumentEcmMutation();

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
    console.log('filePath', filePath);
    if (!filePath) {
      showCommonErrorToast();
      return;
    }
    const body: UploadUserResourceRequestProps = {
      resourceType,
      file: {
        uri: filePath,
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

  return {
    saveEKYCImageBase64ToFile,
    removeFileAfterUpload,
    handleUploadUserResouce,
    handleUploadDocEcm,
  };
};
export default useHandleSaveFile;

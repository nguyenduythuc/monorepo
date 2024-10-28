import RNFS from 'react-native-fs';
import {handleEnvByPlatform} from '@lfvn-customer/shared/utils/handleEnvByPlatform';
import {getToken} from '@lfvn-customer/shared/redux/slices/apiSlices/config';

const downloadFileApi = async ({
  fileName,
}: {
  fileName: string;
}): Promise<string> => {
  const url = `${handleEnvByPlatform('BASE_API_URL')}/api/files/download/${fileName}`;
  const filePath = RNFS.DocumentDirectoryPath + `/${fileName}`;
  await RNFS.downloadFile({
    fromUrl: url,
    toFile: filePath,
    background: true,
    discretionary: true,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  }).promise;

  return filePath;
};

export default downloadFileApi;

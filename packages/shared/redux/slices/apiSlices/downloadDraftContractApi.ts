import {VerifySaleContractRequestProps} from '../../../types/services/eSignForSaleTypes';
import {handleEnvByPlatform} from '../../../utils/handleEnvByPlatform';
import RNFS from 'react-native-fs';

// Convert Blob to Base64
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve(base64String.split(',')[1]); // Extract Base64 content
    };
    reader.onerror = () =>
      reject(new Error('Failed to convert Blob to Base64'));
    reader.readAsDataURL(blob);
  });
};

// Function to download draft contract as a PDF
const downloadDraftContractApi = async (
  body: VerifySaleContractRequestProps,
): Promise<string> => {
  const url = `${handleEnvByPlatform('BASE_API_URL')}/api/sale-import/get-contract/draft`;

  // Extract token and other properties from the request body
  const {token, ...rest} = body;

  // Fetch file from the server
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(rest),
    headers: {
      'sale-import-token': token,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // Convert response to a Blob
  const blob: Blob = await response.blob();

  // Define file name and path
  const fileName = `esign-contract.pdf`;
  const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

  // Convert Blob to Base64
  const base64Data = await blobToBase64(blob);

  // Save the file to the device's file system
  try {
    await RNFS.writeFile(filePath, base64Data, 'base64');
  } catch (error) {
    // throw new Error(`Failed to save file: ${error.message}`);
  }

  return filePath;
};

export default downloadDraftContractApi;

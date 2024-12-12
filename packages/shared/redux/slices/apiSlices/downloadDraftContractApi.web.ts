import {VerifySaleContractRequestProps} from '@lfvn-customer/shared/types/services/eSignForSaleTypes';
import {handleEnvByPlatform} from '@lfvn-customer/shared/utils/handleEnvByPlatform';

const downloadDraftContractApi = async (
  body: VerifySaleContractRequestProps,
): Promise<string> => {
  const url = `${handleEnvByPlatform('BASE_API_URL')}/api/sale-import/get-contract/draft`;
  // Fetch file from the server
  const {token, ...rest} = body;
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(rest),
    headers: {
      'sale-import-token': token,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`Download error: ${response.statusText}`);
  }

  const fileBlob = await response.blob();
  return URL.createObjectURL(fileBlob);
};

export default downloadDraftContractApi;

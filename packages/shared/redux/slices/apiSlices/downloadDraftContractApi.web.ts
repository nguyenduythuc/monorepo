import {VerifySaleContractRequestProps} from '../../../types/services/eSignForSaleTypes';

const downloadDraftContractApi = async (
  body: VerifySaleContractRequestProps,
): Promise<Response> => {
  const url = `/api-app/api/sale-import/get-contract/draft`;
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

  return response;
};

export default downloadDraftContractApi;

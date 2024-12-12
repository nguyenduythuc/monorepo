import {getToken} from '@lfvn-customer/shared/redux/slices/apiSlices/config';

const downloadFileApi = async ({
  fileName,
}: {
  fileName: string;
}): Promise<Response> => {
  const url = `/api/files/download/${fileName}`;
  // Fetch file from the server
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Download error: ${response.statusText}`);
  }

  return response;
};

export default downloadFileApi;

import {
  UploadESignForSaleFile,
  UploadFile,
} from '@lfvn-customer/shared/types/services/eSignForSaleTypes';

const useHandlePDF = () => {
  const createPdfFromImages = async (doc: UploadESignForSaleFile) => {
    return {
      file: new Blob(),
      fileName: `${new Date().toISOString()}_${doc.title}.pdf`,
    } as UploadFile;
  };

  return {
    createPdfFromImages,
  };
};
export default useHandlePDF;

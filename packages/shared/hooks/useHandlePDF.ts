import {
  DraftImagesESignForSale,
  UploadFile,
} from '@lfvn-customer/shared/types/services/eSignForSaleTypes';

const useHandlePDF = () => {
  const createPdfFromImages = async (doc: DraftImagesESignForSale) => {
    return {
      file: new Blob(),
      fileName: `${new Date().toISOString()}_${doc.type}.pdf`,
    } as UploadFile;
  };

  return {
    createPdfFromImages,
  };
};
export default useHandlePDF;

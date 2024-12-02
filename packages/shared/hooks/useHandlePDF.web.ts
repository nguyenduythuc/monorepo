import {PDFDocument} from 'pdf-lib';
import {
  UploadESignForSaleFile,
  UploadFile,
} from '@lfvn-customer/shared/types/services/eSignForSaleTypes';

const useHandlePDF = () => {
  const createPdfFromImages = async (doc: UploadESignForSaleFile) => {
    const imageUrls = doc.links;
    const pdfDoc = await PDFDocument.create();
    // Fetch all images in parallel
    const imageBlobs = await Promise.all(
      imageUrls.map(async link => {
        const response = await fetch(link.uri);
        return response.blob();
      }),
    );
    // Embed images into PDF and create pages
    const embeddedImages = await Promise.all(
      imageBlobs.map(async blob => {
        const imgBytes = await blob.arrayBuffer();
        // Embed image based on MIME type
        if (blob.type === 'image/jpeg') {
          return pdfDoc.embedJpg(imgBytes);
        } else if (blob.type === 'image/png') {
          return pdfDoc.embedPng(imgBytes);
        } else {
          throw new Error('Unsupported image format');
        }
      }),
    );
    embeddedImages.forEach(img => {
      const page = pdfDoc.addPage();
      const {width, height} = img.scale(0.5); // Adjust scale as needed

      page.setSize(width, height);
      page.drawImage(img, {
        x: 0,
        y: 0,
        width,
        height,
      });
    });
    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], {type: 'application/pdf'});
    return {
      file: pdfBlob,
      fileName: `${new Date().toISOString()}_${doc.type}`,
    } as UploadFile;
  };

  return {
    createPdfFromImages,
  };
};
export default useHandlePDF;

import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {CustomButton, Icon} from '@lfvn-customer/shared/components';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {Document, Page, pdfjs} from 'react-pdf';
import {useConfigRouting} from '@lfvn-customer/shared/hooks';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';
import useHandleDocEsignForSale from '@lfvn-customer/shared/hooks/useHandleDocEsignForSale';
import {ESignForSaleDocType} from '@lfvn-customer/shared/types/services/eSignForSaleTypes';

pdfjs.GlobalWorkerOptions.workerSrc = '/scripts/pdf.worker.min.mjs';

const PDFViewEsignForSaleScreen = ({
  docType,
}: {
  docType: ESignForSaleDocType;
}) => {
  const t = useTranslations();

  const [numPages, setNumPages] = useState<number>(0);
  const [isLoadingPDF, setIsLoadingPDF] = useState<boolean>(true);

  const {goBack} = useConfigRouting();

  const {doc} = useHandleDocEsignForSale(docType);

  const {appNavigate} = useConfigRouting();

  const onDocumentLoadSuccess = ({numPages}: {numPages: number}) => {
    setNumPages(numPages);
    setIsLoadingPDF(false);
  };

  const onHandleSubmit = () => {
    if (doc) {
      appNavigate(ScreenParamEnum.DetailFolderESignForSale, {
        docType: doc.type,
      });
    }
  };

  if (!doc?.links) {
    return <View />;
  }

  const renderHeader = () => (
    <View style={tw.style('bg-black py-4 flex-row items-center')}>
      <TouchableOpacity
        style={tw.style(
          'w-[54px] h-[54px] rounded-full justify-center items-center',
        )}
        onPress={goBack}>
        <Icon name="arrow-left" color="white" disabled />
      </TouchableOpacity>
      <Text style={tw.style(`text-base text-white`)}>{doc.title}</Text>
    </View>
  );

  return (
    <View style={tw.style('flex-1')}>
      {renderHeader()}
      <View style={tw.style('mx-4 flex-1')}>
        <Document
          file={doc?.links?.file}
          onLoadSuccess={onDocumentLoadSuccess}
          className="items-center py-4">
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              scale={1}
              className="shadow-lg my-4"
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          ))}
        </Document>
        {!isLoadingPDF && (
          <View style={tw.style('my-4 w-full')}>
            <CustomButton
              onPress={onHandleSubmit}
              color={'red'}
              buttonStyle={'mt-4 mx-4'}>
              {t('VerifyIdContractESignForSale.continue')}
            </CustomButton>
          </View>
        )}
      </View>
    </View>
  );
};

export default PDFViewEsignForSaleScreen;

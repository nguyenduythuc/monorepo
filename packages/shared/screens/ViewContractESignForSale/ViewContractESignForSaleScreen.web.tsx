import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import {CustomButton} from '@lfvn-customer/shared/components';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {Document, Page, pdfjs} from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const ViewContractESignForSaleScreen = ({uri}: {uri: string}) => {
  const t = useTranslations();
  const {theme} = useGetTheme();
  const {textNegative500} = theme;

  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);

  console.log('uri', uri);

  const onDocumentLoadSuccess = ({numPages}: {numPages: number}) => {
    setNumPages(numPages);
  };

  return (
    <View style={tw.style('flex-1')}>
      <View style={tw.style('px-4')}>
        <Text
          style={tw.style(`text-32px ${textNegative500} font-semibold mt-6`)}>
          {t('VerifyIdContractESignForSale.title')}
        </Text>
        <Text style={tw.style(`text-lg ${textNegative500} mt-2`)}>
          {t('VerifyIdContractESignForSale.desc')}
        </Text>
      </View>
      <View style={tw.style('mx-4 flex-1')}>
        <Document
          file={uri}
          onLoadSuccess={onDocumentLoadSuccess}
          className="items-center py-4">
          <Page
            pageNumber={pageNumber}
            scale={scale}
            className="shadow-lg"
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </View>
      <View style={tw.style('absolute bottom-4 w-full')}>
        <CustomButton
          onPress={() => {}}
          color={'red'}
          buttonStyle={'mt-4 mx-4'}>
          {t('VerifyIdContractESignForSale.continue')}
        </CustomButton>
      </View>
    </View>
  );
};

export default ViewContractESignForSaleScreen;

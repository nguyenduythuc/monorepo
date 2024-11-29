import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import {ConfirmModal, CustomButton} from '@lfvn-customer/shared/components';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {Document, Page, pdfjs} from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import useViewContractESignForSale from '@lfvn-customer/shared/hooks/useViewContractESignForSale';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const ViewContractESignForSaleScreen = ({
  uri,
  isVerifyEKYC,
  isSignSuccess,
}: {
  uri: string;
  isVerifyEKYC?: boolean;
  isSignSuccess?: boolean;
}) => {
  const t = useTranslations();
  const {theme} = useGetTheme();
  const {textNegative500} = theme;

  const [numPages, setNumPages] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isLoadingPDF, setIsLoadingPDF] = useState<boolean>(true);

  const onDocumentLoadSuccess = ({numPages}: {numPages: number}) => {
    setNumPages(numPages);
    setIsLoadingPDF(false);
  };

  const {onPressSubmit, onHandleConfirmESign} = useViewContractESignForSale();

  useEffect(() => {
    if (isVerifyEKYC) {
      setIsModalVisible(true);
    }
  }, [isVerifyEKYC]);

  const onPressConfirmModal = () => {
    setIsModalVisible(false);
    onHandleConfirmESign();
  };

  const onHandleSubmit = () => {
    onPressSubmit({
      isSignSuccess,
      uri,
    });
  };

  return (
    <View style={tw.style('flex-1')}>
      <View style={tw.style('px-4')}>
        <Text
          style={tw.style(`text-32px ${textNegative500} font-semibold mt-6`)}>
          {t('ViewContractESignForSale.title')}
        </Text>
        <Text style={tw.style(`text-lg ${textNegative500} mt-2`)}>
          {t('ViewContractESignForSale.desc')}
        </Text>
      </View>
      <View style={tw.style('mx-4 flex-1')}>
        <Document
          file={uri}
          onLoadSuccess={onDocumentLoadSuccess}
          className="items-center py-4">
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              scale={0.6}
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
      <ConfirmModal
        visible={isModalVisible}
        setVisible={setIsModalVisible}
        content={t('VerifyIdContractESignForSale.contentPopup')}
        labelButtonRight={t('VerifyIdContractESignForSale.ok')}
        singleButton
        onButtonRightPress={onPressConfirmModal}
        disabledPressBackdrop
      />
    </View>
  );
};

export default ViewContractESignForSaleScreen;

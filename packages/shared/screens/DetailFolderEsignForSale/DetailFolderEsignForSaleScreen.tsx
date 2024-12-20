import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import {
  ConfirmModal,
  FileOptionModal,
  Icon,
} from '@lfvn-customer/shared/components';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {
  ESignForSaleDocType,
  UploadESignForSaleFile,
} from '@lfvn-customer/shared/types/services/eSignForSaleTypes';
import TrashIcon from '@lfvn-customer/shared/assets/images/svg/TrashIcon';
import {useDispatch} from 'react-redux';
import {
  setAddressInfo,
  setAvatarInfo,
  setBankInfo,
  setCccdInfo,
  setDegreeInfo,
  setResumeInfo,
} from '@lfvn-customer/shared/redux/slices/eSignForSaleSlice';
import {useConfigRouting} from '@lfvn-customer/shared/hooks';
import {Document, Page, pdfjs} from 'react-pdf';
import useHandleDocEsignForSale from '@lfvn-customer/shared/hooks/useHandleDocEsignForSale';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';
import {useAppSelector} from '@lfvn-customer/shared/redux/store';
pdfjs.GlobalWorkerOptions.workerSrc = '/scripts/pdf.worker.min.mjs';

const DetailFolderEsignForSaleScreen = ({
  docType,
}: {
  docType: ESignForSaleDocType;
}) => {
  const {theme} = useGetTheme();
  const {textNegative300, textDanger500, textUseful500} = theme;

  const t = useTranslations();
  const {appNavigate} = useConfigRouting();
  const dispatch = useDispatch();

  const [selectedFolder, setSelectedFolder] =
    useState<UploadESignForSaleFile>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalFileOptionalVisible, setIsModalFileOptionalVisible] =
    useState(false);

  const {doc} = useHandleDocEsignForSale(docType);
  const {dataSaleInfo} = useAppSelector(state => state.eSignForSale);

  const toggleImageSelection = (item: UploadESignForSaleFile) => {
    if (selectedFolder?.title === item.title) {
      setSelectedFolder(undefined);
    } else {
      setSelectedFolder(item);
    }
  };

  const selectAllImages = () => {
    setSelectedFolder(doc);
  };

  const onPressImage = (item: UploadESignForSaleFile) => {
    appNavigate(ScreenParamEnum.PDFViewESignForSale, {
      docType: item.type,
    });
  };

  const onPressLongImage = (item: UploadESignForSaleFile) => {
    if (!selectedFolder) {
      return toggleImageSelection(item);
    }
  };

  const onPressGoBack = () => {
    appNavigate(ScreenParamEnum.UploadDocsEsignForSale, {
      saleImportId: dataSaleInfo?.saleImportId,
      tokenEsign: dataSaleInfo?.tokenEsign,
    });
  };

  const renderImage = ({item}: {item: UploadESignForSaleFile}) => (
    <TouchableOpacity
      onLongPress={() => onPressLongImage(item)}
      onPress={() => onPressImage(item)}
      style={tw.style('w-1/3 aspect-square p-1')}>
      <View style={tw.style('mx-4 flex-1')}>
        <Document file={item?.links?.file ?? ''} className="items-center py-4">
          <Page
            pageNumber={1}
            scale={0.09}
            className="shadow-lg my-4"
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
        {selectedFolder ? (
          <View
            style={tw`absolute top-2 right-2 bg-blue-500 rounded-full w-6 h-6 items-center justify-center`}>
            <Text style={tw`text-white text-sm font-bold`}>1</Text>
          </View>
        ) : (
          <View />
        )}
      </View>
    </TouchableOpacity>
  );

  const onPressRemoveAttachment = () => {
    setIsModalVisible(true);
  };

  const onPressConfirmRemoveAttachment = () => {
    setIsModalVisible(false);
    const typeImage = doc?.type;
    const newDocs = {
      ...doc,
      links: undefined,
    } as UploadESignForSaleFile;
    switch (typeImage) {
      case ESignForSaleDocType.CARD:
        dispatch(setCccdInfo(newDocs));
        break;
      case ESignForSaleDocType.SELFIE:
        dispatch(setAvatarInfo(newDocs));
        break;
      case ESignForSaleDocType.DEGREE:
        dispatch(setDegreeInfo(newDocs));
        break;
      case ESignForSaleDocType.ADDRESS:
        dispatch(setAddressInfo(newDocs));
        break;
      case ESignForSaleDocType.RESUME:
        dispatch(setResumeInfo(newDocs));
        break;
      case ESignForSaleDocType.BANK_INFO:
        dispatch(setBankInfo(newDocs));
        break;

      default:
        break;
    }
  };

  const onPressUnSelectedImages = () => {
    setSelectedFolder(undefined);
  };

  const renderHeader = () => {
    return (
      <View style={tw.style('py-4')}>
        {!selectedFolder ? (
          <View style={tw.style('flex-row items-center px-4')}>
            <Icon name={'arrow-left'} color={'black'} onPress={onPressGoBack} />
            <View style={tw.style('flex-1 ml-4')}>
              <Text
                style={tw.style('text-lg font-semibold text-black leading-5')}>
                {doc?.title}
              </Text>
              <Text style={tw.style(`text-base ${textNegative300}`)}>
                {`${doc?.links?.id ? 1 : 0} ${t('DetailFolder.file')}`}
              </Text>
            </View>
          </View>
        ) : (
          <View style={tw.style('flex-row items-center px-4')}>
            <Icon
              name={'close-icon'}
              color={'black'}
              onPress={onPressUnSelectedImages}
            />
            <View style={tw.style('flex-1 flex-row ml-4 justify-between')}>
              <Text style={tw.style(`text-lg font-semibold text-black`)}>
                {`${t('DetailFolder.choose')}: 1`}
              </Text>
              <TouchableOpacity onPress={selectAllImages}>
                <Text
                  style={tw.style(`text-lg font-semibold ${textUseful500}`)}>
                  {t('DetailFolder.selectedAll')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  const renderFloatingAddButton = () => (
    <TouchableOpacity
      style={tw.style('absolute bottom-25 right-5')}
      onPress={() => setIsModalFileOptionalVisible(true)}>
      <Icon name={'add-icon'} color={'red'} width={59} height={59} disabled />
    </TouchableOpacity>
  );

  return (
    <>
      {renderHeader()}
      {doc?.links?.id && (
        <FlatList
          data={[doc]}
          renderItem={renderImage}
          keyExtractor={item => item.title}
          numColumns={3}
          contentContainerStyle={tw.style('flex-1 pt-[21px] pb-25 px-4')}
          style={{backgroundColor: '#F5F5F7'}}
          nestedScrollEnabled={true}
        />
      )}
      <View style={tw.style('absolute bottom-0 w-full')}>
        {!selectedFolder ? (
          <View style={tw.style('bg-white justify-center items-center py-5')}>
            <Text style={tw.style(`text-lg ${textNegative300}`)}>
              {t('DetailFolder.removeGuide')}
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            style={tw.style(
              'bg-white justify-center items-center py-5 flex-row',
            )}
            onPress={onPressRemoveAttachment}>
            <TrashIcon />
            <Text
              style={tw.style(`text-lg font-semibold ${textDanger500} ml-1`)}>
              {t('DetailFolder.removeAttachment')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {!doc?.links?.id && renderFloatingAddButton()}
      <ConfirmModal
        visible={isModalVisible}
        setVisible={setIsModalVisible}
        title={t('DetailFolder.removeAlertTitle')}
        content={t('DetailFolder.removeAlertDesc')}
        labelButtonRight={t('DetailFolder.confirm')}
        onButtonLeftPress={() => setIsModalVisible(false)}
        onButtonRightPress={onPressConfirmRemoveAttachment}
        disabledPressBackdrop
      />
      <FileOptionModal
        doc={doc}
        visible={isModalFileOptionalVisible}
        setVisible={setIsModalFileOptionalVisible}
      />
    </>
  );
};

export default DetailFolderEsignForSaleScreen;

import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import {ConfirmModal, CustomButton} from '@lfvn-customer/shared/components';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {
  DraftImagesESignForSale,
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
  setDraftImages,
  setResumeInfo,
} from '@lfvn-customer/shared/redux/slices/eSignForSaleSlice';
import {useConfigRouting} from '@lfvn-customer/shared/hooks';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';
import useHandlePDF from '@lfvn-customer/shared/hooks/useHandlePDF';

const MAX_IMAGE_SELECTED = 20;

const ImageSelectedScreen = ({folderEncoded}: {folderEncoded: string}) => {
  const {theme} = useGetTheme();
  const {textUseful500} = theme;

  const t = useTranslations();
  const {goBack, appNavigate} = useConfigRouting();
  const dispatch = useDispatch();

  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [folder, setFolder] = useState<DraftImagesESignForSale>();

  const {createPdfFromImages} = useHandlePDF();

  useEffect(() => {
    if (folderEncoded) {
      setFolder(
        JSON.parse(
          decodeURIComponent(folderEncoded),
        ) as DraftImagesESignForSale,
      );
    }
  }, [folderEncoded]);

  const images = useMemo(() => {
    return folder?.links || [];
  }, [folder]);

  const toggleImageSelection = (id: string) => {
    // select max 20 images
    if (selectedImages.length < MAX_IMAGE_SELECTED) {
      setSelectedImages(prev =>
        prev.includes(id) ? prev.filter(imgId => imgId !== id) : [...prev, id],
      );
    } else if (selectedImages.includes(id)) {
      setSelectedImages(prev => prev.filter(imgId => imgId !== id));
    }
  };

  const selectAllImages = () => {
    // select max 20 images
    setSelectedImages(
      images
        .filter((_, index) => index < MAX_IMAGE_SELECTED)
        .map(img => img.id),
    );
  };

  const onPressImage = (item: {id: string; uri: string}) => {
    if (selectedImages.length) {
      return toggleImageSelection(item.id);
    }
    appNavigate(ScreenParamEnum.ZoomRotateImage, {
      uri: item.uri,
    });
  };

  const onPressLongImage = (item: {id: string; uri: string}) => {
    if (!selectedImages.length) {
      return toggleImageSelection(item.id);
    }
  };

  const onPressConfirmConvertToPDF = async () => {
    if (folder) {
      const pdf = await createPdfFromImages(folder);
      if (!pdf) {
        return;
      }
      const newDocs = {
        ...folder,
        links: pdf,
      } as UploadESignForSaleFile;
      switch (folder.type) {
        case ESignForSaleDocType.DOC_CCCD:
          dispatch(
            setCccdInfo({
              ...newDocs,
              title: t('UploadDocsESignForSale.cccd'),
            }),
          );
          break;
        case ESignForSaleDocType.DOC_SELFIE:
          dispatch(
            setAvatarInfo({
              ...newDocs,
              title: t('UploadDocsESignForSale.avatar'),
            }),
          );
          break;
        case ESignForSaleDocType.DOC_GTCT:
          dispatch(
            setAddressInfo({
              ...newDocs,
              title: t('UploadDocsESignForSale.address'),
            }),
          );
          break;
        case ESignForSaleDocType.DOC_VB:
          dispatch(
            setDegreeInfo({
              ...newDocs,
              title: t('UploadDocsESignForSale.degree'),
            }),
          );
          break;
        case ESignForSaleDocType.DOC_SYLL:
          dispatch(
            setResumeInfo({
              ...newDocs,
              title: t('UploadDocsESignForSale.resume'),
            }),
          );
          break;
        case ESignForSaleDocType.BANK_INFO:
          dispatch(
            setBankInfo({
              ...newDocs,
              title: t('UploadDocsESignForSale.bankInfo'),
            }),
          );
          break;
        default:
          break;
      }
      dispatch(setDraftImages(folder));
      appNavigate(ScreenParamEnum.PDFViewESignForSale, {
        docType: folder.type,
      });
    }
  };

  const renderImage = ({item}: {item: {id: string; uri: string}}) => (
    <TouchableOpacity
      onLongPress={() => onPressLongImage(item)}
      onPress={() => onPressImage(item)}
      style={tw.style('w-1/3 aspect-square p-1')}>
      <View style={tw`relative w-full h-full`}>
        <Image
          source={{uri: item.uri}}
          style={tw.style('w-full h-full rounded-lg')}
        />
        {!!selectedImages.length && (
          <>
            {selectedImages.includes(item.id) ? (
              <View
                style={tw`absolute top-2 right-2 bg-blue-500 rounded-full w-6 h-6 items-center justify-center`}>
                <Text style={tw`text-white text-sm font-bold`}>
                  {selectedImages.findIndex(selected => selected === item.id) +
                    1}
                </Text>
              </View>
            ) : (
              <View
                style={tw`absolute top-2 right-2 bg-[#3333337F] rounded-full w-6 h-6 items-center justify-center border-2 border-white`}
              />
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );

  const onPressRemoveAttachment = () => {
    setIsModalVisible(true);
  };

  const onPressConfirmRemoveAttachment = () => {
    setIsModalVisible(false);
    const newImages = folder?.links.filter(
      img => !selectedImages.includes(img.id),
    );
    const newDocs = {
      ...folder,
      links: newImages,
    } as DraftImagesESignForSale;
    dispatch(setDraftImages(newDocs));
    setFolder(newDocs);
  };

  const onPressUnSelectedImages = () => {
    setSelectedImages([]);
  };

  const renderHeader = () => {
    return (
      <View style={tw.style('p-4 flex-row justify-between')}>
        <TouchableOpacity onPress={goBack}>
          <Text style={tw.style(`text-base ${textUseful500} font-semibold`)}>
            {t('ImageSelected.cancel')}
          </Text>
        </TouchableOpacity>
        <View>
          <Text style={tw.style(`text-base text-black font-semibold`)}>
            {t('ImageSelected.selected', {
              count: selectedImages.length,
            })}
          </Text>
        </View>
        <TouchableOpacity onPress={onPressUnSelectedImages}>
          <Text style={tw.style(`text-base ${textUseful500} font-semibold`)}>
            {t('ImageSelected.unSelected')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderSelectAll = () => (
    <View
      style={tw.style(
        'flex-row justify-between mx-4 px-2 bg-[#F4F8FF] py-[10px]',
      )}>
      <TouchableOpacity style={tw.style('flex-row')} onPress={selectAllImages}>
        {!!selectedImages.length && selectedImages.length === images.length ? (
          <View
            style={tw`mr-2 bg-[#B2B2B2] rounded-full w-6 h-6 items-center justify-center border-[#B2B2B2]`}>
            <View style={tw`bg-blue-500 rounded-full w-5 h-5`} />
          </View>
        ) : (
          <View
            style={tw`bg-white mr-2 rounded-full w-6 h-6 items-center justify-center border-2 border-[#B2B2B2]`}
          />
        )}
        <Text style={tw.style(`text-base ${textUseful500}`)}>
          {t('ImageSelected.selectAll')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressRemoveAttachment}>
        <TrashIcon />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      {renderHeader()}
      {renderSelectAll()}
      <FlatList
        data={images}
        renderItem={renderImage}
        keyExtractor={item => item.id}
        numColumns={3}
        contentContainerStyle={tw.style('flex-1 pt-[21px] pb-25 px-4')}
        nestedScrollEnabled={true}
      />
      <View style={tw.style('absolute bottom-4 w-full')}>
        <CustomButton
          onPress={onPressConfirmConvertToPDF}
          color={'red'}
          disabled={!selectedImages.length || !images.length}
          buttonStyle={'mt-4 mx-4'}>
          {t('ImageSelected.confirm')}
        </CustomButton>
      </View>
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
    </>
  );
};

export default ImageSelectedScreen;

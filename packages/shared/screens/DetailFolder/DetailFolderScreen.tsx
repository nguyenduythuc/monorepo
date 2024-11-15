import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import {ConfirmModal, Icon} from '@lfvn-customer/shared/components';
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
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';

const DetailFolderScreen = ({folderEncoded}: {folderEncoded: string}) => {
  const {theme} = useGetTheme();
  const {textNegative300, textDanger500, textUseful500} = theme;

  const t = useTranslations();
  const {goBack} = useConfigRouting();
  const dispatch = useDispatch();
  const {appNavigate} = useConfigRouting();

  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [folder, setFolder] = useState<UploadESignForSaleFile>();

  useEffect(() => {
    if (folderEncoded) {
      setFolder(
        JSON.parse(decodeURIComponent(folderEncoded)) as UploadESignForSaleFile,
      );
    }
  }, [folderEncoded]);

  const images = useMemo(() => {
    return folder?.links || [];
  }, [folder]);

  const toggleImageSelection = (id: string) => {
    setSelectedImages(prev =>
      prev.includes(id) ? prev.filter(imgId => imgId !== id) : [...prev, id],
    );
  };

  const selectAllImages = () => {
    setSelectedImages(images.map(img => img.id));
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
    const typeImage = folder?.type;
    const newImages = folder?.links.filter(
      img => !selectedImages.includes(img.id),
    );
    const newDocs = {
      ...folder,
      links: newImages,
    } as UploadESignForSaleFile;
    setFolder(newDocs);
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
    setSelectedImages([]);
  };

  const renderHeader = () => {
    return (
      <View style={tw.style('pt-4')}>
        {!selectedImages.length ? (
          <View style={tw.style('flex-row items-center px-2')}>
            <Icon name={'arrow-left'} color={'black'} onPress={goBack} />
            <View style={tw.style('flex-1 ml-4')}>
              <Text
                style={tw.style('text-lg font-semibold text-black leading-5')}>
                {folder?.title}
              </Text>
              <Text style={tw.style(`text-base ${textNegative300}`)}>
                {`${folder?.links.length} ${t('DetailFolder.file')}`}
              </Text>
            </View>
          </View>
        ) : (
          <View style={tw.style('flex-row items-center px-2')}>
            <Icon
              name={'close-icon'}
              color={'black'}
              onPress={onPressUnSelectedImages}
            />
            <View style={tw.style('flex-1 flex-row ml-4 justify-between')}>
              <Text style={tw.style(`text-lg font-semibold text-black`)}>
                {`${t('DetailFolder.choose')}: ${selectedImages.length}`}
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

  return (
    <>
      {renderHeader()}
      <FlatList
        data={images}
        renderItem={renderImage}
        keyExtractor={item => item.id}
        numColumns={3}
        contentContainerStyle={tw.style('flex-1 pt-[21px] pb-25 px-4')}
        style={{backgroundColor: '#F5F5F7'}}
      />
      <View style={tw.style('absolute bottom-0 w-full')}>
        {!selectedImages.length ? (
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

export default DetailFolderScreen;

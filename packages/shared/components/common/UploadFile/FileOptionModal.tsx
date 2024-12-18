import {View, Text, Platform} from 'react-native';
import React, {useCallback, useRef} from 'react';
import tw from '@lfvn-customer/shared/themes/tailwind';

import ImageCropPicker from 'react-native-image-crop-picker';
import DocumentPicker, {types} from 'react-native-document-picker';

import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {BaseModal} from '../AppModal';
import {SelectFileButton} from './SelectFileButton';
import {useConfigRouting} from '@lfvn-customer/shared/hooks';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';
import {UploadESignForSaleFile} from '@lfvn-customer/shared/types/services/eSignForSaleTypes';
import {ActionCreatorWithPayload} from '@reduxjs/toolkit';
import {useGetTheme} from '../../../hooks/useGetTheme';

const parseNumber = (text: string) => {
  if (!text) return 0;
  if (typeof text !== 'string') return text;
  const cleandText = text.replaceAll(/[$đ,₫]/g, '');
  return parseFloat(cleandText);
};

const sizeLarge = 15;
const MAX_FILE = 10;

const generateFileType = (path: string) => {
  const arr = path.split?.('.');
  const length = arr?.length || 0;
  return arr![length - 1].toLowerCase();
};

export const FileOptionModal = ({
  doc,
  setDoc,
}: {
  doc?: UploadESignForSaleFile;
  setDoc?: ActionCreatorWithPayload<UploadESignForSaleFile, string>;
  handleOpenFolder?: (doc: UploadESignForSaleFile) => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) => {
  const fileOptionModalRef = useRef<any>(null);

  const {appNavigate} = useConfigRouting();
  const {theme} = useGetTheme();

  const {textNegative500} = theme;

  const t = useTranslations();

  const onOpen = () => fileOptionModalRef.current?.open();
  const onClose = () => fileOptionModalRef.current?.close();

  const checkFileLarge = useCallback(
    (fileInfo: {
      fileCopyUri: string | null;
      name: string | null;
      size: number | null;
      type: string | null;
      uri: string | null;
    }) => {
      const sizeInBytes = fileInfo.size ?? 1;
      const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);

      return parseNumber(sizeInMB) <= sizeLarge;
    },
    [sizeLarge, t],
  );

  if (!doc) {
    return null;
  }

  const uploadFile = async () => {
    try {
      console.log('uploadFile');
      const pickerListResult = await DocumentPicker.pick({
        allowMultiSelection: false,
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
        type: [
          types.doc,
          types.docx,
          types.pdf,
          types.images,
          types.xls,
          types.xlsx,
          types.ppt,
          types.pptx,
          types.zip,
          types.csv,
          types.plainText,
          // types.video,
          // types.audio,
        ],
      });
      onClose();

      const filterPicker = pickerListResult.filter(i => checkFileLarge(i));
      const path = decodeURI(filterPicker[0].fileCopyUri || '');
      const fileType = generateFileType(path);
      // let index = 0
      handleFileChange(path);
      console.log('fileType', fileType);
    } catch (e) {
      console.log('bb error', e);
    }
  };

  const handleSelectPicture = async () => {
    try {
      // setloading(true)
      const pickerListResult = await ImageCropPicker.openPicker({
        multiple: true,
        mediaType: 'photo',
        // compressImageQuality: 0.8,
        maxFiles: MAX_FILE,
      });
      onClose();
      console.log('pickerListResult', pickerListResult);
      const paths = pickerListResult.map(item => ({path: item.path}));

      console.log(paths);
      handleFileChange(paths[0].path);
    } catch (error) {
      // setloading(false)
      console.log('bb error', error);
    }
  };

  const handleOpenCamera = async () => {
    onClose();
    appNavigate(ScreenParamEnum.VisionCamera, {doc: doc, setDoc: setDoc});
  };

  const handleFileChange = (imageUrl: string) => {
    // // const imageUrl = URL.createObjectURL(file);
    // dispatch(
    //   setDoc({
    //     ...doc,
    //     links: [
    //       ...doc.links,
    //       {
    //         id: moment().format(),
    //         uri: imageUrl,
    //       },
    //     ],
    //   }),
    // );
    console.log('imageUrl', imageUrl);
  };

  return (
    <View>
      <View style={tw.style('mt-4')}>
        <Text style={tw`${textNegative500} font-semibold text-base mb-2`}>
          {doc.title}
        </Text>
        <View style={tw.style('flex-1 flex-row justify-between gap-3')}>
          <SelectFileButton
            icon="upload-circle-icon"
            title={t('AdditionalInfo.upload')}
            description={t('AdditionalInfo.uploadDes')}
            customStyle="border-dashed  border-blue-500"
            onPress={onOpen}
          />
          <SelectFileButton
            icon="folder-icon"
            title={t('AdditionalInfo.folder')}
            description={t('AdditionalInfo.files', {
              length: doc?.links ? 1 + ' ' : '0 ',
            })}
            customStyle="bg-white"
            // onPress={() => handleOpenFolder(doc)}
            onPress={() => {}}
          />
        </View>
      </View>

      <BaseModal ref={fileOptionModalRef}>
        <View
          style={tw.style(
            'bg-white border items-center justify-center border-gray-300 bottom-0 rounded-t-2xl max-h-96 w-full pb-6',
            {position: Platform.OS === 'web' ? 'fixed' : 'absolute'},
          )}>
          <View style={tw`py-2 justify-center items-center h-14`}>
            <Text style={tw`font-semibold text-lg`}>
              {t('AdditionalInfo.chooseUploadMethod')}
            </Text>
          </View>

          <View style={tw.style('w-full px-4')}>
            <View style={tw.style('flex-row justify-between gap-3 mb-3')}>
              <SelectFileButton
                icon="camera-icon"
                title={t('AdditionalInfo.camera')}
                onPress={handleOpenCamera}
              />
              <SelectFileButton
                icon="photo-icon"
                title={t('AdditionalInfo.choosePhoto')}
                onPress={handleSelectPicture}
              />
            </View>
            <SelectFileButton
              icon="upload-icon"
              title={t('AdditionalInfo.uploadFiles')}
              onPress={uploadFile}
            />
          </View>
        </View>
      </BaseModal>
    </View>
  );
};

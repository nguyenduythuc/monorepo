import {View, Text, Platform} from 'react-native';
import React, {useCallback, useRef} from 'react';
import tw from '@lfvn-customer/shared/themes/tailwind';

// import ImageCropPicker from 'react-native-image-crop-picker';
// import DocumentPicker, {types} from 'react-native-document-picker';

import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {BaseModal} from '../AppModal';
import {SelectFileButton} from './SelectFileButton';
import {useConfigRouting} from '@lfvn-customer/shared/hooks';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';

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

export const FileOptionModal = ({}) => {
  const fileOptionModalRef = useRef<any>(null);

  const {appNavigate} = useConfigRouting();

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

      if (parseNumber(sizeInMB) > sizeLarge) {
        // showMessage({
        //     type: 'danger',
        //     message: t('warning_size', { sizeInMB: sizeInMB, sizeLarge: sizeLarge }),
        //     duration: 2000,
        // })
        return false;
      } else {
        return true;
      }
    },
    [sizeLarge, t],
  );

  const uploadFile = async () => {
    // try {
    //   console.log('uploadFile');
    //   const pickerListResult = await DocumentPicker.pick({
    //     allowMultiSelection: false,
    //     presentationStyle: 'fullScreen',
    //     copyTo: 'cachesDirectory',
    //     type: [
    //       types.doc,
    //       types.docx,
    //       types.pdf,
    //       types.images,
    //       types.xls,
    //       types.xlsx,
    //       types.ppt,
    //       types.pptx,
    //       types.zip,
    //       types.csv,
    //       types.plainText,
    //       // types.video,
    //       // types.audio,
    //     ],
    //   });
    //   console.log('pickerListResult', pickerListResult);
    //   onClose();
    //   const filterPicker = pickerListResult.filter(i => checkFileLarge(i));
    //   const path = decodeURI(filterPicker[0].fileCopyUri || '');
    //   const fileType = generateFileType(path);
    //   // let index = 0
    //   console.log('fileType', fileType);
    // } catch (e) {
    //   console.log('bb error');
    // }
  };

  const handleSelectPicture = async () => {
    // try {
    //   // setloading(true)
    //   const pickerListResult = await ImageCropPicker.openPicker({
    //     multiple: true,
    //     mediaType: 'photo',
    //     // compressImageQuality: 0.8,
    //     maxFiles: MAX_FILE,
    //   });
    //   onClose();
    //   console.log('pickerListResult', pickerListResult);
    //   const paths = pickerListResult.map(item => ({path: item.path}));
    //   console.log(paths);
    // } catch (error) {
    //   // setloading(false)
    //   console.log('bb error', error);
    // }
  };

  const handleOpenCamera = async () => {
    console.log('ScreenParamEnum.VisionCamera');
    onClose();
    appNavigate(ScreenParamEnum.VisionCamera);
  };

  return (
    <>
      <View style={tw.style('flex-1 flex-row justify-between gap-3')}>
        <SelectFileButton
          icon="upload-circle-icon"
          title="AdditionalInfo.upload"
          description="AdditionalInfo.uploadDes"
          customStyle="border-dashed  border-blue-500"
          onPress={onOpen}
        />
        <SelectFileButton
          icon="folder-icon"
          title="AdditionalInfo.folder"
          description="AdditionalInfo.files"
          customStyle="bg-white"
        />
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
                title="AdditionalInfo.camera"
                onPress={handleOpenCamera}
              />
              <SelectFileButton
                icon="photo-icon"
                title="AdditionalInfo.choosePhoto"
                onPress={handleSelectPicture}
              />
            </View>
            <SelectFileButton
              icon="upload-icon"
              title="AdditionalInfo.uploadFiles"
              onPress={uploadFile}
            />
          </View>
        </View>
      </BaseModal>
    </>
  );
};

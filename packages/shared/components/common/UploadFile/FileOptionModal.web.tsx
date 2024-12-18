import {View, Text} from 'react-native';
import React, {useEffect, useRef} from 'react';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {SelectFileButton} from './SelectFileButton';
import {
  DraftImagesESignForSale,
  UploadESignForSaleFile,
} from '@lfvn-customer/shared/types/services/eSignForSaleTypes';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {ActionCreatorWithPayload} from '@reduxjs/toolkit';
import moment from 'moment';
import {BaseModal} from '../AppModal';
import {useConfigRouting} from '@lfvn-customer/shared/hooks';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';

export const FileOptionModal = ({
  doc,
  visible,
  setVisible,
}: {
  doc?: UploadESignForSaleFile;
  setDoc: ActionCreatorWithPayload<UploadESignForSaleFile, string>;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) => {
  const t = useTranslations();

  const {appNavigate} = useConfigRouting();

  const fileOptionModalRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // handle open lib image on web
  const handleUploadWeb = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length && !!doc) {
      const newLinks = [];
      for (let i = 0; i < event.target.files.length; i++) {
        let file = event.target.files[i];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          newLinks.push({
            id: moment().format() + `_${i}`,
            uri: imageUrl,
          });
        }
      }
      const draftImages: DraftImagesESignForSale = {
        type: doc.type,
        links: newLinks,
      };
      const encodedData = encodeURIComponent(JSON.stringify(draftImages));
      setVisible(false);
      appNavigate(ScreenParamEnum.ImageSelected, {
        folderEncoded: encodedData,
      });
    }
  };

  useEffect(() => {
    if (visible) {
      fileOptionModalRef.current?.open();
    } else {
      fileOptionModalRef.current?.close();
    }
  }, [visible]);

  const onPressCustomCamera = () => {
    setVisible(false);
    appNavigate(ScreenParamEnum.CustomCamera, {
      docType: doc?.type,
    });
  };

  return (
    <BaseModal ref={fileOptionModalRef} disabledPressBackdrop>
      <View
        style={tw.style(
          'bg-white border items-center justify-center border-gray-300 bottom-0 rounded-t-2xl max-h-96 w-full pb-6',
          {position: 'fixed'},
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
              onPress={onPressCustomCamera}
            />
            <SelectFileButton
              icon="photo-icon"
              title={t('AdditionalInfo.choosePhoto')}
              onPress={handleUploadWeb}
            />
          </View>
          <SelectFileButton
            icon="upload-icon"
            title={t('AdditionalInfo.uploadFiles')}
            onPress={handleUploadWeb}
          />
        </View>
      </View>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        style={{display: 'none'}}
        onChange={handleFileChange}
      />
    </BaseModal>
  );
};

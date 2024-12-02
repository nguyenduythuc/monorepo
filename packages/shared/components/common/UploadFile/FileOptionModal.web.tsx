import {View, Text} from 'react-native';
import React, {useRef} from 'react';
import tw from '@lfvn-customer/shared/themes/tailwind';

import {SelectFileButton} from './SelectFileButton';
import {UploadESignForSaleFile} from '@lfvn-customer/shared/types/services/eSignForSaleTypes';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {useDispatch} from 'react-redux';
import {ActionCreatorWithPayload} from '@reduxjs/toolkit';
import moment from 'moment';

export const FileOptionModal = ({
  doc,
  setDoc,
  handleOpenFolder,
}: {
  doc?: UploadESignForSaleFile;
  setDoc: ActionCreatorWithPayload<UploadESignForSaleFile, string>;
  handleOpenFolder: (doc: UploadESignForSaleFile) => void;
}) => {
  const t = useTranslations();
  const {theme} = useGetTheme();
  const {textNegative500} = theme;

  const dispatch = useDispatch();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // handle open lib image on web
  const handleUploadWeb = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && !!doc) {
      const imageUrl = URL.createObjectURL(file);
      dispatch(
        setDoc({
          ...doc,
          links: [
            ...doc.links,
            {
              id: moment().format(),
              uri: imageUrl,
            },
          ],
        }),
      );
    }
  };

  if (!doc) {
    return null;
  }

  return (
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
          onPress={handleUploadWeb}
        />
        <SelectFileButton
          icon="folder-icon"
          title={t('AdditionalInfo.folder')}
          description={t('AdditionalInfo.files', {
            length: doc.links.length ? doc.links.length + ' ' : '',
          })}
          customStyle="bg-white"
          onPress={() => handleOpenFolder(doc)}
        />
      </View>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{display: 'none'}}
        onChange={handleFileChange}
      />
    </View>
  );
};

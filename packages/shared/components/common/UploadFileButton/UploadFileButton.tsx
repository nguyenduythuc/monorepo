import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {UploadESignForSaleFile} from '@lfvn-customer/shared/types/services/eSignForSaleTypes';
import {Icon} from '../Icon';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';

export const UploadFileButton = ({
  doc,
  customStyle,
  onPress,
}: {
  doc?: UploadESignForSaleFile;
  customStyle?: string;
  onPress?: () => void;
}) => {
  const t = useTranslations();
  const {theme} = useGetTheme();
  const {textDanger500} = theme;

  return (
    <View style={tw.style('mt-4')}>
      <View style={tw.style('flex-1 flex-row justify-between gap-3')}>
        <TouchableOpacity
          style={tw.style(
            'flex-1 border justify-center rounded-lg bg-[#F4F8FF] my-1 border-dashed border-blue-500',
            `${customStyle}`,
          )}
          onPress={onPress}>
          <View style={tw.style('items-center px-3 py-4 flex-row')}>
            <Icon name={'file-icon'} disabled />
            <View style={tw.style('flex-1 justify-center pl-4')}>
              <Text style={tw.style('font-medium text-base')}>
                {`${doc?.title} `}
                <Text style={tw.style(`${textDanger500}`)}>*</Text>
              </Text>
              <Text style={tw.style('text-gray-400')}>
                {t('UploadDocsESignForSale.file', {
                  count: doc?.links?.id ? 1 : 0,
                })}
              </Text>
            </View>
            <Icon name={'extend-icon'} disabled />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

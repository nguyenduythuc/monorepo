import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import { Image, BaseModal } from '@lfvn-customer/shared/components';
import { useAppSelector } from '@lfvn-customer/shared/redux/store';


export const LoadingOverlay = () => {
  const dropDownRef = useRef<any>(null);
  const onOpen = () => dropDownRef.current?.open();
  const onClose = () => dropDownRef.current?.close();

  const loading = useAppSelector(state => state.loading.isLoading);

  useEffect(() => {
    if (loading) {
      onOpen();
    } else {
      onClose();
    }
  }, [loading]);

  return (
    <BaseModal ref={dropDownRef} disabled>
      <View
        style={tw.style('flex items-center justify-center w-full h-full px-4')}>
        <View
          style={tw.style(
            'bg-black opacity-50 items-center justify-center rounded-2xl w-22 h-22 ',
          )}>
          <Image
            iconName="loading_spinner"
            style={tw.style('h-20 w-20')}
            type="gif"
          />
        </View>
      </View>
    </BaseModal>
  );
};

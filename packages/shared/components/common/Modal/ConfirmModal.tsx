import React, {useEffect, useMemo, useRef} from 'react';
import {IConfirmModalProps} from '@lfvn-customer/shared/types';
import {View, Text} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {BaseModal, CustomButton} from '..';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';

export const ConfirmModal: React.FC<IConfirmModalProps> = ({
  visible,
  setVisible,
  title,
  content,
  renderAction,
  textLeftStyle,
  textRightStyle,
  buttonRightStyle,
  buttonLeftStyle,
  labelButtonLeft,
  labelButtonRight,
  onButtonLeftPress,
  onButtonRightPress,
  renderContent,
  singleButton,
  disabled,
  disabledPressBackdrop,
}) => {
  const dropDownRef = useRef<any>(null);
  const onOpen = () => dropDownRef.current?.open();
  const onClose = () => {
    setVisible && setVisible(false);
    dropDownRef.current?.close();
  };
  const t = useTranslations();

  const labelLeft = useMemo(() => {
    if (renderAction) {
      return null;
    }
    return labelButtonLeft || t('Modal.cancel');
  }, [labelButtonLeft, t, renderAction]);

  const labelRight = useMemo(() => {
    if (renderAction) {
      return null;
    }
    return labelButtonRight || t('Modal.agree');
  }, [labelButtonRight, t, renderAction]);

  useEffect(() => {
    if (visible) {
      onOpen();
    } else {
      onClose();
    }
  }, [visible]);

  return (
    <BaseModal
      ref={dropDownRef}
      disabled={disabled}
      disabledPressBackdrop={disabledPressBackdrop}>
      <View
        style={tw.style('flex items-center justify-center w-full h-full px-4')}>
        <View
          style={tw.style(
            'bg-white items-center rounded-2xl w-full py-5 px-5',
          )}>
          {title && (
            <Text style={tw.style('text-lg font-semibold')}>{title}</Text>
          )}
          {content && (
            <Text style={tw.style('text-lg text-center')}>{content}</Text>
          )}
          {renderContent}
          <View style={tw.style('flex-row mt-4 w-full justify-between gap-3')}>
            {!!labelLeft && !singleButton && (
              <View style={tw.style('flex-1')}>
                <CustomButton
                  onPress={onButtonLeftPress || onClose}
                  buttonStyle={`bg-[#F4F8FF] shadow-none ${buttonLeftStyle}`}
                  textCustomStyle={`text-blue-500 ${textLeftStyle}`}>
                  {labelLeft}
                </CustomButton>
              </View>
            )}
            {(!!labelRight || singleButton) && (
              <View style={tw.style('flex-1')}>
                <CustomButton
                  buttonStyle={buttonRightStyle}
                  textCustomStyle={textRightStyle}
                  onPress={onButtonRightPress || onClose}
                  color="blue">
                  {labelRight}
                </CustomButton>
              </View>
            )}
            {renderAction}
          </View>
        </View>
      </View>
    </BaseModal>
  );
};

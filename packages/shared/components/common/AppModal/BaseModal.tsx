import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';

import {TouchableOpacity, Platform, ViewStyle} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {Portal} from '@gorhom/portal';
import {createPortal} from 'react-dom';

const isWeb = Platform.OS === 'web';

type AppModalType = {
  contentStyle?: string | ViewStyle;
  backdropStyle?: string | ViewStyle;
  children?: React.ReactNode;
  disabled?: boolean;
  disabledPressBackdrop?: boolean;
};

export const BaseModal = forwardRef(
  (
    {
      backdropStyle = '',
      children,
      disabled = false,
      disabledPressBackdrop,
    }: AppModalType,
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }));

    useEffect(() => {
      if (!isWeb) {
        return;
      }
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return () => {
        document.body.style.overflow = '';
      };
    }, [isOpen]);

    const onClose = () => setIsOpen(false);

    const renderContent = useMemo(() => {
      return (
        <TouchableOpacity
          activeOpacity={1}
          style={tw.style(
            `inset-0 bg-gray-300 bg-opacity-50 z-50`,
            {
              position: isWeb ? 'fixed' : 'absolute',
            },
            backdropStyle,
          )}
          disabled={disabled}
          onPress={disabledPressBackdrop ? undefined : onClose}>
          {children}
        </TouchableOpacity>
      );
    }, [children]);

    if (!isOpen) return null;

    if (isWeb) {
      return createPortal(
        renderContent,
        document.body,
        (document.body.style.overflow = 'unset'),
      );
    }
    return <Portal>{renderContent}</Portal>;
  },
);

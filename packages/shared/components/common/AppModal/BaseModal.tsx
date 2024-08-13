import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';

import {
  View,
  TouchableOpacity,
  Platform,
  ViewStyle,
  SafeAreaView,
} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {Portal} from '@gorhom/portal';
import {createPortal} from 'react-dom';

const isWeb = Platform.OS === 'web';

type AppModalType = {
  contentStyle?: string | ViewStyle;
  backdropStyle?: string | ViewStyle;
  children?: React.ReactNode;
};

export const BaseModal = forwardRef(
  ({contentStyle = '', backdropStyle = '', children}: AppModalType, ref) => {
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
            `inset-0 bg-gray-300 bg-opacity-50 z-10`,
            {
              position: isWeb ? 'fixed' : 'absolute',
            },
            backdropStyle,
          )}
          onPress={onClose}>
          <View
            style={tw.style(
              `bg-white border border-gray-300 bottom-0 rounded-t-2xl max-h-96 w-full pb-6`,
              {position: isWeb ? 'fixed' : 'absolute'},
              contentStyle,
            )}>
            {children}
          </View>
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

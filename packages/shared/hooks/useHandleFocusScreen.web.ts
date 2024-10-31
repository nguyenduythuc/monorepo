import {useCallback, useEffect, useState} from 'react';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {usePathname} from 'next/navigation';
import {UserProfileProps} from '../types/models/authModel';

const useHandleFocusScreen = ({user}: {user?: UserProfileProps}) => {
  const t = useTranslations();
  const pathname = usePathname();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contentModal, setContentModal] = useState('');

  const handleFocus = useCallback(() => {
    if (pathname.includes('/home')) {
      if (user && !user?.identityIssue) {
        setIsModalVisible(true);
        setContentModal(t('Home.verifyAccount'));
      } else if (user?.changeRequired) {
        setIsModalVisible(true);
        setContentModal(t('Home.changePasswordFirstTime'));
      }
    }
  }, [user, pathname]);

  useEffect(() => {
    handleFocus();
  }, [handleFocus, pathname]);

  return {
    isModalVisible,
    setIsModalVisible,
    contentModal,
    setContentModal,
  };
};
export default useHandleFocusScreen;

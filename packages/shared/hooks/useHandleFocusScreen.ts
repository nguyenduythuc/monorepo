import {useCallback, useState} from 'react';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {useFocusEffect} from '@react-navigation/native';
import {UserProfileProps} from '../types/models/authModel';

const useHandleFocusScreen = ({user}: {user?: UserProfileProps}) => {
  const t = useTranslations();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contentModal, setContentModal] = useState('');

  useFocusEffect(
    useCallback(() => {
      if (user && !user?.identityIssue) {
        // not verify account by ekyc
        setIsModalVisible(true);
        setContentModal(t('Home.verifyAccount'));
      } else if (user?.changeRequired) {
        // not update password
        setIsModalVisible(true);
        setContentModal(t('Home.changePasswordFirstTime'));
      }
      return () => {};
    }, [user]),
  );

  return {
    isModalVisible,
    setIsModalVisible,
    contentModal,
    setContentModal,
  };
};
export default useHandleFocusScreen;

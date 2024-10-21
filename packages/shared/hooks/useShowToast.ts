import Toast from 'react-native-toast-message';
import useTranslations from './useTranslations';

const useShowToast = () => {
  const t = useTranslations();

  const handleShowToast = ({
    msg,
    type,
  }: {
    msg: string;
    type: 'success' | 'info' | 'error';
  }) => {
    Toast.show({
      type,
      text1: msg,
    });
  };

  const showCommonErrorToast = () => {
    handleShowToast({
      msg: t('ErrorCommon.message'),
      type: 'error',
    });
  };

  return {
    handleShowToast,
    showCommonErrorToast,
  };
};

export default useShowToast;

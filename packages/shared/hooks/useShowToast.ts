import Toast from 'react-native-toast-message';

const useShowToast = () => {
  const handleShowToast = ({
    msg,
    type,
  }: {
    msg: string;
    type: 'success' | 'warning' | 'error';
  }) => {
    Toast.show({
      type,
      text1: msg,
    });
  };

  return {
    handleShowToast,
  };
};

export default useShowToast;

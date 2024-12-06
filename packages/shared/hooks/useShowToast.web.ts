import {Bounce, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTranslations from './useTranslations';

const useShowToast = () => {
  const t = useTranslations();

  const positionTop = 'top-center';

  const handleShowToast = ({
    msg,
    type,
  }: {
    msg: string;
    type: 'success' | 'info' | 'error';
  }) => {
    type === 'success'
      ? toast.success(msg, {
          position: positionTop,
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          transition: Bounce,
        })
      : type === 'info'
        ? toast.warn(msg, {
            position: positionTop,
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            transition: Bounce,
          })
        : toast.error(msg, {
            position: positionTop,
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            transition: Bounce,
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

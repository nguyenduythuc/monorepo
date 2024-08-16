import {Bounce, toast} from 'react-toastify';
import Toast from 'react-native-toast-message';
import {Platform} from 'react-native';
import 'react-toastify/dist/ReactToastify.css';

const useShowToast = () => {
  const handleShowToast = ({
    msg,
    type,
  }: {
    msg: string;
    type: 'success' | 'warning' | 'error';
  }) => {
    type === 'success'
      ? toast.success(msg, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          transition: Bounce,
        })
      : type === 'warning'
        ? toast.warn(msg, {
            position: 'top-center',
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
            position: 'top-center',
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

  return {
    handleShowToast,
  };
};

export default useShowToast;

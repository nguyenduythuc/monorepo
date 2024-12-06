import {useEffect, useState} from 'react';
import io from 'socket.io-client';
import {useAppSelector} from '../redux/store';
import {PreCheckResponseSocketProps} from '../types/services/loanTypes';
import {useConfigRouting} from './routing';
import {ScreenParamEnum} from '../types/paramtypes';
import {checkErrorPrecheckResult} from '../utils';
import {handleEnvByPlatform} from '../utils/handleEnvByPlatform';

const TIME_WAITING_SOCKET_RESPONSE = 40000;

const usePrecheck = () => {
  const {user} = useAppSelector(state => state.auth);
  const {appNavigate} = useConfigRouting();

  const [receivedData, setReceivedData] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<'init' | 'success' | 'fail'>(
    'init',
  );

  const socket = io(
    `${handleEnvByPlatform('SOCKET_URL')}?room=${user?.login}`,
    {
      transports: ['websocket'],
      // todo: try to another way to send token to socket
      // extraHeaders: {
      //   token: getToken(),
      // },
    },
  );

  useEffect(() => {
    // Handle connection success
    socket.on('connect', () => {
      console.log('Connected');
      setIsConnected('success');
    });

    // Handle connection error
    socket.on('connect_error', (err: any) => {
      console.log('Connection error:', JSON.stringify(err));
      setIsConnected('fail');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (isConnected === 'success') {
        socket.on('get_precheck', (data: {message: string}) => {
          setReceivedData(true);
          socket.disconnect();
          const precheckResponse = (
            JSON.parse(data.message) as PreCheckResponseSocketProps
          ).metadata.precheckData;
          const preCheckError = checkErrorPrecheckResult(precheckResponse);
          if (preCheckError) {
            appNavigate(ScreenParamEnum.PrecheckFail);
          } else {
            appNavigate(ScreenParamEnum.LoanInformation);
          }
        });
      } else if (isConnected === 'fail') {
        appNavigate(ScreenParamEnum.PrecheckFail);
      }
    })();
  }, [isConnected]);

  useEffect(() => {
    // if we can't receive any data from socket in 40s, we will navigate to precheck fail screen
    const unsubcribe = setTimeout(() => {
      if (!receivedData) {
        clearTimeout(unsubcribe);
        // TODO: Should be call api Pending request after decide to move to PrecheckFail screen or not
        socket.disconnect();
        appNavigate(ScreenParamEnum.PrecheckFail);
      }
    }, TIME_WAITING_SOCKET_RESPONSE);
    if (receivedData) {
      clearTimeout(unsubcribe);
    }
    return () => {
      clearTimeout(unsubcribe);
    };
  }, [receivedData]);
};

export default usePrecheck;

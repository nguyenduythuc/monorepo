import {useEffect, useState} from 'react';
import io from 'socket.io-client';
import {useAppSelector} from '../redux/store';
import {PreCheckResponseSocketProps} from '../types/services/loanTypes';
import {useConfigRouting} from './routing';
import {ScreenParamEnum} from '../types/paramtypes';

const TIME_WAITING_SOCKET_RESPONSE = 40000;

const usePrecheck = () => {
  const {user} = useAppSelector(state => state.auth);
  const {appNavigate} = useConfigRouting();

  const [receivedData, setReceivedData] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<'init' | 'success' | 'fail'>(
    'init',
  );

  const socket = io(`ws://ekyc.apieyesapp.dev:8085?room=${user?.login}`, {
    transports: ['websocket'],
  });

  useEffect(() => {
    // Handle connection success
    socket.on('connect', () => {
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
    if (isConnected === 'success') {
      socket.on('get_precheck', (data: {message: string}) => {
        setReceivedData(true);
        socket.disconnect();
        const {precheckData} = (
          JSON.parse(data.message) as PreCheckResponseSocketProps
        ).metadata;
        console.log('precheckData', precheckData);
        const {metadata} = precheckData.data;
        const preCheckError =
          precheckData.data.errorMsg !== 'Success' ||
          !metadata?.duplicateMessage ||
          metadata.duplicateResult === 'fail' ||
          !metadata?.blacklistResult ||
          metadata?.blacklistResult === 'fail' ||
          !metadata?.s37Result ||
          metadata?.s37Result === 'fail';

        if (preCheckError) {
          appNavigate(ScreenParamEnum.PrecheckFail);
        }
      });
    } else if (isConnected === 'fail') {
      appNavigate(ScreenParamEnum.PrecheckFail);
    }
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

import {Platform} from 'react-native';
import Config from 'react-native-config';

export function handleEnvByPlatform(key: string) {
  if (Platform.OS === 'web') {
    switch (key) {
      case 'BASE_API_URL':
        return process.env.BASE_API_URL;
      case 'SOCKET_URL':
        return process.env.SOCKET_URL;
      case 'NEXT_PUBLIC_ONE_SIGNAL_APP_ID':
        return process.env.NEXT_PUBLIC_ONE_SIGNAL_APP_ID;
      case 'NEXT_PUBLIC_DECODE_KEY':
        return process.env.NEXT_PUBLIC_DECODE_KEY;
      default:
        break;
    }
  }
  return Config[key];
}

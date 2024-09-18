import {Platform} from 'react-native';
import Config from 'react-native-config';

export function handleEnvByPlatform(key: string) {
  return Platform.OS !== 'web' ? Config[key] : process.env[key];
}

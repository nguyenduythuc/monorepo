import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootParamList = {
  Home: undefined;
  Test: undefined;
  ComponentScreen: undefined;
  Login: undefined;
  VerifyAccount: undefined;
  OTPLogin: undefined;
};

export type LoginScreenNavigationProps = NativeStackNavigationProp<
  RootParamList,
  'Login'
>;

export type LoginScreenRouteProps = RouteProp<RootParamList, 'Login'>;

export type VerifyAccountScreenNavigationProps = NativeStackNavigationProp<
  RootParamList,
  'VerifyAccount'
>;

export type SignUpScreenNavigationProps = NativeStackNavigationProp<
  RootParamList,
  'OTPLogin'
>;

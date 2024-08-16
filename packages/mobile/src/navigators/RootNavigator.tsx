import React from 'react';
import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {RootParamList} from '../types/paramtypes';
import {
  HomeContainer,
  TestScreen,
  ComponentScreen,
  VerifyAccountContainer,
  EnterOTPContainer,
  LoginContainer,
  SignUpContainer,
  SimulateScreenContainer,
  ProductIntroductionScreenContainer,
  RepaymentScheduleScreenContainer,
  ProductDetailScreenContainer,
  CreateLoanAPLScreenContainer,
  ResetPasswordContainer,
} from '../screens';
import {Linking} from 'react-native';
import {
  setAppToken,
  getToken,
} from '@lfvn-customer/shared/redux/slices/apiSlices/config';

const Stack = createNativeStackNavigator<RootParamList>();

export type PrimaryNavigatorNavigationProp =
  NativeStackNavigationProp<RootParamList>;
// lfvncustomer://product-introduction
// Prefixes for deep link
const prefixes = ['lfvncustomer://', 'https://duythuc.vercel.app'];
// Config path for deep link
const config: LinkingOptions<RootParamList>['config'] = {
  screens: {
    // login: {
    //   path: 'login',
    // },
    // home: {
    //   path: 'home',
    // },
    Test: {
      // example for full config
      path: 'test/:id/:section',
      parse: {
        id: (id: string) => `user-${id}`,
      },
      stringify: {
        id: (id: string) => id.replace(/^user-/, ''),
      },
    },
    'product-introduction': {
      path: 'product-introduction',
    },
    'product-detail': {
      path: 'product-detail/:id',
      parse: {
        id: (id: string) => `product-${id}`,
      },
    },
    simulate: {
      path: 'simulate',
    },
    'create-loan-apl': {
      path: 'create-loan-apl',
    },
  },
};

const RootStack = () => {
  const savedToken = getToken();
  setAppToken(savedToken);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
      initialRouteName="home">
      <Stack.Screen
        name="Test"
        component={TestScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="login"
        component={LoginContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="product-introduction"
        component={ProductIntroductionScreenContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="product-detail"
        component={ProductDetailScreenContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="create-loan-apl"
        component={CreateLoanAPLScreenContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="verify-account"
        component={VerifyAccountContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="enter-otp"
        component={EnterOTPContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sign-up"
        component={SignUpContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="simulate"
        component={SimulateScreenContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="repayment-schedule"
        component={RepaymentScheduleScreenContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ComponentScreen"
        component={ComponentScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="home"
        component={HomeContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="reset-password"
        component={ResetPasswordContainer}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const linking = {
  prefixes,
  subscribe(listener: (url: string) => void) {
    // Custom function to subscribe to incoming links
    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', ({url}) => {
      console.log(url);
      listener(url);
    });

    return () => {
      linkingSubscription.remove();
    };
  },
  config,
};

export const RootNavigator = () => {
  return (
    <NavigationContainer linking={linking}>
      <RootStack />
    </NavigationContainer>
  );
};

RootNavigator.displayName = 'RootNavigator';

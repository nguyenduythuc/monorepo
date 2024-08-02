import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {RootParamList} from '../types/paramtypes';
import {
  HomeScreen,
  TestScreen,
  ComponentScreen,
  VerifyAccountContainer,
  EnterOTPContainer,
  LoginContainer,
  SignUpContainer,
  SimulateScreenContainer,
  RepaymentScheduleScreen,
} from '../screens';
import {Linking} from 'react-native';

const Stack = createNativeStackNavigator<RootParamList>();

export type PrimaryNavigatorNavigationProp =
  NativeStackNavigationProp<RootParamList>;

const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
      initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VerifyAccount"
        component={VerifyAccountContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EnterOTP"
        component={EnterOTPContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SimulateScreen"
        component={SimulateScreenContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RepaymentScheduleScreen"
        component={RepaymentScheduleScreen}
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
        name="Test"
        component={TestScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const linking = {
  prefixes: ['lfvncustomer://', 'https://duythuc.vercel.app'],

  // Custom function to subscribe to incoming links
  subscribe(listener: (url: string) => void) {
    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', ({url}) => {
      console.log(url);
      listener(url);
    });

    return () => {
      linkingSubscription.remove();
    };
  },

  config: {
    screens: {
      Login: {
        path: 'login',
      },
      Test: {
        path: 'test',
      },
      Home: {
        path: 'home',
      },
    },
  },
};

export const RootNavigator = () => {
  return (
    <NavigationContainer linking={linking}>
      <RootStack />
    </NavigationContainer>
  );
};

RootNavigator.displayName = 'RootNavigator';

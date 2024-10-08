import React, {useEffect} from 'react';
import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {RootParamList} from '@lfvn-customer/shared/types/paramtypes';
import {
  HomeContainer,
  TestScreen,
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
  ReviewCustomerEKYCInfoContainer,
  SuccessAccountRegisterContainer,
  VerifyCustomerInfoContainer,
  PrecheckContainer,
  PrecheckFailContainer,
  LoanInformationContainer,
  VisionCameraContainer,
} from '../screens';
import {Linking} from 'react-native';
import {
  setAppToken,
  getToken,
} from '@lfvn-customer/shared/redux/slices/apiSlices/config';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '@lfvn-customer/shared/redux/store';

const Stack = createNativeStackNavigator<RootParamList>();
import {apiSlice} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {CifInfoPendingCheckContainer} from '../screens/CifInfoPendingCheckContainer';

export type PrimaryNavigatorNavigationProp =
  NativeStackNavigationProp<RootParamList>;
// lfvncustomer://product-introduction
// Prefixes for deep link
const prefixes = ['lfvncustomer://', 'https://duythuc.vercel.app'];
// Config path for deep link
const config: LinkingOptions<RootParamList>['config'] = {
  screens: {
    login: {
      path: 'login',
    },
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
  const dispatch = useDispatch();

  const savedToken = getToken();
  setAppToken(savedToken);

  useEffect(() => {
    dispatch(apiSlice.util.invalidateTags(['Product']));
  }, []);

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
      <Stack.Screen
        name="precheck"
        component={PrecheckContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="verify-customer-info"
        component={VerifyCustomerInfoContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="review-customer-ekyc-info"
        component={ReviewCustomerEKYCInfoContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="success-account-register"
        component={SuccessAccountRegisterContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="precheck-fail"
        component={PrecheckFailContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="loan-information"
        component={LoanInformationContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="cif-info-pending-check"
        component={CifInfoPendingCheckContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="vision-camera"
        component={VisionCameraContainer}
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
      listener(url);
    });

    return () => {
      linkingSubscription.remove();
    };
  },
  config,
};

const linkingWithoutAuthen = {
  prefixes,
  config,
  getStateFromPath: (path: string) => {
    // we can check path and return special router for handle not authen case here
    return {
      routes: [
        {
          name: 'home',
          path: path,
        },
      ],
    };
  },
};

export const RootNavigator = () => {
  const {user} = useAppSelector(state => state.auth);
  return (
    <NavigationContainer linking={!user ? linkingWithoutAuthen : linking}>
      <RootStack />
    </NavigationContainer>
  );
};

RootNavigator.displayName = 'RootNavigator';

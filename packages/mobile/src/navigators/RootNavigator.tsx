import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {RootParamList} from '../types/paramtypes';
import {HomeScreen, TestScreen, ComponentScreen} from '../screens';

const Stack = createNativeStackNavigator<RootParamList>();

export type PrimaryNavigatorNavigationProp =
  NativeStackNavigationProp<RootParamList>;

const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}>
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

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

RootNavigator.displayName = 'RootNavigator';

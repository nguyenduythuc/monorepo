/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {ThemeProvider, useTheme} from '@lfvn-customer/shared/themes';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';

const App = () => {
  return (
    <ThemeProvider>
      <SafeAreaView>
        <MainComponent />
      </SafeAreaView>
    </ThemeProvider>
  );
};

const MainComponent = () => {
  const {colorScheme, toggleTheme} = useTheme();

  return (
    <View className="w-full h-full justify-center items-center">
      <Text className="text-xl text-red-900">
        Current themes: {colorScheme}
      </Text>
      <TouchableOpacity onPress={toggleTheme}>
        <Text className="text-xl text-green-600">Toggle Theme</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

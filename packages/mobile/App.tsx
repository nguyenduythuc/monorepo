/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {ThemeProvider, useTheme} from '@lfvn-customer/shared/themes';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from '@lfvn-customer/shared/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <SafeAreaView>
            <MainComponent />
          </SafeAreaView>
        </ThemeProvider>
      </PersistGate>
    </Provider>
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

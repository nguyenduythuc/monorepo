/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from '@lfvn-customer/shared/redux/store';
import LocaleProvider from './providers/I18nContext';
import {ThemeProvider} from '@lfvn-customer/shared/themes';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import SecuritiesChecking from './providers/SecuritiesChecking';
import {RootNavigator} from './navigators/RootNavigator';
import {PortalProvider} from '@gorhom/portal';
import Toast from 'react-native-toast-message';
import toastConfig from './toastConfig';
import {LoadingOverlay} from '@lfvn-customer/shared/components';

const App = () => {
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // OneSignal Initialization
  OneSignal.initialize('7e530448-173f-4056-ace4-91ba163ede72');

  // requestPermission will show the native iOS or Android notification permission prompt.
  // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
  OneSignal.Notifications.requestPermission(true);

  // Method for listening for notification clicks
  OneSignal.InAppMessages.addTrigger('triggerKey', 'triggerValue');

  OneSignal.Notifications.addEventListener('click', event => {
    console.log('OneSignal: notification clicked:', event);
  });

  return (
    <SecuritiesChecking>
      <LocaleProvider>
        <ThemeProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <PortalProvider>
                <RootNavigator />
                <Toast config={toastConfig} />
                <LoadingOverlay />
              </PortalProvider>
            </PersistGate>
          </Provider>
        </ThemeProvider>
      </LocaleProvider>
    </SecuritiesChecking>
  );
};

export default App;

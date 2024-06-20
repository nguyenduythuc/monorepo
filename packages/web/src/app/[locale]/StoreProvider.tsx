"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistorWeb, storeWeb } from "@lfvn-customer/shared/redux/storeWeb";

export default function StoreProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <Provider store={storeWeb}>
      <PersistGate loading={null} persistor={persistorWeb}>
        {children}
      </PersistGate>
    </Provider>
  );
}

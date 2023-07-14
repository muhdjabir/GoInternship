"use client";

import { ReactNode } from "react";
import { store } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

export function ReduxProvider({ children }: { children: ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistStore(store)}>
                {children}
            </PersistGate>
        </Provider>
    );
}

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import authReducer from './features/authSlice';
import resourceReducer from './features/resourceSlice';
import companyReducer from './features/companySlice';
import applicationReducer from "./features/applicationSlice";
import dashboardReducer from "./features/dashboardSlice";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    auth: authReducer,
    resource: resourceReducer,
    company: companyReducer,
    application: applicationReducer,
    dashboard: dashboardReducer,
  });

  const persistConfig = { key: "root", storage, version: 1 };
  const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: {
        persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import { configureStore } from '@reduxjs/toolkit';
import settingReducer from './setting/reducers';
import authReducer from './slices/authSlice'
import { apiSlice } from './slices/apiSlice';


export const store = configureStore({
  reducer: {
    setting: settingReducer,
    authReducer: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;

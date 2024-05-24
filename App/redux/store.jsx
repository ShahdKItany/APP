import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import BookSlice from "./BookSlice";
import WishlistReducer from '../Screens/WishList/WishlistReducer';

// Configuring persist settings
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["books"],
};

// Combining reducers
const rootReducer = combineReducers({
  books: BookSlice,
  wishlist: WishlistReducer,
});

// Creating persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuring store with persisted reducer and middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Creating persistor
export const persistor = persistStore(store);

export default store;

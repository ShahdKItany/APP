// store.js
import { combineReducers, configureStore , createStore} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import BookSlice from "./BookSlice";
import WishlistReducer from '../Screens/WishList/WishlistReducer';
// Import other reducers as needed






const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["books"],
};

const rootReducer = combineReducers({
  books: BookSlice,
  WishlistReducer, 

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;

import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./userSlice";
import MessageReducer from "./messageSlice";
import SocketReducer from "./soketSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: UserReducer,
  message: MessageReducer,
  socket: SocketReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        serializableCheck: false,
      },
    }),
});
export const persistor = persistStore(store);

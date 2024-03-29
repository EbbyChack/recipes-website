import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import expireReducer from "redux-persist-expire";
import recipeReducer from "../reducers/recipeReducer";
import ingredientsAndCatagoriesReducer from "../reducers/ingAndCatReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "ingredientsAndCategories"],

  transforms: [
    expireReducer("auth", {
      expireIn: 7 * 24 * 60 * 60,
      expiredState: {
        loggedProfile: null,
        autoExpire: true,
      },
    }),
  ],
};

const rootReducer = combineReducers({
  auth: authReducer,
  recipes: recipeReducer,
  ingredientsAndCategories: ingredientsAndCatagoriesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
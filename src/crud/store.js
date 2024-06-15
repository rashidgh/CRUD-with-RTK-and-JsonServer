import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";

let { reducerPath, middleware, reducer } = api;

export const store = configureStore({
  reducer: {
    [reducerPath]: reducer,
  },
  middleware: getDefaultmiddleware => getDefaultmiddleware().concat(middleware),
});

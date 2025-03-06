import { configureStore } from "@reduxjs/toolkit";
import { dishesReducer } from "../store/Dishes/dishesSlice.ts";
import { ordersReducer } from '../store/Orders/ordersSlice.ts';

export const store = configureStore({
  reducer: {
    dishes: dishesReducer,
    orders: ordersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

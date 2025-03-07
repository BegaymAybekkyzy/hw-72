import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store.ts";
import { fetchOrders } from "../Dishes/dishesThunks.ts";

interface OrdersState {
  cart: Cart[];
  orderList: OrderData | null;
  loading: boolean;
}

const initialState: OrdersState = {
  cart: [],
  orderList: null,
  loading: false,
};

export const selectCart = (state: RootState) => state.orders.cart;
export const selectLoadingOrders = (state: RootState) => state.orders.loading;
export const selectOrders = (state: RootState) => state.orders.orderList;

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addingDishes: (state, action: PayloadAction<Dish>) => {
      const dish = action.payload;
      const existingIndex = state.cart.findIndex(
        (item) => item.dish.id === dish.id,
      );

      if (existingIndex !== -1) {
        state.cart[existingIndex].amount++;
        state.cart[existingIndex].total =
          state.cart[existingIndex].amount *
          state.cart[existingIndex].dish.price;
      } else {
        state.cart.push({ dish, amount: 1, total: dish.price });
      }
    },

    dishRemoval: (state, action: PayloadAction<Cart>) => {
      const dish = action.payload;
      const existingIndex = state.cart.findIndex(
        (item) => item.dish.id === dish.dish.id,
      );

      if (existingIndex !== -1) {
        if (state.cart[existingIndex].amount > 0)
          state.cart[existingIndex].amount--;
        state.cart[existingIndex].total =
          state.cart[existingIndex].amount *
          state.cart[existingIndex].dish.price;
      }

      if (state.cart[existingIndex].amount === 0)
        state.cart.splice(existingIndex, 1);
    },

    cartEmptying: (state) => {
      state.cart = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orderList = payload;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const ordersReducer = ordersSlice.reducer;
export const { addingDishes, dishRemoval, cartEmptying } = ordersSlice.actions;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';

interface OrdersState {
  orderList: Cart[];
}

const initialState: OrdersState = {
  orderList: [],
};

export const selectOrderList = (state: RootState) => state.orders.orderList;

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addingDishes: (state, action: PayloadAction<Dish>) => {
      const dish = action.payload;
      const existingIndex = state.orderList.findIndex(item => item.dish.id === dish.id);

      if (existingIndex !== -1) {
        state.orderList[existingIndex].amount++;
        state.orderList[existingIndex].total =
          state.orderList[existingIndex].amount * state.orderList[existingIndex].dish.price;
      } else {
        state.orderList.push({dish, amount: 1, total: dish.price});
      }
    },

    dishRemoval: (state, action: PayloadAction<Cart>) => {
      const dish = action.payload;
      const existingIndex =
        state.orderList.findIndex(item => item.dish.id === dish.dish.id);

      if (existingIndex !== -1) {
        if (state.orderList[existingIndex].amount > 0)
          state.orderList[existingIndex].amount--;
          state.orderList[existingIndex].total =
            state.orderList[existingIndex].amount * state.orderList[existingIndex].dish.price;
      }

      if (state.orderList[existingIndex].amount === 0) state.orderList.splice(existingIndex, 1);
    },

    orderClearingList: (state) => {
      state.orderList = [];
    }
  },
});

export const ordersReducer = ordersSlice.reducer;
export const {addingDishes, dishRemoval, orderClearingList} = ordersSlice.actions;

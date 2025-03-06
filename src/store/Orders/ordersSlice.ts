import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';

interface OrdersState {
  orderList: Order[];
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
        state.orderList.push({ dish, amount: 1, total: dish.price });
      }
    }
  },
});

export const ordersReducer = ordersSlice.reducer;
export const { addingDishes } = ordersSlice.actions;

import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../axiosAPI.ts';

export const submitAnOrder = createAsyncThunk<void, OrderData>(
  "orders/submitAnOrder",
  async (order) => {
    await axiosAPI.post("pizza/orders.json", order);
  }
);
import { createSlice } from '@reduxjs/toolkit';
import {
  deleteDish,
  fetchAllDishes,
  idDish,
  submitNewDish,
} from '../thunks/dishesThunks.ts';
import { RootState } from '../../app/store.ts';

interface DishesState {
  dishes: Dish[];
  dish: DishForm | null;
  loading: boolean;
}

const initialState: DishesState = {
  dishes: [],
  dish: null,
  loading: false,
};

export const selectDishesArray =
  (state: RootState) => state.dishes.dishes;

export const selectDishLoading =
  (state: RootState) => state.dishes.loading;

export const selectDish =
  (state: RootState) => state.dishes.dish;

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDishes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllDishes.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.dishes = payload;
      })
      .addCase(fetchAllDishes.rejected, (state) => {
        state.loading = false;
      })

      .addCase(deleteDish.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDish.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteDish.rejected, (state) => {
        state.loading = false;
      })

      .addCase(submitNewDish.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitNewDish.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(submitNewDish.rejected, (state) => {
        state.loading = false;
      })

      .addCase(idDish.pending, (state) => {
        state.loading = true;
      })
      .addCase(idDish.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.dish = payload;
      })
      .addCase(idDish.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const dishesReducer = dishesSlice.reducer;

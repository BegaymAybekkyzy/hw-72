import { createSlice } from '@reduxjs/toolkit';
import {
  deleteDish, dishEditing,
  fetchAllDishes,
  idDish,
  submitNewDish,
} from './dishesThunks.ts';
import { RootState } from '../../app/store.ts';

interface DishesState {
  dishesArray: Dish[];
  editableDish: Dish | null;
  dishIdentifiers: DishID | null;
  loading: boolean;
}

const initialState: DishesState = {
  dishesArray: [],
  editableDish: null,
  dishIdentifiers: null,
  loading: false,
};

export const selectDishesArray =
  (state: RootState) => state.dishes.dishesArray;

export const selectDishLoading =
  (state: RootState) => state.dishes.loading;

export const selectDish =
  (state: RootState) => state.dishes.editableDish;

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    cleaningTheEditedDish: (state) => {
      state.editableDish = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDishes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllDishes.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.dishesArray = payload.dishes;
        state.dishIdentifiers = payload.dishesID;
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
        state.editableDish = payload;
      })
      .addCase(idDish.rejected, (state) => {
        state.loading = false;
      })

      .addCase(dishEditing.pending, (state) => {
        state.loading = true;
      })
      .addCase(dishEditing.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(dishEditing.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const dishesReducer = dishesSlice.reducer;
export const {cleaningTheEditedDish} = dishesSlice.actions;

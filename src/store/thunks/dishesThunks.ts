import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";

export const fetchAllDishes = createAsyncThunk<Dish[], void>(
  "dishes/fetchAllDishes",
  async () => {
    const response = await axiosAPI<DishAPI>("pizza/dishes.json");
    const keysArray = Object.keys(response.data);
    const dishes: Dish[] = keysArray.map((key) => {
      return {
        ...response.data[key],
        id: key,
      };
    });
    return dishes;
  },
);

export const deleteDish = createAsyncThunk<void, string>(
  "dishes/deleteDish",
  async (id) => {
    await axiosAPI.delete(`pizza/dishes/${id}.json`);
  },
);

export const submitNewDish = createAsyncThunk<void, DishForm>(
  "dishes/submitNewDish",
  async (dish) => {
    await axiosAPI.post("pizza/dishes", dish);
  },
);

export const idDish = createAsyncThunk<Dish, string>(
  "dishes/idDish",
  async (id) => {
    const response = await axiosAPI<DishForm>(`contacts/${id}.json`);
    return {
      ...response.data,
      id: id,
    };
  },
);

export const editDish = createAsyncThunk("dishes/editDish", async () => {});

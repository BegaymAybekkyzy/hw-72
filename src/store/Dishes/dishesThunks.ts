import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";

export const fetchAllDishes =
  createAsyncThunk<{ dishes: Dish[], dishesID: DishID }, void>(
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

    const dishesID: DishID = dishes.reduce((acc, dish) => {
      acc[dish.id] = dish.title;
      return acc;
    }, {} as DishID);

    return {
      dishes,
      dishesID
    };
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
    await axiosAPI.post("pizza/dishes.json", dish);
  },
);

export const idDish = createAsyncThunk<Dish, string>(
  "dishes/idDish",
  async (id) => {
    const response = await axiosAPI<DishForm>(`pizza/dishes/${id}.json`);
    return {
      ...response.data,
      id
    };
  },
);

export const dishEditing = createAsyncThunk<void, Dish>(
  "dishes/editDish",
  async (dish) => {
    const updateDish = {
      title: dish.title,
      price: dish.price,
      image:dish.image,
    };

    await axiosAPI.put(`pizza/dishes/${dish.id}.json`, updateDish);
  });

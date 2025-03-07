import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectDishesArray,
  selectDishLoading,
} from "../../store/Dishes/dishesSlice.ts";
import { fetchAllDishes } from "../../store/Dishes/dishesThunks.ts";
import Loader from "../UI/Loader/Loader.tsx";
import "./ListDishes.css";

interface Props {
  card: React.ReactNode;
  additionalElement?: React.ReactNode;
}

const ListDishes: React.FC<Props> = ({ card, additionalElement }) => {
  const dishesList = useAppSelector(selectDishesArray);
  const loading = useAppSelector(selectDishLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllDishes());
  }, [dispatch]);

  let content: React.ReactNode = null;
  if (loading)
    content = (
      <div
        style={{ height: "80vh" }}
        className="d-flex align-items-center justify-content-center"
      >
        <Loader />
      </div>
    );
  if (dishesList.length > 0 && !loading) content = card;

  return (
    <>
      <div className="d-flex align-items-center justify-content-sm-between mb-4">
        <h1>Dishes</h1>
        <div>{additionalElement}</div>
      </div>

      <div className="grid">{content}</div>
    </>
  );
};

export default ListDishes;

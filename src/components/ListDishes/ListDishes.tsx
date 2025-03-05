import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectDishesArray, selectDishLoading } from '../../store/slices/dishesSlice.ts';
import { deleteDish, fetchAllDishes } from '../../store/thunks/dishesThunks.ts';
import Loader from '../UI/Loader/Loader.tsx';
import DishCart from '../DishCart/DishCart.tsx';
import { NavLink } from 'react-router-dom';

const ListDishes = () => {
  const dishesList = useAppSelector(selectDishesArray);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDishLoading);

  const clickDeletion = async (id: string) => {
    await dispatch(deleteDish(id));
    await  dispatch(fetchAllDishes());
  };

  // const addToCart = () => {
  //
  // };

  useEffect(() => {
    dispatch(fetchAllDishes());
  }, [dispatch]);

  let content: React.ReactNode = null;
  if (loading) content = <Loader/>;
  if (dishesList.length > 0 && !loading) content = (
    dishesList.map((dish) => (
      <DishCart
        key={dish.id}
        dish={dish}
        clickDeletion={() =>clickDeletion(dish.id)} />
    ))
  );

  return (
    <main>
      <div className="row align-items-center row-cols-2">
        <h1>Dishes</h1>
        <NavLink to="/admin/dishes/add-new-dish" className="d-block">Add new dish</NavLink>
      </div>

      <div className="grid">
        {content}
      </div>
    </main>
  );
};

export default ListDishes;
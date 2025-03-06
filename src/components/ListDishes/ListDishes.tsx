import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectDishesArray, selectDishLoading } from '../../store/Dishes/dishesSlice.ts';
import { deleteDish, fetchAllDishes } from '../../store/Dishes/dishesThunks.ts';
import Loader from '../UI/Loader/Loader.tsx';
import DishCart from '../DishCart/DishCart.tsx';
import { NavLink, useLocation } from 'react-router-dom';
import './ListDishes.css';

const ListDishes = () => {
  const location = useLocation();
  const path = location.pathname.split('/');
  const pathname = path[1];

  const dishesList = useAppSelector(selectDishesArray);
  const loading = useAppSelector(selectDishLoading);
  const dispatch = useAppDispatch();

  const clickDeletion = async (id: string) => {
    if (pathname !== 'admin') return;
    const warning = confirm('Are you sure you want to delete?');
    if (warning) {
      await dispatch(deleteDish(id));
      await dispatch(fetchAllDishes());
    }
    return;
  };

  const addToCart = () => {
    if(pathname === 'admin') return;
    console.log("clicked");
  };

  useEffect(() => {
    dispatch(fetchAllDishes());
  }, [dispatch]);

  let content: React.ReactNode = null;
  if (loading) content = (
    <div
      style={{height: '80vh'}}
      className="d-flex align-items-center justify-content-center">
      <Loader/>
    </div>
  );
  if (dishesList.length > 0 && !loading) content = (
    <div className="dishes-list">
      {dishesList.map((dish) => (
        <DishCart
          key={dish.id}
          dish={dish}
          clickOnCard={addToCart}
          clickDeletion={() => clickDeletion(dish.id)}/>
      ))}
    </div>
  );

  return (
    <main>
      <div className="row align-items-center row-cols-2">
        <h1>Dishes</h1>
        {pathname === 'admin'
          ? <NavLink to="/admin/dishes/add-new-dish" className="d-block">Add new dish</NavLink>
          : null
        }

      </div>

      <div className="grid">
        {content}
      </div>
    </main>
  );
};

export default ListDishes;
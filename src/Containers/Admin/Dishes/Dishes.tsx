import ListDishes from '../../../components/ListDishes/ListDishes.tsx';
import { deleteDish, fetchAllDishes } from '../../../store/Dishes/dishesThunks.ts';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import DishCard from '../../../components/DishCard/DishCard.tsx';
import { selectDishesArray } from '../../../store/Dishes/dishesSlice.ts';
import { NavLink } from 'react-router-dom';


const Dishes = () => {
  const dispatch = useAppDispatch();
  const dishesList = useAppSelector(selectDishesArray);

  const clickDeletion = async (id: string) => {
    const warning = confirm('Are you sure you want to delete?');
    if (warning) {
      await dispatch(deleteDish(id));
      await dispatch(fetchAllDishes());
    }
    return;
  };

  const content = (
    <div className="dishes-list">
      {dishesList.map((dish) => (
        <DishCard
          key={dish.id}
          dish={dish}
          clickDeletion={() => clickDeletion(dish.id)}/>
      ))}
    </div>
  );

  const formLink = <NavLink to="/admin/dishes/add-new-dish" className="d-block">Add new dish</NavLink>;

  return (
    <main>
      <ListDishes card={content} additionalElement={formLink} />
    </main>
  );
};

export default Dishes;
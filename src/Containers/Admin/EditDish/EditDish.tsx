import DishForm from '../../../components/DishForm/DishForm.tsx';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../app/hooks.ts';
import { idDish } from '../../../store/Dishes/dishesThunks.ts';

const EditDish = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(id) dispatch(idDish(id));
  }, [id, dispatch]);

  return (
    <main>
      <h1 className="text-center">Edit dish</h1>
      <div className="w-50 mx-auto">
        <DishForm isEdit/>
      </div>
    </main>
  );
};

export default EditDish;
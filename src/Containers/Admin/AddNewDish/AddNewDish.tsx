import DishForm from '../../../components/DishForm/DishForm.tsx';


const AddNewDish = () => {
  return (
    <main>
      <h1 className="text-center">AddNewDish</h1>

      <div className="w-75 mx-auto">
        <DishForm/>
      </div>
    </main>
  );
};

export default AddNewDish;
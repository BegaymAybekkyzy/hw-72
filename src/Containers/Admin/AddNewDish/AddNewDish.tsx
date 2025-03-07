import DishForm from "../../../components/DishForm/DishForm.tsx";

const AddNewDish = () => {
  return (
    <main>
      <h1 className="text-center">Add new dish</h1>

      <div className="w-50 mx-auto">
        <DishForm />
      </div>
    </main>
  );
};

export default AddNewDish;

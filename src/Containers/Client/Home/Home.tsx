import ListDishes from '../../../components/ListDishes/ListDishes.tsx';
import DishCard from '../../../components/DishCard/DishCard.tsx';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectDishesArray } from '../../../store/Dishes/dishesSlice.ts';
import { Button} from 'react-bootstrap';
import { addingDishes, selectOrderList } from '../../../store/Orders/ordersSlice.ts';
import ModalWindow from '../../../components/UI/ModalWindow/ModalWindow.tsx';
import { useState } from 'react';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const orderList = useAppSelector(selectOrderList);
  const dishesList = useAppSelector(selectDishesArray);
  const dispatch = useAppDispatch();

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const addToCart = (dish: Dish) => {
    // const dishMutation: DishAPI = {
    //   [dish.id]: {
    //     price: dish.price,
    //     image: dish.image,
    //     title: dish.title,
    //   }
    // };
    dispatch(addingDishes(dish));

    setTotalPrice(prevState => prevState + Number(dish.price));
    console.log(dish);
    console.log(orderList);
  };


  const content = (
    <div className="dishes-list">
      {dishesList.map((dish) => (
        <DishCard
          key={dish.id}
          dish={dish}
          clickOnCard={() => addToCart(dish)}
        />
      ))}
    </div>
  );

  const order = (
    <div>
      <span className="me-5 p-2">Order total: {totalPrice}</span>
      <Button variant="primary" onClick={handleShow}>Checkout</Button>
    </div>
  );

  return (
    <main>
      <ListDishes card={content} additionalElement={order}/>
      <ModalWindow
        total={totalPrice}
        show={showModal}
        orderList = {orderList}
        handleClose={handleClose}/>

    </main>
  );
};

export default Home;
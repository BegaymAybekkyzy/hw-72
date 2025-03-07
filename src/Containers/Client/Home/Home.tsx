import ListDishes from "../../../components/ListDishes/ListDishes.tsx";
import DishCard from "../../../components/DishCard/DishCard.tsx";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { selectDishesArray } from "../../../store/Dishes/dishesSlice.ts";
import { Button } from "react-bootstrap";
import {
  addingDishes,
  cartEmptying,
  dishRemoval,
  selectCart,
} from "../../../store/Orders/ordersSlice.ts";
import ModalWindow from "../../../components/UI/ModalWindow/ModalWindow.tsx";
import { useState } from "react";
import { submitAnOrder } from "../../../store/Orders/ordersThunks.ts";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  const cart = useAppSelector(selectCart);
  const dishesList = useAppSelector(selectDishesArray);
  const dispatch = useAppDispatch();

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const addToCart = (dish: Dish) => {
    dispatch(addingDishes(dish));
  };

  const deleteToCart = (dish: Cart) => {
    dispatch(dishRemoval(dish));
  };

  const orderConfirmation = (cart: Cart[]) => {
    if (!cart) return;
    if (cart.length === 0) {
      alert("Cart is empty");
      setShowModal(false);
      return;
    }

    const warning = confirm("Are you sure you want to order?");
    if (warning) {
      const order = cart.reduce((acc, dish) => {
        acc[dish.dish.id] = dish.amount;
        return acc;
      }, {} as OrderData);
      dispatch(submitAnOrder(order));
      dispatch(cartEmptying());
      setShowModal(false);
    }
  };

  const totalPrice = cart.reduce((acc, cartDish) => {
    return acc + cartDish.dish.price * cartDish.amount;
  }, 0);

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
      <Button variant="primary" onClick={handleShow}>
        Checkout
      </Button>
    </div>
  );

  return (
    <main>
      <ListDishes card={content} additionalElement={order} />
      <ModalWindow
        total={totalPrice}
        show={showModal}
        cart={cart}
        order={() => orderConfirmation(cart)}
        deleteToCart={deleteToCart}
        handleClose={handleClose}
      />
    </main>
  );
};

export default Home;

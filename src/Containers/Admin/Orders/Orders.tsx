import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import {
  fetchAllDishes,
  fetchOrders,
} from "../../../store/Dishes/dishesThunks.ts";
import {
  selectLoadingOrders,
  selectOrders,
} from "../../../store/Orders/ordersSlice.ts";
import { selectDishesID } from "../../../store/Dishes/dishesSlice.ts";
import OrderCart from "../../../components/OrderCart/OrderCart.tsx";
import Loader from "../../../components/UI/Loader/Loader.tsx";
import { orderDeletion } from "../../../store/Orders/ordersThunks.ts";

const Orders = () => {
  const orderList = useAppSelector(selectOrders);
  const dishesInfo = useAppSelector(selectDishesID);
  const loading = useAppSelector(selectLoadingOrders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllDishes());
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) {
    return (
      <div
        style={{ height: "80vh" }}
        className="d-flex align-items-center justify-content-center"
      >
        <Loader />
      </div>
    );
  }

  if (!orderList || !dishesInfo) {
    return <h3>No orders available</h3>;
  }

  const ordersArray: OrdersList[] = Object.entries(orderList).map(
    ([orderId, orderData]) => {
      const dishes = Object.entries(orderData)
        .map(([dishId, amount]) => {
          const dish = dishesInfo[dishId];
          if (!dish) return;
          return {
            dish,
            amount,
            total: dish.price * amount,
          };
        })
        .filter((dish) => dish !== undefined);

      return { orderId, dishes };
    },
  );

  const orderFulfillment = async (orderId: string) => {
    const warning = confirm("Are you sure you want to delete?");
    if (warning) {
      await dispatch(orderDeletion(orderId));
      await dispatch(fetchOrders());
    }
  };

  return (
    <main>
      <h1 className="mb-5">Orders</h1>
      {ordersArray.length > 0 ? (
        ordersArray.map((order) => (
          <OrderCart
            key={order.orderId}
            order={order}
            orderFulfillment={orderFulfillment}
          />
        ))
      ) : (
        <h3>No orders found</h3>
      )}
    </main>
  );
};

export default Orders;

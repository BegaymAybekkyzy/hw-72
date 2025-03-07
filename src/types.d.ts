interface DishForm {
  title: string;
  price: number;
  image: string;
}

interface DishAPI {
  [id: string]: DishForm;
}

interface Dish extends DishForm {
  id: string;
}

interface OrderData {
  [id: string]: number;
}

interface Cart {
  dish: Dish;
  amount: number;
  total: number;
}

interface OrdersList {
  orderId: string;
  dishes: { dish: DishForm; amount: number; total: number }[] | null;
}

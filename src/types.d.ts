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

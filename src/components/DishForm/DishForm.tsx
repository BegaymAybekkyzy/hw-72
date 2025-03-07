import React, { useEffect, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  dishEditing,
  fetchAllDishes,
  submitNewDish,
} from "../../store/Dishes/dishesThunks.ts";
import {
  cleaningTheEditedDish,
  selectDish,
  selectDishLoading,
} from "../../store/Dishes/dishesSlice.ts";
import { NavLink, useNavigate } from "react-router-dom";

interface Props {
  isEdit?: boolean;
}

const initialValues = {
  title: "",
  price: 0,
  image:
    "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg",
};
const DishForm: React.FC<Props> = ({ isEdit = false }) => {
  const [form, setForm] = useState<DishForm>(initialValues);
  const navigate = useNavigate();

  const modifiedDish = useAppSelector(selectDish);
  const loading = useAppSelector(selectDishLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isEdit && modifiedDish) setForm(modifiedDish);
  }, [isEdit, modifiedDish]);

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.title.trim().length === 0 && form.image.trim().length === 0) {
      alert("Please fill in the fields");
      setForm(initialValues);
      return;
    }

    if (isEdit && modifiedDish) {
      dispatch(dishEditing({ ...form, id: modifiedDish.id }));
      dispatch(cleaningTheEditedDish());
    } else {
      dispatch(submitNewDish({ ...form }));
    }
    setForm(initialValues);
    dispatch(fetchAllDishes());
    navigate("/admin");
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <Form onSubmit={onSubmitForm}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          required
          disabled={loading}
          onChange={onChangeInput}
          minLength={1}
          name="title"
          value={form.title}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          required
          disabled={loading}
          onChange={onChangeInput}
          min={1}
          name="price"
          value={form.price}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="text"
          disabled={loading}
          onChange={onChangeInput}
          name="image"
          value={form.image}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <div className="w-50 border">
          <Image
            className="w-100"
            src={form.image || initialValues.image}
            alt={form.title || "No image"}
          />
        </div>
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        className="me-3"
        disabled={loading}
      >
        Save
      </Button>
      <NavLink to="/admin" className="btn btn-secondary">
        Cansel
      </NavLink>
    </Form>
  );
};

export default DishForm;

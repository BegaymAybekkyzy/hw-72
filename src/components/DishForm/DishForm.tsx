import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAppDispatch } from '../../app/hooks.ts';
import { submitNewDish } from '../../store/thunks/dishesThunks.ts';

const initialValues = {
  title: '',
  price: 0,
  image: '',
};
const DishForm = () => {
  const [form, setForm] = useState<DishForm>(initialValues);
  const dispatch = useAppDispatch();

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.title.trim().length === 0 && form.image.trim().length === 0) {
      alert('Please fill in the fields');
      setForm(initialValues);
      return;
    }
    dispatch(submitNewDish({...form}));
    setForm(initialValues);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value, name} = e.target;
    setForm({...form, [name]: value});
  };

  return (
    <Form onSubmit={onSubmitForm}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          required
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
          required
          onChange={onChangeInput}
          minLength={10}
          name="image"
          value={form.image}
        />
      </Form.Group>
      <Button variant="primary" type="submit">Primary</Button>
    </Form>
  );
};

export default DishForm;
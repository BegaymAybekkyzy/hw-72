import React from 'react';
import { Button, Card, Image } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { currency } from '../../constants.ts';

interface Props {
  dish: Dish;
  clickDeletion?: React.MouseEventHandler;
  clickOnCard?: React.MouseEventHandler;
}

const DishCard: React.FC<Props> = ({dish, clickDeletion, clickOnCard}) => {
  const location = useLocation();
  const path = location.pathname.split('/');
  const pathname = path[1];

  let buttons: React.ReactNode = null;

  if (pathname === 'admin') {
    buttons = (
      <>
        <NavLink to={`/admin/dishes/edit-dish/${dish.id}`} className="btn btn-primary me-3">Edit</NavLink>
        <Button variant="danger" onClick={clickDeletion}>Delete</Button>
      </>
    );
  }

  return (
    <Card className="mb-3" onClick={clickOnCard}>
      <div style={{height: "210px"}} className="w-100 p-1">
        <Image className="w-100 d-block" src={dish.image} rounded/>
      </div>

      <Card.Body>
        <Card.Title>{dish.title}</Card.Title>
        <Card.Text>{dish.price} {currency}</Card.Text>
        {buttons}
      </Card.Body>
    </Card>
  );
};

export default DishCard;
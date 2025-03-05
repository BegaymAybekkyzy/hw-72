import React from 'react';
import { Button, Card, Col, Image, Row } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';

interface Props {
  dish: Dish;
  clickDeletion?: React.MouseEventHandler;
}

const DishCart: React.FC<Props> = ({dish, clickDeletion}) => {
  const location = useLocation();
  const path = location.pathname.split('/');
  const pathname = path[1];

  let buttons: React.ReactNode = null;

  if (pathname === 'admin') {
    buttons = (
      <>
        <Button
          variant="dark"
          className="me-3"
          onClick={clickDeletion}
        >Delete</Button>
        <NavLink to="/admin/dishes/edit-dish" className="btn btn-dark">Edit</NavLink>
      </>
    );
  }

  return (
    <Card className="mb-3">
      <Row className="align-items-center">
        <Col md={4}>
          <div>
            <Image className="w-100 d-block" src={dish.image} rounded/>
          </div>
        </Col>
        <Col>
          <Card.Body>
            <Card.Title>{dish.title}</Card.Title>
            <Card.Text>{dish.price} KGS</Card.Text>
            {buttons}
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default DishCart;
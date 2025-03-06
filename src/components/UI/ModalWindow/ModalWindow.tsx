import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { currency, deliveryCost } from '../../../constants.ts';

interface Props {
  show: boolean;
  handleClose: () => void;
  orderList: Order[];
  total: number;
}

const ModalWindow: React.FC<Props> = ({show = false, handleClose, orderList, total}) => {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Your order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {orderList.map((dish) => (
          <div key={dish.dish.id} className="d-flex justify-content-between align-items-center p-2 border-bottom">
            <span>
              <strong>{dish.dish.title}</strong> x{dish.amount}
            </span>
            <span className="d-flex align-items-center">
              <strong className="me-3">{dish.total} {currency}</strong>
              <Button variant="outline-danger" size="sm">Delete</Button>
            </span>
          </div>
        ))}
        <div className="mt-4">
          <p>Delivery: <strong>{deliveryCost} {currency}</strong></p>
          <p>Total: <strong>{total + deliveryCost} {currency}</strong></p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalWindow;
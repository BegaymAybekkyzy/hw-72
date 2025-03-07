import React from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { currency, deliveryCost } from '../../../constants.ts';

interface Props {
  show: boolean;
  cart: Cart[];
  total: number;
  deleteToCart: (dish: Cart) => void;
  handleClose: () => void;
  order: React.MouseEventHandler;
}

const ModalWindow: React.FC<Props> =
  ({show = false, handleClose, cart, total, deleteToCart, order}) => {

    let cartContent: React.ReactNode = <h3 className="text-center py-3">Add the dish to your cart</h3>;
    if (cart.length > 0) {
      cartContent = (
        <Table>
          {cart.map((dish) => (
              <tbody key={dish.dish.id}>
              <tr>
                <td style={{width: '40%'}}>{dish.dish.title}</td>
                <td style={{width: '20%'}}>x{dish.amount}</td>
                <td style={{width: '20%'}}>{dish.total} {currency}</td>
                <td style={{width: '20%'}}>
                  <Button
                    variant="outline-danger"
                    onClick={() => deleteToCart(dish)}
                    size="sm"
                  >Delete</Button></td>
              </tr>
              </tbody>
            ))}
        </Table>
      );
    }

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
          {cartContent}
          <div className="mt-4">
            <p>Delivery: <b>{deliveryCost} {currency}</b></p>
            <p>Total: <b>{total + deliveryCost} {currency}</b></p>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cansel</Button>
          <Button variant="primary" onClick={order}>Order</Button>
        </Modal.Footer>
      </Modal>
    );
  };

export default ModalWindow;
import React from "react";
import { Button, Card, CardHeader, Table } from "react-bootstrap";
import { currency, deliveryCost } from "../../constants.ts";

interface Props {
  order: OrdersList;
  orderFulfillment: (orderId: string) => void;
}

const OrderCart: React.FC<Props> = ({ order, orderFulfillment }) => {
  const totalPrice = order.dishes.reduce((acc, dish) => {
    return acc + dish.dish.price * dish.amount;
  }, 0);

  return (
    <Card className="mb-3">
      <CardHeader>
        <b>Order id</b> {order.orderId}
      </CardHeader>
      <Card.Body className="row justify-content-space-between">
        <div className="col-9">
          <Table>
            <tbody>
              {order.dishes.map((dish) => (
                <tr>
                  <td style={{ width: "40%" }}>{dish.dish.title}</td>
                  <td style={{ width: "20%" }}>{dish.amount}x</td>
                  <td style={{ width: "20%" }}>
                    {dish.total} {currency}
                  </td>
                </tr>
              ))}
              <tr className="mt-3" style={{ borderBottom: "transparent" }}>
                <td colSpan={2}>Delivery</td>
                <td>
                  {deliveryCost} {currency}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="col-3 align-self-center ">
          <span className="d-block px-2">
            Total price:<b> {totalPrice + deliveryCost}</b>
          </span>
          <Button
            variant="link"
            onClick={() => orderFulfillment(order.orderId)}
          >
            Complete order
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default OrderCart;

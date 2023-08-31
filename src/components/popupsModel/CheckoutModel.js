import React from "react";
import { Row, Col, Modal, Button } from "react-bootstrap";
import { Label, Text } from "../elements";
import { LabelField } from "../fields";
import { useAppDispatch, useAppSelector } from "../../app/customStoreHooks";
import { useSelector } from "react-redux";
import { useState } from "react";
import { randomNumber } from "../../helpers/functions/random-number";
import { useOrderBookMutation } from "../../api/authAPI/authApi";
import { setAddToCardItems } from "../../features/orderTaking/orderTakingSlice";
import { HandleNotification } from "../elements/Alert";
import { useNavigate } from "react-router-dom";

export default function CheckoutModel(props) {
  const { addToCardItems } = useSelector((state) => state["order"]);
  const [receivedAmount, setReceivedAmount] = useState(1);
  const handleClosePayment = () => props.handleClosePayment();
  // const handleShowPayment = () => props.handleShowPayment();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [saveOrder] = useOrderBookMutation();
  const handleCheckoutOrder = async () => {
    const payload = {
      restaurantId: 1,
      orderType: props.location.state.service,
      total: addToCardItems.reduce(function (accumulator, curValue) {
        return accumulator + curValue.price * curValue.quantity;
      }, 0),
      orderItems: addToCardItems?.map((item) => {
        return { foodItemId: item.itemId, quantity: item.quantity };
      }),
      number: randomNumber(4),
    };
    await saveOrder(payload)
      .unwrap()
      .then((response) => {
        response && HandleNotification("Order created successfully");
        dispatch(setAddToCardItems([]));
        navigate("/orders-line");
      });
  };
  return (
    <div>
      <Modal
        className="payment-checkout-model"
        show={props.show}
        onHide={handleClosePayment}
      >
        <Modal.Header closeButton>
          <Modal.Title>Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <LabelField
                type={"text"}
                placeholder={"Cash"}
                label={"Payment method"}
              />
              <Label className={"bold cus-mt-5"}>Total</Label>
              <h2 className="bold payment-total-h2 cus-mt-5">
                {`${addToCardItems.reduce(function (accumulator, curValue) {
                  return accumulator + curValue.price * curValue.quantity;
                }, 0)}` || "00.0"}
                <Text as="span" className={"secound-color"}>
                  {" "}
                  ریال
                </Text>
              </h2>
            </Col>
            <Col md={6}>
              <LabelField
                type={"number"}
                placeholder={"Received amount"}
                label={"Received amount"}
                onChange={(e) => setReceivedAmount(e.target.value)}
              />
              <Label className={"bold cus-mt-5"}>Change</Label>
              <h2 className="bold payment-total-h2 green cus-mt-5">
                <Text as="span" className={"secound-color"}>
                  {" "}
                  ریال
                </Text>{" "}
                0.0
              </h2>
              <Label className={"bold cus-mt-5"}>Remaining</Label>
              <h2 className="bold payment-total-h2 red cus-mt-5">
                {`${
                  addToCardItems.reduce(function (accumulator, curValue) {
                    return accumulator + curValue.price * curValue.quantity;
                  }, 0) - receivedAmount
                }` || "00.0"}{" "}
                <Text as="span" className={"secound-color"}>
                  {" "}
                  ریال
                </Text>
                {}
              </h2>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCheckoutOrder}>
            Checkout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

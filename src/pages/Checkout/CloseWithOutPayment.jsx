import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Form } from "react-bootstrap";
import { toast } from "react-toastify";

import { CardLayout } from "../../components/cards";
import { Text } from "../../components/elements";
import api from "../../api/baseUrl";

const CloseWithOutPayment = ({
  initialSubtotal,
  //   noPaymentClicked,
  setNoPaymentClicked,
  orderType,
  discount,
  selectedProducts = { selectedProducts },
  orderId,
}) => {
  const [reasonForCancel, setReasonForCancel] = useState("");
  const [comment, setComment] = useState("");
  const [printReceipt, setPrintReceipt] = useState(false);

  const navigate = useNavigate();

  const handleRadioChange = (event) => {
    setReasonForCancel(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCloseWithoutPayment = () => {
    setNoPaymentClicked(false);
  };

  const saveToDraft = async () => {
    const orderData = {
      order_type: orderType?.toString() || "",
      discount: (discount || "").toString(),
      // paidAmount,
      order_amount: initialSubtotal.toString(),
      status: ("Closed" || "").toString(),
      products: selectedProducts.map((product) => ({
        md_product_id: (product.md_product_id || "").toString(),
        qty: (product.qty || "").toString(),
        price: (product.product_price || "").toString(),
      })),
      cancel_reason: reasonForCancel,
      cancel_comment: comment,
    };
    console.log(orderData);
    try {
      // Send the order data to the API
      const response = await api.post(`/checkout_order/${orderId}`, orderData);
      console.log(response);

      if (response.status === 200) {
        toast.success("Order has been Cancelled");
        navigate("/orders-line"); // navigate to order-line page
      } else {
        console.error("Failed to cancel order.");
      }
    } catch (error) {
      toast.error("Something went wrong with your order.");
    }
  };

  return (
    <Col md={9} lg={8}>
      <CardLayout>
        <Row className="text-center">
          <Col md={6}>
            <h2>Close Without Payment: </h2>
          </Col>
          <Col md={6}>
            <Text as="h4" className="bold fs-2" style={{ color: "#f07632" }}>
              <s>{initialSubtotal} ریال</s>
            </Text>
          </Col>
        </Row>
      </CardLayout>
      <CardLayout>
        <Row className="justify-content-between">
          <Col md={10}>
            <p className="fs-8">Guest has left</p>
          </Col>
          <Col md={2}>
            <Form.Check
              type="radio"
              name="reason"
              value="guestLeft"
              checked={reasonForCancel === "guestLeft"}
              onChange={handleRadioChange}
            />
          </Col>
        </Row>
        <Row className="justify-content-between pt-4">
          <Col md={10}>
            <p className="fs-8">On the house</p>
          </Col>
          <Col md={2}>
            <Form.Check
              type="radio"
              name="reason"
              value="onHouse"
              checked={reasonForCancel === "onHouse"}
              onChange={handleRadioChange}
            />
          </Col>
        </Row>
        <Row className="justify-content-between pt-4">
          <Col md={10}>
            <p className="fs-8">Waiter's Mistake</p>
          </Col>
          <Col md={2}>
            <Form.Check
              type="radio"
              name="reason"
              value="waiterMistake"
              checked={reasonForCancel === "waiterMistake"}
              onChange={handleRadioChange}
            />
          </Col>
        </Row>
        <Row className="justify-content-between pt-4">
          <Col md={12}>
            <Form.Control
              as="textarea"
              placeholder="Enter comment here..."
              value={comment}
              onChange={handleCommentChange}
              className="w-100"
            />
          </Col>
        </Row>
        <Row className="justify-content-between py-2">
          <Col md={10}>
            <p className="fs-8">Print Receipt</p>
          </Col>
          <Col md={2}>
            <Form>
              <Form.Check
                type="switch"
                id="custom-switch"
                checked={printReceipt}
                onChange={() => setPrintReceipt(!printReceipt)}
              />
            </Form>
          </Col>
        </Row>
        <Row className="justify-content-between pt-4">
          <Col md={10}>
            <p
              className="fs-8"
              style={{ color: "#f07632", cursor: "pointer" }}
              onClick={handleCloseWithoutPayment}
            >
              Back to payment
            </p>
          </Col>
          <Col md={2}>
            <button
              className="btn btn-success"
              style={{
                backgroundColor: "salmon",
              }}
              onClick={saveToDraft}
            >
              Pay Now
            </button>
          </Col>
        </Row>
      </CardLayout>
    </Col>
  );
};

export default CloseWithOutPayment;

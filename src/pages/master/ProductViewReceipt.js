import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { Col, Row, Button } from "react-bootstrap";
import {
  faEdit,
  faClock,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";

import { CardLayout } from "../../components/cards";
import { Box } from "../../components/elements";
import { Text } from "../../components/elements";
import api from "../../api/baseUrl";
import { useState } from "react";

export default function ProductViewReceipt({
  products,
  deleteProduct,
  clearCart,
  increaseQty,
  decreaseQty,
  discount,
  unit,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const orderType = location.state?.service;
  const tableName = location.state?.tableName;

  const tax = 5; // Set the tax percentage

  const subtotal = products.reduce(
    (total, product) => total + Number(product.product_price) * product.qty,
    0
  );

  const totalTax = products.reduce(
    (total, product) =>
      total + Number(product.product_price) * product.qty * (tax / 100),
    0
  );
  let discountedSubtotal = subtotal;
  if (unit === "%") {
    const discountAmount = (subtotal * Number(discount)) / 100;
    discountedSubtotal = subtotal - discountAmount;
  } else if (unit === "ریال") {
    discountedSubtotal = subtotal - Number(discount);
  }

  const handleOrderSave = async () => {
    const orderData = {
      orders: [
        {
          order_type: orderType?.toString() || "",
          discount: (`${discount} ${unit}` || "").toString(),
          order_amount: (discountedSubtotal + totalTax || "").toString(),
          status: "UnPaid",
          table_no: "",
          split_type: "",
          seat_no: "",
          parent_order: "",
          cancel_reason: null,
          cancel_comment: null,
          payment_type: "",
          products: products.map((product) => ({
            md_product_id: product.md_product_id,
            qty: product.qty,
            price: product.product_price,
            comment: "",
          })),
        },
      ],
    };

    try {
      // Send the order data to the API
      const response = await api.post("/save_order/", orderData);
      const orderIdResponse = response.data.order[0].td_sale_order_id;
      toast.success("Order has been save in draft!");
      console.log(response);
      navigate("/checkout", {
        state: {
          selectedProducts: products,
          subtotal: discountedSubtotal,
          totalWithoutDiscount: subtotal,
          totalTax: totalTax,
          orderType: orderType,
          discount: discount,
          unit: unit,
          orderId: orderIdResponse, // Here
        },
      });
    } catch (error) {
      toast.error("Something went wrong with your order.");
    }
  };
  const emptyCart = (
    <CardLayout>
      <Row>
        <Col className="text-center">
          <h5>Empty Cart</h5>
        </Col>
      </Row>
    </CardLayout>
  );
  return (
    <div>
      <CardLayout>
        <Row className="f-13">
          <Col sm={12}>
            <FontAwesomeIcon icon={faEdit} />
            {orderType}
            <div className="text-end">
              <FontAwesomeIcon icon={faClock} /> {tableName}
            </div>
          </Col>

          <Col md={12}>
            <Box className={"pv-receipt-box"}>
              {products.length === 0
                ? emptyCart
                : products.map((product, index) => (
                    <CardLayout className="mt-1" key={index}>
                      <Row>
                        <Col md={8}>
                          <Text className="bold" as="span">
                            {product.product_name} (Qty: {product.qty})
                          </Text>
                          <br />
                          <Text as="span">
                            Price : {product.product_price}
                            <Text as="span" className={"bold secound-color"}>
                              {" "}
                              ریال
                            </Text>{" "}
                          </Text>
                          <Text as="span">
                            Tax :{" "}
                            {((product.product_price * tax) / 100).toFixed(2)}
                            <Text as="span" className={"bold secound-color"}>
                              {" "}
                              ریال
                            </Text>{" "}
                          </Text>
                        </Col>
                        <Col md={4} className="d-flex justify-content-end">
                          <FontAwesomeIcon
                            icon={faMinus}
                            color="red"
                            style={{ cursor: "pointer", marginRight: "10px" }}
                            onClick={() => decreaseQty(product.md_product_id)}
                          />
                          <span>{product.qty}</span>
                          <FontAwesomeIcon
                            icon={faPlus}
                            color="green"
                            style={{ cursor: "pointer", marginLeft: "10px" }}
                            onClick={() => increaseQty(product.md_product_id)}
                          />
                        </Col>
                      </Row>
                    </CardLayout>
                  ))}
            </Box>
          </Col>
          <Text className="py-0 mb-0">Tax: {totalTax}</Text>
          <hr class="bg-danger border-2 border-top border-danger py-0 m-0"></hr>
          <Col md={6}>
            Discount:
            <br />
            {unit !== "%" ? discount : "00"}
            <Text as="span" className={"bold secound-color"}>
              {" "}
              {unit === "%" ? `(${discount}%)` : "(0%)"}
            </Text>
          </Col>
          <Col md={6}>
            Total
            <br />
            {(discountedSubtotal + totalTax).toFixed(2)}
            <Text as="span" className={"bold secound-color"}>
              {" "}
              ریال
            </Text>
          </Col>

          <Row className="justify-content-between">
            <Col md={6}>
              <Button
                style={{ backgroundColor: "red" }}
                className="btn"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </Col>
            <Col md={6}>
              <Button
                style={{ backgroundColor: "#F07632" }}
                className="btn"
                onClick={handleOrderSave}
              >
                Save Order
              </Button>
            </Col>
          </Row>
        </Row>
      </CardLayout>
    </div>
  );
}

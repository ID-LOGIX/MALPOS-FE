import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import PageLayout from "../../../layouts/PageLayout";
import { Box, Text, Image, Heading } from "../../../components/elements";
import { useLocation } from "react-router-dom";
import { CardLayout } from "../../cards";
import {
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from "../../../components/elements/Table";
import Breadcrumbs from "../../elements/BreadCrumbs";
import Numpad from "../BySeat/Numpad";
import api from "../../../api/baseUrl";

const ByEvenly = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [seats, setSeats] = useState(0);
  const [showTable, setShowTable] = useState(false);
  const [consumptions, setConsumptions] = useState([]);
  const [sharedQty, setSharedQty] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [parentOrderId, setParentOrderId] = useState(null);
  const [orderType, setOrderType] = useState(null);
  const [payableAmount, setPayableAmount] = useState(null);
  const [dividedAmounts, setDividedAmounts] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const breadcrumbsItems = [
    { label: "Home", link: "/orders-line" },
    { label: "Order", link: "/my-products" },
    { label: "Checkout", link: "/checkout" },
    { label: "Split Bill Evenly", link: "/by-evenly" },
  ];

  useEffect(() => {
    const products = location.state?.selectedProducts;
    setSelectedProducts(products);
    console.log(products);
  }, []);

  const handleSeats = (event) => {
    event.preventDefault();
    setShowTable(true);
  };

  const handleConsumptionChange = (seatIndex, productIndex, event) => {
    let newValue;
    if (event.target.value === "") {
      newValue = 0; // Assign 0 if no input value is provided
    } else {
      newValue = Number(event.target.value);
    }

    const product = selectedProducts[productIndex];

    // Don't update consumption if newValue is greater than product's quantity
    if (newValue > product.qty) {
      return;
    }

    setInputValues((prev) => {
      const newInputValues = { ...prev };
      if (!newInputValues[seatIndex]) newInputValues[seatIndex] = {};
      newInputValues[seatIndex][productIndex] = newValue;

      // Update the other input values
      const remainingQty = product.qty - newValue;
      const remainingSeats = seats - 1;
      for (let i = 0; i < seats; i++) {
        if (i !== seatIndex) {
          newInputValues[i][productIndex] = remainingQty / remainingSeats;
        }
      }

      return newInputValues;
    });

    setSharedQty((prevSharedQty) => {
      const newSharedQty = { ...prevSharedQty };
      const remainingQty = product.qty - newValue;
      newSharedQty[product.md_product_id] = remainingQty / (seats - 1); // distribute remaining qty among remaining seats
      return newSharedQty;
    });
  };

  const handleAmountChange = (seatIndex, event) => {
    let newValue;
    if (event.target.value === "") {
      newValue = 0;
    } else {
      newValue = Number(event.target.value);
    }

    // Don't update amount if newValue is greater than divisible amount
    if (newValue > payableAmount / seats) {
      return;
    }

    setDividedAmounts((prev) => {
      const newAmounts = [...prev];
      const remainingAmount = payableAmount / seats - newValue;
      const remainingSeats = seats - 1;
      for (let i = 0; i < seats; i++) {
        if (i !== seatIndex) {
          newAmounts[i] = remainingAmount / remainingSeats;
        } else {
          newAmounts[i] = newValue;
        }
      }
      return newAmounts;
    });
  };

  const handleSubmit = async () => {
    const orders = Object.entries(inputValues).map(
      ([seatIndex, productQuantities]) => {
        const products = Object.entries(productQuantities).map(
          ([productIndex, qty]) => {
            const product = selectedProducts[Number(productIndex)];
            return {
              md_product_id: product.md_product_id,
              qty,
              price: product.product_price,
              comment: "",
            };
          }
        );

        return {
          status: "UnPaid",
          order_type: orderType,
          payment_type: "",
          split_type: "Receipt Split",
          table_no: "",
          order_amount: products.reduce(
            (total, p) => total + p.qty * p.price,
            0
          ),
          cancel_reason: null,
          cancel_comment: null,
          seat_no: `A${Number(seatIndex) + 1}`,
          parent_order: parentOrderId,
          discount: location.state?.discount || 0,
          products,
        };
      }
    );

    try {
      const response = await api.post("/save_order/", { orders });
      toast.success("Order Splited and Saved!!");
      navigate("/orders-line");
    } catch (error) {
      console.log(error);
    }
    console.log(orders);
  };

  const handleNumInput = (inputValue) => {
    setSeats(Number(inputValue));
  };

  useEffect(() => {
    if (seats > 0 && selectedProducts.length > 0) {
      const newSharedQty = selectedProducts.reduce((acc, product) => {
        acc[product.md_product_id] = product.qty / seats;
        return acc;
      }, {});
      setSharedQty(newSharedQty);

      // Initialize consumptions state with default values
      const newConsumptions = Array.from({ length: seats }).map(
        (_, seatIndex) => {
          return selectedProducts.map((product) => {
            return {
              md_product_id: product.md_product_id,
              product_name: product.product_name,
              qty: newSharedQty[product.md_product_id],
            };
          });
        }
      );
      setConsumptions(newConsumptions);
    }
  }, [seats, selectedProducts]);

  useEffect(() => {
    if (consumptions.length > 0) {
      const newInputValues = consumptions.reduce(
        (acc, seatConsumptions, seatIndex) => {
          acc[seatIndex] = {};
          seatConsumptions.forEach((consumption, productIndex) => {
            acc[seatIndex][productIndex] = consumption.qty;
          });
          return acc;
        },
        {}
      );

      setInputValues(newInputValues);
    }
  }, [consumptions]);

  useEffect(() => {
    if (payableAmount && seats > 0) {
      const dividedAmount = payableAmount / seats;
      setDividedAmounts(Array(seats).fill(dividedAmount));
    } else {
      setDividedAmounts(Array(seats).fill(0));
    }
  }, [payableAmount, seats]);

  useEffect(() => {
    setParentOrderId(location.state?.orderId);
    setOrderType(location.state?.orderType);
    setPayableAmount(location.state?.totalWithDiscount);
  }, []);
  return (
    <PageLayout>
      <CardLayout>
        <Breadcrumbs items={breadcrumbsItems} className="pt-4" />
      </CardLayout>
      <Row className="pt-4">
        <Col sm={9} md={9} lg={9}>
          <CardLayout>
            <Form onSubmit={handleSeats}>
              <Form.Label>How many seats are occupied?</Form.Label>
              <Row>
                <Col xs={2} md={2}>
                  <Form.Control
                    type="number"
                    value={seats}
                    onChange={(e) => setSeats(Number(e.target.value))}
                    required
                  />
                </Col>
                <Col xs={4} md={2}>
                  <Button type="submit">Add</Button>
                </Col>
              </Row>
            </Form>

            <Row>
              <Box className="mc-table-responsive pt-4">
                <Table className="mc-table product">
                  <Thead className="mc-table-head">
                    <Tr>
                      <Th>Id</Th>
                      <Th>Total Amount</Th>
                      {Array.from({ length: seats }).map((_, i) => (
                        <Th key={i}>Seat #{i + 1}</Th>
                      ))}
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>1</Td>
                      <Td>
                        <Box>
                          <Heading as="h6">{payableAmount}</Heading>
                        </Box>
                      </Td>
                      {Array.from({ length: seats }).map((_, seatIndex) => (
                        <Td key={seatIndex}>
                          <Form.Group
                            controlId={`formSeat${seatIndex + 1}`}
                            className="d-flex align-items-center"
                          >
                            <Form.Control
                              type="number"
                              min="0"
                              max={payableAmount / seats}
                              value={
                                dividedAmounts[seatIndex] ??
                                payableAmount / seats
                              }
                              onChange={(e) => handleAmountChange(seatIndex, e)}
                              className="small-input col-md-2"
                            />
                          </Form.Group>
                        </Td>
                      ))}
                    </Tr>
                  </Tbody>
                </Table>
                <Box className="d-flex flex-row justify-content-end">
                  <Button onClick={handleSubmit}>Split</Button>
                </Box>
              </Box>
            </Row>
          </CardLayout>
        </Col>

        <Col sm={3} md={3} lg={3}>
          <Numpad value={seats.toString()} onInput={handleNumInput} />
        </Col>
      </Row>
    </PageLayout>
  );
};

export default ByEvenly;

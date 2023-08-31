import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import PageLayout from "../../../layouts/PageLayout";
import { Box, Heading } from "../../../components/elements";
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
import api from "../../../api/baseUrl";
import Numpad from "../ByAmount/Numpad";

const ByPercentage = () => {
  const [amount, setAmount] = useState("");
  const [seats, setSeats] = useState(0);
  const [inputValues, setInputValues] = useState({});
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [parentOrderId, setParentOrderId] = useState(null);
  const [orderType, setOrderType] = useState(null);
  const [activeField, setActiveField] = useState("seats");

  const location = useLocation();
  const navigate = useNavigate();

  const breadcrumbsItems = [
    { label: "Home", link: "/orders-line" },
    { label: "Order", link: "/my-products" },
    { label: "Checkout", link: "/checkout" },
    { label: "Split Bill By Percentage", link: "/by-percentage" },
  ];

  useEffect(() => {
    const total = location.state?.totalWithDiscount;
    setAmount(total);
    setRemainingAmount(total);
    setParentOrderId(location.state?.orderId);
    setOrderType(location.state?.orderType);
    const products = location.state?.selectedProducts;
    setSelectedProducts(products);
  }, [location]);

  useEffect(() => {
    let newInputValues = {};
    const initialPercentage = 100 / seats;
    for (let i = 0; i < seats; i++) {
      newInputValues[i] = Number(initialPercentage.toFixed(2));
    }
    setInputValues(newInputValues);
    calculateRemainingAmount(newInputValues);
  }, [seats]);

  const handleSeats = (value) => {
    setSeats(Number(value));
  };

  const getActiveFieldValue = () => {
    if (activeField === "seats") return seats.toString();
    if (activeField === "amount") return amount.toString();
    return inputValues[activeField]?.toString() || "";
  };

  const handleConsumptionChange = (seatIndex, input) => {
    let inputValue;

    // Check if input is an event or a direct value
    if (typeof input === "object" && input.target) {
      inputValue = input.target.value ? Number(input.target.value) : 0;
    } else {
      inputValue = Number(input);
    }

    // Ensuring inputValue doesn't exceed 100%
    if (inputValue > 100) {
      inputValue = 100;
    }

    let newInputValues = { ...inputValues };
    newInputValues[seatIndex] = Number(inputValue.toFixed(2));

    let totalPercentage = Object.values(newInputValues).reduce(
      (total, value) => total + value,
      0
    );

    // Checking the total percentage
    // if (totalPercentage > 100) {
    //   alert("Total percentage cannot exceed 100%");
    //   return;
    // }

    setInputValues(newInputValues);
    calculateRemainingAmount(newInputValues);
  };

  const calculateRemainingAmount = (newInputValues) => {
    let usedPercentage = Object.values(newInputValues).reduce(
      (total, value) => total + value,
      0
    );
    let newRemainingAmount = ((100 - usedPercentage) / 100) * amount;

    if (newRemainingAmount > 0) {
      newRemainingAmount = Math.floor(newRemainingAmount);
    } else if (newRemainingAmount < 0) {
      newRemainingAmount = Math.ceil(newRemainingAmount);
    }

    setRemainingAmount(newRemainingAmount);
  };

  const totalPercentage = Object.values(inputValues).reduce(
    (total, value) => total + value,
    0
  );

  const handleSubmit = async () => {
    // Calculate the total bill for all products
    const totalBill = selectedProducts.reduce((total, product) => {
      return total + product.qty * product.product_price;
    }, 0);

    const orders = Object.entries(inputValues).map(
      ([seatIndex, percentage]) => {
        const products = selectedProducts.map((product) => {
          // Calculate this product's share of the total bill
          const productShare =
            (product.product_price * product.qty) / totalBill;
          // Calculate the amount for this product for this seat
          const productAmount = productShare * percentage;
          // Calculate the quantity for this product for this seat
          const qty = productAmount / product.product_price;

          return {
            md_product_id: product.md_product_id,
            qty,
            price: product.product_price,
            comment: "",
          };
        });

        // Calculate the total order amount for this seat as a percentage of the total bill
        const orderAmount = totalBill * (percentage / 100);

        return {
          status: "UnPaid",
          order_type: orderType,
          payment_type: "",
          split_type: "Receipt Split",
          table_no: "",
          order_amount: orderAmount,
          cancel_reason: null,
          cancel_comment: null,
          seat_no: `A${Number(seatIndex) + 1}`,
          parent_order: parentOrderId,
          discount: location.state?.discount || 0,
          products,
        };
      }
    );

    // Validate the total percentage
    const totalPercentage = Object.values(inputValues).reduce(
      (total, value) => total + value,
      0
    );
    if (totalPercentage !== 100) {
      alert("Total percentage should be 100%");
      return;
    }

    try {
      const response = await api.post("/save_order/", { orders });
      toast.success("Order Splited and Saved!!");
      navigate("/orders-line");
    } catch (error) {
      console.log(error);
    }
  };

  const handleNumInput = (newValue) => {
    if (activeField == "seats") {
      setSeats(Number(newValue));
    } else if (activeField === "amount") {
      setAmount(newValue);
    } else if (!isNaN(parseInt(activeField))) {
      setInputValues((prevValues) => ({
        ...prevValues,
        [activeField]: newValue,
      }));
    }
  };

  return (
    <PageLayout>
      <CardLayout>
        <Breadcrumbs items={breadcrumbsItems} className="pt-4" />
      </CardLayout>
      <Row>
        <Col sm={9} md={9} lg={9}>
          <CardLayout>
            <Form onSubmit={() => handleSeats(seats)}>
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

            <Box className="mc-table-responsive pt-4">
              <Table className="mc-table product">
                <Thead className="mc-table-head">
                  <Tr>
                    <Th>Id</Th>
                    <Th>Total Amount</Th>
                    <Th>Remaining Amount</Th>
                    {Array.from({ length: seats }).map((_, i) => (
                      <Th key={i}>Seat #{i + 1} (in %)</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody className="mc-table-body even">
                  <Tr>
                    <Td>1</Td>
                    <Td>
                      <Box>
                        <Heading as="h6">{amount}</Heading>
                      </Box>
                    </Td>
                    <Td>
                      <Box>
                        <Heading as="h6">{remainingAmount}</Heading>
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
                            max="100"
                            value={inputValues[seatIndex] ?? 0}
                            onFocus={() => setActiveField(seatIndex.toString())}
                            onChange={(e) =>
                              handleConsumptionChange(seatIndex, e)
                            }
                            className="small-input col-md-2"
                          />
                        </Form.Group>
                      </Td>
                    ))}
                  </Tr>
                </Tbody>
              </Table>
              <Box className="d-flex flex-row justify-content-end">
                <Button
                  onClick={handleSubmit}
                  disabled={Number(remainingAmount) !== 0}
                >
                  Split
                </Button>
              </Box>
            </Box>
          </CardLayout>
        </Col>
        <Col sm={3} md={3} lg={3}>
          <Numpad
            value={getActiveFieldValue()}
            onInput={handleNumInput}
            handleConsumptionChange={handleConsumptionChange}
            activeField={activeField}
            handleSeats={handleSeats}
            seats={seats}
            setActiveField={setActiveField}
          />
        </Col>
      </Row>
    </PageLayout>
  );
};

export default ByPercentage;

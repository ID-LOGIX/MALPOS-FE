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
import Numpad from "./Numpad";

const ByAmount = () => {
  const [amount, setAmount] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [seats, setSeats] = useState(0);
  const [inputValues, setInputValues] = useState({});
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [parentOrderId, setParentOrderId] = useState(null);
  const [orderType, setOrderType] = useState(null);
  const [activeField, setActiveField] = useState("seats");

  const location = useLocation();
  const navigate = useNavigate();

  const breadcrumbsItems = [
    { label: "Home", link: "/orders-line" },
    { label: "Order", link: "/my-products" },
    { label: "Checkout", link: "/checkout" },
    { label: "Split Bill By Amount", link: "/by-amount" },
  ];

  useEffect(() => {
    const total = location.state?.totalWithDiscount;
    setAmount(total);
    setRemainingAmount(total);
  }, [location]);

  useEffect(() => {
    if (amount && seats) {
      let newInputValues = {};
      const initialSplit = Math.floor(amount / seats);
      for (let i = 0; i < seats; i++) {
        newInputValues[i] = initialSplit;
      }
      newInputValues[seats - 1] += amount - initialSplit * seats;
      setInputValues(newInputValues);
      calculateRemainingAmount(newInputValues);
    }
  }, [seats, amount]);

  useEffect(() => {
    if (amount && seats) {
      let newInputValues = {};
      const initialSplit = Math.floor(amount / seats);
      for (let i = 0; i < seats; i++) {
        newInputValues[i] = initialSplit;
      }
      newInputValues[seats - 1] += amount - initialSplit * seats;
      setInputValues(newInputValues);
      calculateRemainingAmount(newInputValues);
    }
  }, [seats, amount]);

  // New useEffect for product proportions calculation
  useEffect(() => {
    const selectedProducts = location.state?.products;
    if ((amount && seats, selectedProducts)) {
      // Assuming selectedProducts is the array of products in the order
      const selectedProducts = location.state?.products;

      // Calculate the total bill
      const totalBill = selectedProducts.reduce(
        (total, product) => total + product.qty * product.product_price,
        0
      );

      // Calculate the proportion of each product's cost in the total bill
      const productProportions = selectedProducts.map((product) => ({
        ...product,
        proportion: (product.qty * product.product_price) / totalBill,
      }));

      // Calculate product quantities per seat
      let seatProductQuantities = {};
      for (let i = 0; i < seats; i++) {
        seatProductQuantities[i] = productProportions.map((product) => ({
          ...product,
          qty: Math.floor((product.qty * product.proportion) / seats),
        }));
      }

      // Handle remaining quantities
      productProportions.forEach((product, productIndex) => {
        let totalDistributedQty = 0;
        for (let i = 0; i < seats; i++) {
          totalDistributedQty += seatProductQuantities[i][productIndex].qty;
        }

        let remainingQty = product.qty - totalDistributedQty;
        for (let i = 0; remainingQty > 0 && i < seats; i++) {
          seatProductQuantities[i][productIndex].qty += 1;
          remainingQty--;
        }
      });

      // Store the calculated quantities in the state
      setInputValues(seatProductQuantities);
    }
  }, [amount, seats]);

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
    if (typeof input === "object" && input.target) {
      inputValue = input.target.value ? Number(input.target.value) : 0;
    } else {
      inputValue = Number(input);
    }

    if (inputValue > amount) {
      inputValue = amount;
    }

    // Calculate potential new input values without updating the state yet
    let potentialNewInputValues = { ...inputValues, [seatIndex]: inputValue };

    // Calculate potential remaining amount
    let potentialUsedAmount = Object.values(potentialNewInputValues).reduce(
      (total, value) => total + value,
      0
    );
    let potentialRemainingAmount = amount - potentialUsedAmount;

    // If potential remaining amount is negative, show an alert and return early
    if (potentialRemainingAmount < 0) {
      alert("The remaining amount can't be negative!");
      return;
    }

    // Update the state with new values
    setInputValues(potentialNewInputValues);
    calculateRemainingAmount(potentialNewInputValues);
  };

  const calculateRemainingAmount = (newInputValues) => {
    let usedAmount = Object.values(newInputValues).reduce(
      (total, value) => total + value,
      0
    );
    let newRemainingAmount = amount - usedAmount;

    if (newRemainingAmount > 0) {
      newRemainingAmount = Math.floor(newRemainingAmount);
    } else if (newRemainingAmount < 0) {
      newRemainingAmount = Math.ceil(newRemainingAmount);
    }

    setRemainingAmount(newRemainingAmount);
  };

  const handleSubmit = async () => {
    // Calculate the total bill for all products
    const totalBill = selectedProducts.reduce((total, product) => {
      return total + product.qty * product.product_price;
    }, 0);

    const orders = Object.entries(inputValues).map(([seatIndex, amount]) => {
      const products = selectedProducts.map((product) => {
        // Calculate this product's share of the total bill
        const productShare = (product.product_price * product.qty) / totalBill;
        // Calculate the amount for this product for this seat
        const productAmount = productShare * amount;
        // Calculate the quantity for this product for this seat
        const qty = productAmount / product.product_price;

        return {
          md_product_id: product.md_product_id,
          qty,
          price: product.product_price,
          comment: "",
        };
      });

      return {
        status: "UnPaid",
        split_type: "Receipt Split",
        table_no: "",
        order_type: orderType,
        payment_type: "",
        order_amount: products.reduce((total, p) => total + p.qty * p.price, 0),
        cancel_reason: null,
        cancel_comment: null,
        seat_no: `A${Number(seatIndex) + 1}`,
        parent_order: parentOrderId,
        discount: location.state?.discount || 0,
        products,
      };
    });

    try {
      const response = await api.post("/save_order/", { orders });
      toast.success("Order Splited and Saved!!");

      navigate("/orders-line");
    } catch (error) {
      console.log(error);
    }
  };

  const handleNumInput = (newValue) => {
    // Convert the new value to a number for calculations
    const numericValue = Number(newValue);

    if (!isNaN(parseInt(activeField))) {
      // Check if it will make the remainingAmount negative
      let potentialNewInputValues = {
        ...inputValues,
        [activeField]: numericValue,
      };
      let potentialUsedAmount = Object.values(potentialNewInputValues).reduce(
        (total, value) => total + value,
        0
      );
      let potentialRemainingAmount = amount - potentialUsedAmount;

      // If potential remaining amount is negative, show an alert and return early
      if (potentialRemainingAmount < 0) {
        // alert("The remaining amount can't be negative!");
        return;
      }
    }

    // Original logic remains same
    if (activeField == "seats") {
      setSeats(numericValue);
    } else if (activeField === "amount") {
      setAmount(numericValue);
    } else if (!isNaN(parseInt(activeField))) {
      setInputValues((prevValues) => ({
        ...prevValues,
        [activeField]: numericValue,
      }));
    }
  };

  useEffect(() => {
    setParentOrderId(location.state?.orderId);
    setOrderType(location.state?.orderType);
    const products = location.state?.selectedProducts;
    setSelectedProducts(products);
  }, []);
  return (
    <PageLayout>
      <CardLayout>
        <Breadcrumbs items={breadcrumbsItems} className="pt-4" />
      </CardLayout>

      <Row className="pt-4">
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
                      <Th key={i}>Seat #{i + 1}</Th>
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
            handleSeats={handleSeats} // Pass the function here
            setActiveField={setActiveField}
            seats={seats}
          />
        </Col>
      </Row>
    </PageLayout>
  );
};

export default ByAmount;

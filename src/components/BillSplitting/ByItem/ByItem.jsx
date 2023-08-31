import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

import PageLayout from "../../../layouts/PageLayout";
import { Box, Text, Image, Heading } from "../../../components/elements";
import { useLocation, useNavigate } from "react-router-dom";
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

const ByItem = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [seats, setSeats] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [consumptions, setConsumptions] = useState([]);
  const [sharedQty, setSharedQty] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [parentOrderId, setParentOrderId] = useState(null);
  const [orderType, setOrderType] = useState(null);
  const [focusedFieldIndex, setFocusedFieldIndex] = useState(null);
  const [currentValue, setCurrentValue] = useState("");
  const [numpadValue, setNumpadValue] = useState(""); // New state to store the Numpad value for seats
  const [focusedField, setFocusedField] = useState(null); // To keep track of which product & seat is focused

  const navigate = useNavigate();
  const location = useLocation();

  const breadcrumbsItems = [
    { label: "Home", link: "/orders-line" },
    { label: "Order", link: "/my-products" },
    { label: "Checkout", link: "/checkout" },
    { label: "Split Bill By Items", link: "/by-item" },
  ];

  useEffect(() => {
    const products = location.state?.selectedProducts;
    setSelectedProducts(products);
  }, []);

  useEffect(() => {
    if (focusedField && numpadValue !== "") {
      handleSplitInput(focusedField.productIndex);
    }
  }, [numpadValue, focusedField]);

  const handleSeats = (event) => {
    event.preventDefault();
    setShowTable(true);
  };

  const handleConsumptionChange = (seatIndex, productIndex, newValue) => {
    const product = selectedProducts[productIndex];
    const splitValue = inputValues[productIndex]?.splitValue ?? 1;
    // Don't update consumption if newValue is greater than product's quantity
    if (newValue > product.qty) {
      return;
    }

    setInputValues((prev) => {
      const newInputValues = { ...prev };
      if (!newInputValues[seatIndex]) newInputValues[seatIndex] = {};
      newInputValues[seatIndex][productIndex] = newValue;

      // Update the other input values based on split value
      const totalConsumption = product.qty * splitValue;
      const remainingQty = totalConsumption - newValue;
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
      const totalConsumption = product.qty * splitValue;
      const remainingQty = totalConsumption - newValue;
      newSharedQty[product.md_product_id] = remainingQty / (seats - 1); // distribute remaining qty among remaining seats
      return newSharedQty;
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
          order_type: orderType || "unPaid",
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
  };

  const handleSplitChange = (productIndex, newValue) => {
    if (newValue <= 0) {
      toast.error("Invalid split value!");
      return;
    }
    setInputValues((prev) => {
      const newInputValues = { ...prev };
      const product = selectedProducts[productIndex];
      const splitQty = product.qty / newValue;
      for (let i = 0; i < seats; i++) {
        if (i < newValue) {
          newInputValues[i][productIndex] = splitQty;
        } else {
          newInputValues[i][productIndex] = 0;
        }
      }
      return newInputValues;
    });
  };

  const handleSplitInput = (productIndex) => {
    const qtyToDistribute = parseFloat(numpadValue);
    let seatQty = Math.floor(qtyToDistribute / seats);
    let remainder = qtyToDistribute % seats;
    setInputValues((prev) => {
      const newInputValues = { ...prev };
      for (let i = 0; i < seats; i++) {
        if (!newInputValues[i]) newInputValues[i] = {};
        newInputValues[i][productIndex] = seatQty + (i < remainder ? 1 : 0);
      }
      return newInputValues;
    });
    setNumpadValue("");
    setFocusedField(null);
  };
  const handleClear = () => {
    if (focusedFieldIndex !== null) {
      setInputValues((prev) => {
        const newInputValues = { ...prev };
        const { seatIndex, productIndex } = focusedFieldIndex;

        const currentVal =
          newInputValues[seatIndex]?.[productIndex]?.toString() ?? "0";
        const newVal = currentVal.length > 1 ? currentVal.slice(0, -1) : "0"; // Remove last character

        const remainingQty =
          selectedProducts[productIndex].qty - Number(newVal);
        const remainingSeats = seats - 1;

        for (let i = 0; i < seats; i++) {
          if (i !== seatIndex) {
            newInputValues[i][productIndex] = (
              remainingQty / remainingSeats
            ).toFixed(2);
          }
        }

        newInputValues[seatIndex][productIndex] = Number(newVal);

        setCurrentValue(newVal);
        return newInputValues;
      });
    } else {
      // Handle clearing the number of seats input using Numpad
      setNumpadValue(
        (prev) => (prev.length > 1 ? prev.slice(0, -1) : "0") // Remove last character
      );
    }
  };

  const onNumClick = (num) => {
    if (focusedFieldIndex !== null) {
      setInputValues((prev) => {
        const newInputValues = { ...prev };
        const { seatIndex, productIndex } = focusedFieldIndex;

        let currentVal =
          newInputValues[seatIndex]?.[productIndex]?.toString() ?? "0";

        // Handling the decimal point
        if (num === "." && currentVal.includes(".")) return prev; // Do not add another dot

        if (num === "." && !currentVal.includes(".")) {
          currentVal += ".";
        } else if (num !== "." || currentVal !== "0") {
          currentVal += num;
        }

        const totalForThisProduct = parseFloat(currentVal);

        // Check if the new total for this product exceeds the available quantity
        const availableQty = selectedProducts[productIndex].qty;
        if (totalForThisProduct > availableQty) {
          toast.error("Quantity exceeds available amount!");
          return prev; // Return previous state if we're trying to exceed available quantity
        }

        // Convert the total to two decimal places to avoid precision issues
        const newValue = parseFloat(totalForThisProduct.toFixed(2));

        newInputValues[seatIndex][productIndex] = newValue;

        // Calculate remaining quantity and distribute to other seats
        const remainingQty = availableQty - newValue;
        const remainingSeats = seats - 1;
        const qtyPerSeat = (remainingQty / remainingSeats).toFixed(2); // Adjusting to two decimal points

        for (let i = 0; i < seats; i++) {
          if (i !== seatIndex) {
            newInputValues[i][productIndex] = parseFloat(qtyPerSeat);
          }
        }
        setCurrentValue(currentVal);
        return newInputValues;
      });
    } else {
      // Handle the number of seats input using Numpad
      if (num === "." && numpadValue.includes(".")) return; // Do not add another dot

      if (num === "." && !numpadValue.includes(".")) {
        setNumpadValue((prev) => prev + ".");
      } else if (num !== "." || numpadValue !== "0") {
        setNumpadValue((prev) => prev + num);
      }
    }
  };

  const handleConfirmSeats = () => {
    const newSeats = Number(numpadValue);
    if (newSeats > 0) {
      setSeats(newSeats);
      // setNumpadValue(""); // Clear the Numpad input value after confirming seats
      setShowTable(true);
    }
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
    setParentOrderId(location.state?.orderId);
    setOrderType(location.state?.orderType);
  });
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
                      <Th>Name</Th>
                      <Th>Price</Th>
                      <Th>Quantity</Th>
                      <Th>Split</Th>
                      {Array.from({ length: seats }).map((_, i) => (
                        <Th key={i}>Seat #{i + 1}</Th>
                      ))}
                    </Tr>
                  </Thead>
                  <Tbody className="mc-table-body even">
                    {selectedProducts?.map((product, productIndex) => (
                      <Tr key={productIndex}>
                        <Td>{product.md_product_id}</Td>
                        <Td>
                          <Box className="mc-table-product md">
                            <Image
                              src={product.product_image}
                              alt={product.product_name}
                            />
                            <Box className="mc-table-group">
                              <Heading as="h6">{product.product_name}</Heading>
                            </Box>
                          </Box>
                        </Td>
                        <Td>{product.product_price}</Td>
                        <Td>{product.qty}</Td>
                        <Td>
                          <Form.Control
                            type="number"
                            min="0"
                            max={seats}
                            value={inputValues[productIndex]?.splitValue ?? 1}
                            onChange={(e) =>
                              handleSplitChange(
                                productIndex,
                                Number(e.target.value)
                              )
                            }
                            className="small-input col-md-2"
                          />
                        </Td>

                        {Array.from({ length: seats }).map((_, seatIndex) => (
                          <Td key={seatIndex}>
                            <Form.Group
                              controlId={`formSeat${seatIndex + 1}`}
                              className="d-flex align-items-center"
                              onClick={() =>
                                setFocusedFieldIndex({
                                  seatIndex,
                                  productIndex,
                                })
                              }
                            >
                              <Form.Label>
                                <Form.Control
                                  type="number"
                                  min="0"
                                  max={product.qty}
                                  value={
                                    inputValues[seatIndex]?.[productIndex] ??
                                    sharedQty[product.md_product_id]
                                  }
                                  onChange={(e) =>
                                    handleConsumptionChange(
                                      seatIndex,
                                      productIndex,
                                      e.target.value
                                    )
                                  }
                                  onFocus={() =>
                                    setFocusedFieldIndex({
                                      seatIndex,
                                      productIndex,
                                    })
                                  }
                                  className="small-input col-md-2"
                                />
                              </Form.Label>
                            </Form.Group>
                          </Td>
                        ))}
                      </Tr>
                    ))}
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
          <Numpad
            value={focusedFieldIndex !== null ? currentValue : numpadValue} // Use different values for different modes
            onNumClick={onNumClick}
            handleClear={handleClear}
            setCurrentValue={setCurrentValue}
            showConfirmButton={focusedFieldIndex === null} // Show the Confirm button only when entering seats
            onConfirm={handleConfirmSeats} // Callback for Confirm button
            setSeats={setSeats} // Pass the setSeats function here
            seats={seats} // Pass the seats value here
          />
        </Col>
      </Row>
    </PageLayout>
  );
};

export default ByItem;

import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

import PageLayout from "../../../layouts/PageLayout";
import { Box, Text, Image, Heading } from "../../../components/elements";
import { useLocation, useNavigate } from "react-router-dom";
import { CardLayout } from "../../cards";
import Breadcrumbs from "../../elements/BreadCrumbs";
import {
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from "../../../components/elements/Table";
import Numpad from "./Numpad";
import api from "../../../api/baseUrl";

const BySeat = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [seats, setSeats] = useState(0);
  const [showTable, setShowTable] = useState(false);
  const [checkedSeat, setCheckedSeat] = useState({});
  const [selectedSeatDetails, setSelectedSeatDetails] = useState({});
  const [parentOrderId, setParentOrderId] = useState(null);
  const [totalAssignedQty, setTotalAssignedQty] = useState(0);

  const [totalQty, setTotalQty] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  const breadcrumbsItems = [
    { label: "Home", link: "/orders-line" },
    { label: "Order", link: "/my-products" },
    { label: "Checkout", link: "/checkout" },
    { label: "Split Bill By Seat", link: "/by-seat" },
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

  const handleCheck = (rowId, seatId, product) => {
    const isChecked = checkedSeat[rowId] === seatId;
    const previousCheckedState = !!checkedSeat[rowId]; // Check if there was a previously selected seat

    // Calculate the change in the total assigned quantity
    let assignedQtyChange = 0;
    if (isChecked) {
      assignedQtyChange = -1; // Deselecting seat
    } else if (previousCheckedState) {
      assignedQtyChange = 0; // Changing seat
    } else {
      assignedQtyChange = 1; // Selecting seat
    }

    setCheckedSeat((prevState) => ({
      ...prevState,
      [rowId]: isChecked ? null : seatId,
    }));
    setSelectedSeatDetails((prevState) => ({
      ...prevState,
      [rowId]: isChecked ? null : { seat: seatId, product },
    }));
    setTotalAssignedQty((prevState) => prevState + assignedQtyChange);
  };

  const handleNumInput = (inputValue) => {
    setSeats(Number(inputValue));
  };

  const handleSubmit = async () => {
    // convert seat details to an easier format to work with
    const seatProducts = {};
    Object.values(selectedSeatDetails).forEach((detail) => {
      const { seat, product } = detail;
      if (!seatProducts[seat]) {
        seatProducts[seat] = {};
      }
      if (seatProducts[seat][product.md_product_id]) {
        seatProducts[seat][product.md_product_id].qty += 1;
      } else {
        seatProducts[seat][product.md_product_id] = {
          md_product_id: product.md_product_id,
          qty: 1,
          price: product.product_price,
          comment: "",
        };
      }
    });

    const orders = Object.entries(seatProducts).map(([seat, products]) => {
      const productArr = Object.values(products);
      return {
        status: "UnPaid",
        order_type: location.state?.orderType || "online",
        payment_type: "",
        split_type: "Receipt Split",
        table_no: "",
        order_amount: productArr.reduce(
          (total, p) => total + p.qty * p.price,
          0
        ),
        cancel_reason: null,
        cancel_comment: null,
        seat_no: `A${Number(seat) + 1}`,
        parent_order: parentOrderId,
        discount: location.state?.discount || 0,
        products: productArr,
      };
    });

    try {
      const response = await api.post("/save_order/", { orders });
      toast.success("Order Splited and Saved!!");
      navigate("/orders-line");
    } catch (error) {
      console.log(error);
    }

    console.log(orders);
  };

  useEffect(() => {
    const total = selectedProducts.reduce(
      (total, product) => total + product.qty,
      0
    );
    setTotalQty(total);
  }, [selectedProducts]);

  useEffect(() => {
    setParentOrderId(location.state?.orderId);
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
                      <Th>
                        <Box className="mc-table-check">
                          <Text>Id</Text>
                        </Box>
                      </Th>
                      <Th>Name</Th>
                      <Th>Price</Th>

                      {Array.from({ length: seats }).map((_, i) => (
                        <Th key={i}>Seat #{i + 1}</Th>
                      ))}
                    </Tr>
                  </Thead>
                  <Tbody className="mc-table-body even">
                    {selectedProducts?.map((product, index) =>
                      Array.from({ length: product.qty }).map((_, qtyIndex) => (
                        <Tr key={`${index}-${qtyIndex}`}>
                          <Td>
                            <Box className="mc-table-check">
                              <Text>{product.md_product_id}</Text>
                            </Box>
                          </Td>
                          <Td>
                            <Box className="mc-table-product md">
                              <Image
                                src={product.product_image}
                                alt={product.product_name}
                              />
                              <Box className="mc-table-group">
                                <Heading as="h6">
                                  {product.product_name}
                                </Heading>
                              </Box>
                            </Box>
                          </Td>
                          <Td>
                            <Box className="mc-table-product md">
                              <Heading>{product.product_price}</Heading>
                            </Box>
                          </Td>
                          {Array.from({ length: seats }).map((_, seatIndex) => (
                            <Td key={seatIndex}>
                              <Form.Group
                                controlId={`formSeat${seatIndex + 1}`}
                                className="d-flex align-items-center"
                              >
                                <Form.Check
                                  className="col-md-8"
                                  checked={
                                    checkedSeat[`${index}-${qtyIndex}`] ===
                                    seatIndex
                                  }
                                  onChange={() =>
                                    handleCheck(
                                      `${index}-${qtyIndex}`,
                                      seatIndex,
                                      product
                                    )
                                  }
                                  aria-label={`Seat ${seatIndex + 1} Checkbox`}
                                />
                              </Form.Group>
                            </Td>
                          ))}
                        </Tr>
                      ))
                    )}
                  </Tbody>
                </Table>
                <Box className="d-flex flex-row justify-content-end">
                  <Button
                    onClick={handleSubmit}
                    disabled={totalQty !== totalAssignedQty}
                  >
                    Split
                  </Button>
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

export default BySeat;

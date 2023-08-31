import { Row, Col, Button, Form, Container, Modal } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";

import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faMoneyBills,
  faChair,
  faBurger,
  faMoneyBillTransfer,
  faEquals,
  faPercent,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";

import Numpad from "./Numpad";
import { Fieldset, Text } from "../../components/elements";
import api from "../../api/baseUrl";
import { CardLayout } from "../../components/cards";
import ThermalInvoice from "../ThermalInvoice/ThermalInvoice";
import CloseWithOutPayment from "./CloseWithOutPayment";
import ByItem from "../../components/BillSplitting/ByItem/ByItem";

const CheckoutForm = ({ location, navigate }) => {
  const [isUpfrontSplitModalOpnend, setIsUpfrontSplitModalOpnend] =
    useState(false);
  const [isReciptSplitModalOpened, setIsReceiptSlpitModalOpened] =
    useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProductsQty, setSelectedProductsQty] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([
    { method: "Cash", amount: "" },
  ]);
  const [orderType, setOrderType] = useState("");
  const [discount, setDiscount] = useState("");
  const [amountToPay, setAmountToPay] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [initialSubtotal, setInitialSubtotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [printReceipt, setPrintReceipt] = useState(false);
  const [noPaymentClicked, setNoPaymentClicked] = useState(false);
  const [unit, setUnit] = useState("");
  const [bankAccounts, setBankAccounts] = useState([]);
  const [totalWithoutDiscount, setTotalWithoutDiscount] = useState(0);
  const [splitType, setSplitType] = useState("");

  const totalAmountWithTax = parseInt(initialSubtotal) + parseInt(totalTax);
  const totalWithDiscount = totalAmountWithTax - discount;
  const [remainingAmount, setRemainingAmount] = useState(totalWithDiscount);

  const [rowId, setRowId] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const didRun = useRef(false);

  const isMethodSelected = (method) => {
    return paymentMethods.some((payment) => payment.method === method);
  };

  const toggleUpfrontModal = () => {
    setIsUpfrontSplitModalOpnend(!isUpfrontSplitModalOpnend);
  };

  const toggleReceiptSplitModal = () => {
    setIsReceiptSlpitModalOpened(!isReciptSplitModalOpened);
  };

  const completeBill = async () => {
    console.log(orderId, "check");
    // Create the paidAmount array
    const paidAmount = paymentMethods.map((payment) => ({
      tender_type: (payment.method || "").toString(),
      payment_amount: (payment.amount || "").toString(),
    }));

    const orderData = {
      status: "Paid",
      order_type: orderType.toString() || "",
      payment_type: "",
      cancel_reason: "",
      cancel_comment: "",
      order_amount: parseFloat((initialSubtotal + totalTax || "").toString()),
      seat_no: "",
      parent_order: "",
      paidAmount,
    };

    if (discount !== null && discount > 0) {
      orderData.discount = parseFloat((`${discount}${unit}` || "").toString());
    } else {
      orderData.discount = 0.0;
    }

    const url = rowId
      ? `/checkout_order/${rowId}`
      : `/checkout_order/${orderId}`;

    try {
      // Send the order data to the API
      const response = await api.post(url, orderData);
      toast.success("Order has been successfully placed!");
      console.log(response);
      navigate("/orders-line");
    } catch (error) {
      toast.error("Something went wrong with your order.");
    }

    if (printReceipt) {
      handlePrint();
    }
  };

  const calculateRemainingAmount = () => {
    const totalPaymentAmount = paymentMethods.reduce(
      (sum, payment) => sum + Number(payment.amount),
      0
    );
    setRemainingAmount(totalWithDiscount - totalPaymentAmount);
  };

  useEffect(() => {
    calculateRemainingAmount();
  }, [paymentMethods]);

  // Prepare for printing
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const addPaymentMethod = (method) => {
    if (isMethodSelected(method)) {
      toast.error("This payment method has already been selected.");
      return;
    }

    setPaymentMethods((prevPaymentMethods) => {
      if (prevPaymentMethods[0].method === "") {
        // If it's the first time adding a method
        return [
          prevPaymentMethods[0], // Keep the existing method at index 0
          ...prevPaymentMethods.slice(1).map((payment) => ({ ...payment })), // Copy the rest of the payment methods
          { method, amount: "" }, // Add the new payment method
        ];
      } else {
        // Otherwise, add a new method
        return [...prevPaymentMethods, { method, amount: "" }];
      }
    });
  };

  const updatePaymentMethod = (index, field, value) => {
    setPaymentMethods((prevMethods) => {
      const newMethods = [...prevMethods];
      newMethods[index][field] = value;
      return newMethods;
    });
  };

  const getOrderInfo = async () => {
    if (location.state.id != null) {
      const id = parseInt(location.state.id);
      setRowId(id);
      try {
        const response = await api.get(`/edit_order/${id}`);
        setAmountToPay(response.data.order_amount);
        setInitialSubtotal(response.data.order_amount);
        setOrderType(response.data.order_type);
        setSplitType(response.data.split_type);
      } catch (error) {
        toast.error("Something went wrong with your order.");
      }
      try {
        const id = parseInt(location.state.id);
        const response = await api.get(`/check_order_receipt/${id}`);
        const { td_sale_order_item } = response.data[0];

        setSelectedProducts(td_sale_order_item.map((item) => item.md_product));
        setSelectedProductsQty(td_sale_order_item.map((item) => item.qty));
      } catch (error) {
        toast.error("Something went wrong with your order.");
      }
    } else {
      setSelectedProducts(location.state?.selectedProducts);
      setSelectedProductsQty(location.state?.selectedProductsQty || []);
      setAmountToPay(location.state?.subtotal);
      setInitialSubtotal(location.state?.subtotal);
      setOrderType(location.state?.orderType);
      setTotalTax(location.state?.totalTax);
      setDiscount(location.state?.discount);
      setUnit(location.state?.unit);
      setInitialSubtotal(location.state?.totalWithoutDiscount);
      setOrderId(location.state?.orderId);
    }
  };

  const isPaymentSufficient = () => {
    // Calculate total payment amount
    const totalPaymentAmount = paymentMethods.reduce(
      (sum, payment) => sum + Number(payment.amount),
      0
    );

    // Check if total payment amount equals to the amount to pay
    return totalPaymentAmount === totalWithDiscount;
  };
  useEffect(() => {
    if (!didRun.current) {
      getOrderInfo();
      didRun.current = true;
    }

    const paymentMethodsArray = paymentMethods.map((payment) => payment.method);

    // Check if the array includes 'cash' and at least one other method
    if (
      paymentMethodsArray.includes("cash") &&
      paymentMethodsArray.length === 1
    ) {
      setPaymentMethod("cash");
    } else if (paymentMethodsArray.includes("cash")) {
      setPaymentMethod("card & cash");
    } else {
      setPaymentMethod("card");
    }
  }, [paymentMethod, paymentMethods]);

  const removePaymentMethod = (index) => {
    setPaymentMethods((prevMethods) => {
      const newMethods = [...prevMethods];
      newMethods.splice(index, 1);
      return newMethods;
    });
  };

  const getBankAccounts = async () => {
    const res = await api.get(`/bank_account`);
    setBankAccounts(res.data.data);
  };

  useEffect(() => {
    getBankAccounts();
  }, []);

  const handleNavigateToByItem = () => {
    navigate("/by-item", {
      state: {
        selectedProducts: selectedProducts,
        orderId: orderId,
        orderType: orderType,
        discount: discount,
        amount: totalWithDiscount,
      },
    });
  };

  const handleNavigateBySeat = () => {
    navigate("/by-seat", {
      state: {
        selectedProducts: selectedProducts,
        orderId: orderId,
        orderType: orderType,
        discount: discount,
        amount: totalWithDiscount,
      },
    });
  };

  const handleNavigateByEvenly = () => {
    navigate("/by-evenly", {
      state: {
        selectedProducts: selectedProducts,
        orderId: orderId,
        orderType: orderType,
        discount: discount,
        amount: totalWithDiscount,
        totalWithDiscount: totalWithDiscount,
      },
    });
  };

  const handleNavigateByAmount = () => {
    navigate("/by-amount", {
      state: {
        selectedProducts: selectedProducts,
        orderId: orderId,
        orderType: orderType,
        discount: discount,
        amount: totalWithDiscount,
        totalWithDiscount: totalWithDiscount,
      },
    });
  };

  const handleNavigateByPercentage = () => {
    navigate("/by-percentage", {
      state: {
        selectedProducts: selectedProducts,
        totalWithDiscount: totalWithDiscount,
        selectedProducts: selectedProducts,
        orderId: orderId,
        orderType: orderType,
        discount: discount,
        amount: totalWithDiscount,
        totalWithDiscount: totalWithDiscount,
      },
    });
  };

  return (
    <Container fluid>
      {" "}
      <Row>
        <Col sm={4} md={4} lg={4}>
          <Numpad cashAmount={paymentMethods[0].amount} />
        </Col>
        {noPaymentClicked ? (
          <CloseWithOutPayment
            initialSubtotal={totalAmountWithTax}
            // noPaymentClicked={noPaymentClicked}
            setNoPaymentClicked={setNoPaymentClicked}
            orderType={orderType}
            discount={discount}
            selectedProducts={selectedProducts}
            orderId={orderId}
          />
        ) : (
          <Col sm={8} md={8} lg={8}>
            <CardLayout fluid>
              <Row>
                <Col md={6} className=" fs-md-6 fs-sm-1 gx-0">
                  <h3>Amount To Pay:</h3>
                </Col>
                <Col md={4} className="gx-0 text-center">
                  <Text
                    as="h3"
                    className="bold fs-sm-1 fs-md-2"
                    style={{ color: "#F07632" }}
                  >
                    {totalWithDiscount} ریال
                  </Text>
                </Col>
                {splitType == "UpFront" ? (
                  ""
                ) : (
                  <Col
                    md={2}
                    className="gx-0 d-flex justify-content-between p-2"
                    style={{ color: "#F07632", cursor: "pointer" }}
                  >
                    <FontAwesomeIcon
                      icon={faMoneyBills}
                      onClick={toggleUpfrontModal}
                    />
                    <FontAwesomeIcon
                      icon={faMoneyBillTransfer}
                      onClick={toggleReceiptSplitModal}
                    />
                  </Col>
                )}
              </Row>
            </CardLayout>
            <CardLayout>
              <Row>
                <Row className="justify-content-center gx-0">
                  {paymentMethods.map((payment, index) => (
                    <>
                      <Row className="gy-0 mt-2 gx-0">
                        <Col md={10}>
                          <Fieldset className="mc-fieldset">
                            <legend>{payment.method || "Cash"}</legend>{" "}
                            <input
                              placeholder={
                                remainingAmount == 0
                                  ? `(${totalWithDiscount} remaining)`
                                  : `(${remainingAmount} remaining)`
                              }
                              className="w-100 h-sm"
                              value={payment.amount}
                              onChange={(e) =>
                                updatePaymentMethod(
                                  index,
                                  "amount",
                                  e.target.value
                                )
                              }
                            />
                          </Fieldset>
                        </Col>
                        {index !== 0 && (
                          <Col md={2}>
                            <FontAwesomeIcon
                              icon={faTimes}
                              onClick={() => removePaymentMethod(index)}
                              style={{ cursor: "pointer", color: "red" }}
                            />
                          </Col>
                        )}
                      </Row>
                    </>
                  ))}
                </Row>
              </Row>

              <Row style={{ width: "88%" }} className="pt-2">
                <Col md={4} className="gx-0">
                  <Button
                    className="btn btn-success btn-lg cus-checkout-btn"
                    onClick={() => addPaymentMethod("Cash")}
                  >
                    Cash
                  </Button>
                </Col>
                {bankAccounts.map((bank) => (
                  <Col md={4} className="gx-0">
                    <Button
                      className="btn btn-success btn-lg cus-checkout-btn"
                      onClick={() => addPaymentMethod(bank.tender_type)}
                    >
                      <span>{bank.tender_type}</span>
                    </Button>
                  </Col>
                ))}
              </Row>

              <Row
                className="justify-content-between py-2"
                style={{ width: "88%" }}
              >
                <Col md={10} className="gx-0">
                  <p className="fs-8">Print Receipt</p>
                </Col>
                <Col md={2} className="gx-0">
                  <Form className="d-flex justify-content-end">
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      checked={printReceipt}
                      onChange={() => setPrintReceipt(!printReceipt)}
                    />
                  </Form>
                </Col>
              </Row>

              <Row
                className="justify-content-between pt-4"
                style={{ width: "88%" }}
              >
                <Col sm={9} lg={10} className="gx-0">
                  <p
                    className="fs-8"
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => setNoPaymentClicked(!noPaymentClicked)}
                  >
                    Close without payment
                  </p>
                </Col>
                <Col sm={3} lg={2} className="gx-0">
                  <button
                    disabled={!isPaymentSufficient()}
                    className="btn btn-success p-2"
                    onClick={completeBill}
                    style={{
                      backgroundColor: isPaymentSufficient()
                        ? "#f07632"
                        : "grey",
                      width: "100%",
                    }}
                  >
                    <span>Pay Now</span>
                  </button>
                </Col>
              </Row>
              <Modal
                show={isUpfrontSplitModalOpnend}
                onHide={toggleUpfrontModal}
                className="new-order-modal"
              >
                <div>
                  <Modal.Header closeButton>
                    <Modal.Title className="px2">
                      UpFront Bill Split
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="p-4">
                    <Row className="p-4">
                      <Col md={12}>
                        <ul>
                          <li
                            className="f-18 bold border-top ptb-10"
                            style={{ cursor: "pointer" }}
                            onClick={handleNavigateToByItem}
                          >
                            <span className="px-2">
                              <FontAwesomeIcon
                                icon={faBurger}
                                style={{ color: "#F07632" }}
                              />
                            </span>{" "}
                            Split Bill by Item
                          </li>
                          <li
                            className="f-18 bold border-top ptb-10"
                            style={{ cursor: "pointer" }}
                            onClick={handleNavigateBySeat}
                          >
                            <span className="px-2">
                              <FontAwesomeIcon
                                icon={faChair}
                                style={{ color: "#F07632" }}
                              />
                            </span>{" "}
                            Split Bill By Seat
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  </Modal.Body>
                </div>
              </Modal>
              <Modal
                show={isReciptSplitModalOpened}
                onHide={toggleReceiptSplitModal}
                className="new-order-modal"
              >
                <div>
                  <Modal.Header closeButton>
                    <Modal.Title className="px2">Recipt Split</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="p-4">
                    <Row className="p-4">
                      <Col md={12}>
                        <ul>
                          <li
                            className="f-18 bold border-top ptb-10"
                            style={{ cursor: "pointer" }}
                            onClick={handleNavigateToByItem}
                          >
                            <span className="px-2">
                              <FontAwesomeIcon
                                icon={faBurger}
                                style={{ color: "#F07632" }}
                              />
                            </span>{" "}
                            Split Bill by Item
                          </li>
                          <li
                            className="f-18 bold border-top ptb-10"
                            style={{ cursor: "pointer" }}
                            onClick={handleNavigateBySeat}
                          >
                            <span className="px-2">
                              <FontAwesomeIcon
                                icon={faChair}
                                style={{ color: "#F07632" }}
                              />
                            </span>{" "}
                            Split Bill By Seat
                          </li>
                          <li
                            className="f-18 bold border-top ptb-10"
                            style={{ cursor: "pointer" }}
                            onClick={handleNavigateByEvenly}
                          >
                            <span className="px-2">
                              <FontAwesomeIcon
                                icon={faEquals}
                                style={{ color: "#F07632" }}
                              />
                            </span>{" "}
                            Split Bill Evenly
                          </li>
                          <li
                            className="f-18 bold border-top ptb-10"
                            style={{ cursor: "pointer" }}
                            onClick={handleNavigateByAmount}
                          >
                            <span className="px-2">
                              <FontAwesomeIcon
                                icon={faWallet}
                                style={{ color: "#F07632" }}
                              />
                            </span>{" "}
                            Split Bill By Amount
                          </li>
                          <li
                            className="f-18 bold border-top ptb-10"
                            style={{ cursor: "pointer" }}
                            onClick={handleNavigateByPercentage}
                          >
                            <span className="px-2">
                              <FontAwesomeIcon
                                icon={faPercent}
                                style={{ color: "#F07632" }}
                              />
                            </span>{" "}
                            Split Bill By Percentage %
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  </Modal.Body>
                </div>
              </Modal>
            </CardLayout>
          </Col>
        )}
      </Row>
      <div style={{ display: "none" }}>
        <ThermalInvoice
          ref={componentRef}
          selectedProducts={selectedProducts}
          selectedProductsQty={selectedProductsQty}
          initialSubtotal={initialSubtotal}
          discount={discount}
          unit={unit}
          amountToPay={totalWithoutDiscount}
          totalTax={totalTax}
        />
      </div>
    </Container>
  );
};

export default CheckoutForm;

import React, { useState, useEffect, useRef } from "react";
import PageLayout from "../../layouts/PageLayout";
import { useLocation, useNavigate } from "react-router-dom";
import "./Checkout.css"; // Import the CSS file for styling
import "react-toastify/dist/ReactToastify.css";
import CheckoutForm from "./CheckoutForm";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    if (location.state?.orderId !== null) {
      setOrderId(location.state?.orderId);
    }
  }, []);
  return (
    <PageLayout>
      <CheckoutForm orderId={orderId} location={location} navigate={navigate} />
    </PageLayout>
  );
};

export default Checkout;

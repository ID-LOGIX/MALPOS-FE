import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faAngleUp,
  faAngleDown,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { CardLayout } from "./cards";
import decimalToFraction from "../helpers/functions/decimalToFraction";
import api from "../api/baseUrl";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

import "./SideBar.css";

function Sidebar({ isOpen, toggle, receipts, clearReceipts, orderType }) {
  const [expandedSeats, setExpandedSeats] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const tableName = location.state?.tableName;

  const toggleSeatContent = (index) => {
    if (expandedSeats.includes(index)) {
      setExpandedSeats((prev) => prev.filter((seat) => seat !== index));
    } else {
      setExpandedSeats((prev) => [...prev, index]);
    }
  };

  const calculateTotal = (products) => {
    return products.reduce((total, product) => {
      const productAmount = parseFloat(product.product_price) || 0;
      return total + productAmount;
    }, 0);
  };

  const handleClear = () => {
    clearReceipts();
    toggle();
  };

  const handleSaveOrder = async () => {
    // Convert receipts to the desired format
    const seatProducts = {};

    receipts.forEach((products, seat) => {
      products.forEach((product) => {
        if (!seatProducts[seat]) {
          seatProducts[seat] = {};
        }
        if (!seatProducts[seat][product.md_product_id]) {
          seatProducts[seat][product.md_product_id] = {
            md_product_id: product.md_product_id,
            qty: 1,
            price: product.product_price,
            comment: product.comment || null, // Store the comment here
          };
        } else {
          seatProducts[seat][product.md_product_id].qty += 1;
          // If there's a comment for the same product, it's best to concatenate or manage it depending on your use case. For this example, I'm simply taking the latest comment.
          if (product.comment) {
            seatProducts[seat][product.md_product_id].comment = product.comment;
          }
        }
      });
    });

    const orders = Object.entries(seatProducts).map(([seat, products]) => {
      const productArr = Object.values(products);
      return {
        status: "UnPaid",
        split_type: "UpFront",
        order_type: orderType,
        payment_type: "",
        table_no: tableName,
        order_amount: productArr.reduce(
          (total, p) => total + parseFloat(p.price || 0),
          0
        ),
        cancel_reason: null,
        cancel_comment: null,
        seat_no: `A${Number(seat) + 1}`,
        parent_order: null,
        discount: 0,
        products: productArr,
      };
    });
    try {
      const response = await api.post("/save_order/", { orders });
      console.log(response);
      toast.success("Order Splited and Saved!!");
      navigate("/orders-line");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="pt-0 fs-5" style={{ color: "black" }}>
        Table: <span style={{ color: "#f29b30" }}>{tableName}</span>
      </div>
      <button onClick={toggle} className="closebtn pb-4">
        <FontAwesomeIcon icon={faTimes} color="red" />
      </button>
      {receipts.map((products, index) => (
        <CardLayout
          key={index}
          style={
            expandedSeats.includes(index)
              ? { backgroundColor: "#E7E7E7" }
              : { height: "4rem", backgroundColor: "#f29b30" }
          }
        >
          <h6
            className="text-center mb-4 seat-header"
            style={{ color: "black" }}
          >
            <span className="seat-number">Seat #{index + 1}</span>
            <FontAwesomeIcon
              icon={expandedSeats.includes(index) ? faAngleUp : faAngleDown}
              onClick={() => toggleSeatContent(index)}
              className="toggle-icon"
            />
          </h6>

          {expandedSeats.includes(index) && (
            <div className="seat-receipt">
              <div className="d-flex flex-column">
                <div
                  className="d-flex justify-content-between mb-2"
                  style={{ color: "black" }}
                >
                  <span className="flex-fill text-start px-2 product-column">
                    Product
                  </span>
                  <span className="flex-fill text-center px-2 qty-column">
                    Qty
                  </span>
                  <span className="flex-fill text-end px-2 amount-column">
                    Amount
                  </span>
                </div>
                {products.map((product) => (
                  <div
                    key={product.md_product_id}
                    className="d-flex justify-content-between text-center mb-1"
                  >
                    <span className="product-column text-start">
                      {product.product_name}

                      {product.comment && (
                        <OverlayTrigger
                          key="top"
                          placement="top"
                          overlay={
                            <Tooltip id={`tooltip-top`}>
                              {product.comment}
                            </Tooltip>
                          }
                        >
                          <span>
                            <FontAwesomeIcon
                              icon={faInfo}
                              style={{ color: "green" }}
                            />
                          </span>
                        </OverlayTrigger>
                      )}
                    </span>
                    <span className="qty-column text-start">
                      {decimalToFraction(product.qty)}
                    </span>
                    <span className="amount-column">
                      {product.product_price || "N/A"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="total-amount">
                Total: {calculateTotal(products).toFixed(2)}{" "}
                <span style={{ color: "#f29b30" }}> ریال</span>{" "}
              </div>
            </div>
          )}
        </CardLayout>
      ))}
      <div className="btn-group">
        <button onClick={handleClear} className="clear-btn">
          Clear
        </button>
        <button onClick={handleSaveOrder} className="save-btn">
          Save Order
        </button>
      </div>
    </div>
  );
}

export default Sidebar;

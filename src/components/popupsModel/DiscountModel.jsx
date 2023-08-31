import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import { Button } from "../../components/elements";
import { Fieldset, Text } from "../../components/elements";
import "./discountBtn.css";

const DiscountModel = ({ discount, unit, onDiscountChange, onUnitChange }) => {
  const handleUnitChange = (selectedUnit) => {
    onUnitChange(selectedUnit);
  };

  const handleNumClick = (char) => {
    if (char === "delete") {
      onDiscountChange((prevChange) => prevChange.slice(0, -1));
    } else {
      onDiscountChange((prev) => prev + char);
    }
  };

  return (
    <>
      <Row>
        <Col md={12}>
          <Fieldset className="mc-fieldset py-0 px-1">
            {/* <legend>Discount</legend>{" "} */}
            <Row className="text-center">
              <Col md={8}>
                <input
                  readOnly
                  placeholder="Enter Amount"
                  className="w-100 h-sm"
                  value={discount}
                  name="discount"
                />
              </Col>
              <Col
                md={2}
                style={{
                  backgroundColor: unit === "%" ? "#f07632" : "",
                  cursor: "pointer",
                }}
                onClick={() => handleUnitChange("%")}
              >
                <p className="py-1">%</p>
              </Col>
              <Col
                md={2}
                style={{
                  backgroundColor: unit === "ریال" ? "#f07632" : "",
                  cursor: "pointer",
                }}
                onClick={() => handleUnitChange("ریال")}
              >
                <p className="py-1">ریال</p>
              </Col>
            </Row>
          </Fieldset>
        </Col>
      </Row>

      <Row className="text-center pt-4">
        <Row className="gx-0 mt-0 gy-1 gx-0">
          <Col md={4} className="gx-0">
            <Button
              className="btn btn-primary btn-lg discount-num-size"
              onClick={() => handleNumClick("7")}
            >
              7
            </Button>
          </Col>
          <Col md={4} className="gx-0">
            <Button
              className="btn btn-primary btn-lg discount-num-size"
              onClick={() => handleNumClick("8")}
            >
              8
            </Button>
          </Col>
          <Col md={4} className="gx-0">
            <Button
              className="btn btn-primary btn-lg discount-num-size"
              onClick={() => handleNumClick("9")}
            >
              {" "}
              9
            </Button>
          </Col>
        </Row>
        <Row className="gx-0 mt-0 gy-1">
          <Col md={4} className="gx-0">
            <Button
              className="btn btn-primary btn-lg discount-num-size"
              onClick={() => handleNumClick("4")}
            >
              4
            </Button>
          </Col>
          <Col md={4} className="gx-0">
            <Button
              className="btn btn-primary btn-lg discount-num-size"
              onClick={() => handleNumClick("5")}
            >
              5
            </Button>
          </Col>
          <Col md={4} className="gx-0">
            <Button
              className="btn btn-primary btn-lg discount-num-size"
              onClick={() => handleNumClick("6")}
            >
              6
            </Button>
          </Col>
        </Row>
        <Row className="gx-0 mt-0 gy-1">
          <Col md={4} className="gx-0">
            <Button
              className="btn btn-primary btn-lg discount-num-size"
              onClick={() => handleNumClick("1")}
            >
              1
            </Button>
          </Col>
          <Col md={4} className="gx-0">
            <Button
              className="btn btn-primary btn-lg discount-num-size"
              onClick={() => handleNumClick("2")}
            >
              2
            </Button>
          </Col>
          <Col md={4} className="gx-0">
            <Button
              className="btn btn-primary btn-lg discount-num-size"
              onClick={() => handleNumClick("3")}
            >
              3
            </Button>
          </Col>
        </Row>
        <Row className="gx-0 mt-0 gy-1">
          <Col md={4} className="gx-0">
            <Button
              className="btn btn-primary btn-lg discount-num-size"
              onClick={() => handleNumClick(".")}
            >
              .
            </Button>
          </Col>
          <Col md={4} className="gx-0">
            <Button
              className="btn btn-primary btn-lg discount-num-size"
              onClick={() => handleNumClick("0")}
            >
              0
            </Button>
          </Col>
          <Col md={4} className="gx-0">
            <Button
              className="btn btn-primary btn-lg discount-num-size"
              //   style={{ padding: "3rem 4rem 3rem 3rem" }}
              onClick={() => handleNumClick("delete")}
            >
              <FontAwesomeIcon icon={faDeleteLeft} />
            </Button>
          </Col>
        </Row>
      </Row>
    </>
  );
};

export default DiscountModel;

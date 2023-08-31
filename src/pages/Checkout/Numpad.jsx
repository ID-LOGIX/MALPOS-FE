import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import { Button } from "../../components/elements";
import { Fieldset, Text } from "../../components/elements";
import "./Numpad.css";

const Numpad = ({ cashAmount }) => {
  const [change, setChange] = useState("");
  const [subtotal, setSubtotal] = useState("");
  const [showRemaning, setShowRemaining] = useState(false);

  const handleNumClick = (char) => {
    if (!cashAmount || cashAmount === "0") {
      toast.error("Please enter a valid cash amount.");
      setShowRemaining(false);
      return;
    }
    setShowRemaining(true);
    if (char === "delete") {
      setChange((prevChange) => prevChange.slice(0, -1));
    } else {
      setChange(
        (prevChange = prevChange ? prevChange : "") => prevChange + char
      );
    }
  };

  useEffect(() => {
    const updatedSubtotal =
      parseFloat(change || 0) - parseFloat(cashAmount || 0);
    setSubtotal(updatedSubtotal.toFixed(2));
  }, [cashAmount, change]);

  return (
    <>
      <Row>
        <Col className="gx-0">
          <Fieldset className="mc-fieldset">
            <legend>Change Calculator</legend>{" "}
            <Row>
              <Col sm={8}>
                <input
                  readOnly
                  placeholder="Enter Amount"
                  className="w-100 h-sm"
                  value={change}
                  name="change"
                />
              </Col>
              <Col sm={4}>
                {showRemaning && (
                  <p
                    className="d-flex flex-row"
                    style={{
                      fontSize: "14px",
                      textAlign: "end",
                      padding: "0px",
                    }}
                  >
                    change: <span style={{ color: "#f07632" }}>{subtotal}</span>
                  </p>
                )}
              </Col>
            </Row>
          </Fieldset>
        </Col>
      </Row>

      <Row className="text-center pt-4">
        <Row className="gx-0 mt-0 gy-1">
          <Col sm={4} className="gx-0">
            <Button
              className="btn btn-primary btn-lg numpad-btn p-md-4"
              onClick={() => handleNumClick("7")}
            >
              7
            </Button>
          </Col>
          <Col sm={4} className="gx-0">
            <Button
              className="btn btn-primary btn-lg numpad-btn p-md-4"
              onClick={() => handleNumClick("8")}
            >
              8
            </Button>
          </Col>
          <Col sm={4} className="gx-0">
            <Button
              className="btn btn-primary btn-lg numpad-btn p-md-4"
              onClick={() => handleNumClick("9")}
            >
              {" "}
              9
            </Button>
          </Col>
        </Row>
        <Row className="gx-0 mt-0 gy-1">
          <Col sm={4} className="gx-0">
            <Button
              className="btn btn-primary btn-lg numpad-btn p-md-4"
              onClick={() => handleNumClick("4")}
            >
              4
            </Button>
          </Col>
          <Col sm={4} className="gx-0">
            <Button
              className="btn btn-primary btn-lg numpad-btn p-md-4"
              onClick={() => handleNumClick("5")}
            >
              5
            </Button>
          </Col>
          <Col sm={4} className="gx-0">
            <Button
              className="btn btn-primary btn-lg numpad-btn p-md-4"
              onClick={() => handleNumClick("6")}
            >
              6
            </Button>
          </Col>
        </Row>
        <Row className="gx-0 mt-0 gy-1">
          <Col sm={4} className="gx-0">
            <Button
              className="btn btn-primary btn-lg numpad-btn p-md-4"
              onClick={() => handleNumClick("1")}
            >
              1
            </Button>
          </Col>
          <Col sm={4} className="gx-0">
            <Button
              className="btn btn-primary btn-lg numpad-btn p-md-4"
              onClick={() => handleNumClick("2")}
            >
              2
            </Button>
          </Col>
          <Col sm={4} className="gx-0">
            <Button
              className="btn btn-primary btn-lg numpad-btn p-md-4"
              onClick={() => handleNumClick("3")}
            >
              3
            </Button>
          </Col>
        </Row>
        <Row className="gx-0 mt-0 gy-1">
          <Col sm={4} className="gx-0">
            <Button
              className="btn btn-primary btn-lg numpad-btn p-md-4"
              onClick={() => handleNumClick(".")}
            >
              .
            </Button>
          </Col>
          <Col sm={4} className="gx-0">
            <Button
              className="btn btn-primary btn-lg numpad-btn p-md-4"
              onClick={() => handleNumClick("0")}
            >
              0
            </Button>
          </Col>
          <Col sm={4} className="gx-0">
            <Button
              className="btn btn-primary btn-lg numpad-btn  p-md-4"
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

export default Numpad;

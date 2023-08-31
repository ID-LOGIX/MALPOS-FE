import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

import { Button } from "../../elements";
import { Fieldset } from "../../elements";

import "../Numpad.css";

const Numpad = ({
  value,
  onInput,
  handleConsumptionChange,
  activeField,
  handleSeats,
  seats,
  setActiveField,
}) => {
  const handleNumClick = (input) => {
    let newValue;
    if (input === "delete") {
      newValue = value.slice(0, -1); // remove the last character
    } else if (activeField === "seats") {
      const newSeatsValue = seats === 0 ? input : seats + input;
      handleSeats(Number(newSeatsValue)); // Call handleSeats with the new value
      setActiveField("seats");
      newValue = newSeatsValue;
    } else {
      newValue = value + input;
    }
    // Call handleConsumptionChange and onInput with the computed newValue
    handleConsumptionChange(activeField, Number(newValue));
    onInput(newValue);
  };

  return (
    <>
      <Row>
        <Col className="gx-0">
          <Fieldset className="mc-fieldset">
            <legend>Numpad</legend>{" "}
            <Row>
              <Col sm={8}>
                <input
                  readOnly
                  placeholder="Enter Value"
                  className="w-100 h-sm"
                  value={value}
                  name="change"
                />
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

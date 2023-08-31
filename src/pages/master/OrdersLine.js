import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { CardLayout } from "../../components/cards";
import { Box, Text, Button } from "../../components/elements";
import PageLayout from "../../layouts/PageLayout";
import OrderLineTable1 from "./OrderLineTable1";
import CusTabButtons from "../../components/elements/CusTabButtons";
import OrderLineTable2 from "./OrderLineTable2";
import Sidebar from "../../layouts/Sidebar";
import LayoutWithoutSidebar from "../../layouts/LayoutWithoutSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import LayoutMain from "../../layouts/LayoutMain";
import { Modal } from "react-bootstrap";
import {
  faPlus,
  faStore,
  faBicycle,
  faBox,
} from "@fortawesome/free-solid-svg-icons";

export default function OrdersLine() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tableName, setTableName] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  const handleTableClick = (name) => {
    handleShow();
    setTableName(name);
  };

  const buttonList = [
    { text: "First Floor", index: 0, id: "" },
    { text: "Second Floor", index: 1, id: "1" },
  ];
  return (
    <div>
      <LayoutMain>
        <Row>
          <Col md={12}>
            <CardLayout className={"f-13 cusTabsbuttons"}>
              {buttonList.map((buttonText) => (
                <CusTabButtons
                  key={buttonText.index}
                  buttonText={buttonText}
                  activeIndex={activeIndex}
                  handleItemClick={handleItemClick}
                />
              ))}
            </CardLayout>
            <button onClick={() => navigate("/my-products")}>
              Test Navigate
            </button>
          </Col>
          {activeIndex === 0 && (
            <OrderLineTable1 onTableClick={handleTableClick} />
          )}
          {activeIndex === 1 && (
            <OrderLineTable2 onTableClick={handleTableClick} />
          )}
        </Row>
        <Modal className="new-order-model" show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Row className="text-center">
              <Col md={4} className="mt-0">
                <Link
                  to="/my-products"
                  onClick={handleClose}
                  state={{ service: "In-Store", tableName: tableName }}
                >
                  <FontAwesomeIcon icon={faStore} size={"1x"} />
                  <br />
                  <Text className={"new-order-model-text f-13 bold"} as="span">
                    In-Store
                  </Text>
                </Link>
              </Col>
              <Col md={4} className="mt-0">
                <Link
                  to="/my-products"
                  onClick={handleClose}
                  state={{ service: "Delivery", tableName: tableName }}
                >
                  <FontAwesomeIcon icon={faBicycle} size={"1x"} />
                  <br />

                  <Text className={"new-order-model-text f-13 bold"} as="span">
                    Delivery
                  </Text>
                </Link>
              </Col>
              <Col md={4} className="mt-0">
                <Link
                  to="/my-products"
                  onClick={handleClose}
                  state={{ service: "Takeaway", tableName: tableName }}
                >
                  <FontAwesomeIcon icon={faBox} size={"1x"} />
                  <br />

                  <Text className="new-order-model-text f-13 bold">
                    Takeaway
                  </Text>
                </Link>
              </Col>
              {/* <Col md={12}>
                <Box className={"f-13 bold border-top ptb-10"}>
                  <Link
                    to="/my-products"
                    onClick={handleClose}
                    state={{ service: "dwe" }}
                  >
                    <button className={"bold"}>dwe</button>
                  </Link>
                </Box>
                <Box className={"f-13 bold border-top ptb-10"}>
                  <Link
                    to="/my-products"
                    onClick={handleClose}
                    state={{ service: "Hungerstation" }}
                  >
                    <button className={"bold"}>Hungerstation</button>
                  </Link>
                </Box>
                <Box className={"f-13 bold border-top ptb-10"}>
                  <Link
                    to="/my-products"
                    onClick={handleClose}
                    state={{ service: "Marsool" }}
                  >
                    <button className={"bold"}>Marsool</button>
                  </Link>
                </Box>
              </Col> */}
            </Row>
          </Modal.Body>
        </Modal>
      </LayoutMain>
    </div>
  );
}

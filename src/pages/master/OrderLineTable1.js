import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { CardLayout } from "../../components/cards";
import { Box, Text } from "../../components/elements";

export default function OrderLineTable1({ onTableClick }) {
  const navigate = useNavigate();

  return (
    <div>
      <Col md={12}>
        <CardLayout>
          <Box className={"order-line-tables-wrapper"}>
            <Box className={"order-line-tables"}>
              <Row>
                <Col md={3}>
                  <Box className={"child-one-box-container"}>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        onTableClick("Table 1");
                      }}
                      className={"child-one-box"}
                    >
                      <h6>Table 1</h6>
                      <Text as="span">4</Text>
                    </div>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        onTableClick("Table 2");
                      }}
                      className={"child-one-box"}
                    >
                      <h6>Table 2</h6>
                      <Text as="span">4</Text>
                    </div>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        onTableClick("Table 3");
                      }}
                      className={"child-one-box"}
                    >
                      <h6>Table 3</h6>
                      <Text as="span">4</Text>
                    </div>
                    <div
                      onClick={() => {
                        onTableClick("Table 4");
                      }}
                      className={"child-one-box"}
                    >
                      <h6>Table 4</h6>
                      <Text as="span">4</Text>
                    </div>
                  </Box>
                </Col>
                <Col md={3}>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      onTableClick("VIP");
                    }}
                    className={"child-two-box-container"}
                  >
                    <Box className={"child-two-box"}>
                      <h6>VIP</h6>
                      <Text as="span">4</Text>
                    </Box>
                  </div>
                </Col>
                <Col md={3}>
                  <Box className={"child-thr-box-container"}>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        onTableClick("Table 5");
                      }}
                      className={"child-thr-box"}
                    >
                      <h6>Table 5</h6>
                      <Text as="span">4</Text>
                    </div>
                    <div
                      onClick={() => {
                        onTableClick("Table 6");
                      }}
                      className={"child-thr-box"}
                    >
                      <h6>Table 6</h6>
                      <Text as="span">4</Text>
                    </div>
                  </Box>
                </Col>
                <Col md={3}>
                  <Box className={"child-one-box-container"}>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        onTableClick("Table 7");
                      }}
                      className={"child-one-box"}
                    >
                      <h6>Table 7</h6>
                      <Text as="span">4</Text>
                    </div>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        onTableClick("Table 8");
                      }}
                      className={"child-one-box child-four-box"}
                    >
                      <h6>Table 8</h6>
                      <Text as="span">22</Text>
                    </div>
                    <div
                      onClick={(event) => {
                        onTableClick("Table 9", event);
                      }}
                      className={"child-one-box"}
                    >
                      <h6>Table 9</h6>
                      <Text as="span">15</Text>
                    </div>
                  </Box>
                </Col>
              </Row>
            </Box>
          </Box>
        </CardLayout>
      </Col>
    </div>
  );
}

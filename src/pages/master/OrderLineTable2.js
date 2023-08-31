import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CardLayout } from "../../components/cards";
import { Box, Text } from "../../components/elements";
export default function OrderLineTable2() {
  return (
    <div>
      <Col md={12}>
        <CardLayout>
          <Box className={"order-line-tables-wrapper"}>
            <Box className={"order-line-tables"}>
              <Row>
                <Col md={3}>
                  <Box className={"child-one-box-container"}>
                    <Box className={"child-one-box"}>
                      <h6>Table 1</h6>
                      <br />
                      <Text as="span">4</Text>
                    </Box>
                    <Link to={""} className={"child-one-box"}>
                      <h6>Table 1</h6>
                      <br />
                      <Text as="span">4</Text>
                    </Link>
                    <Link to={""} className={"child-one-box"}>
                      <h6>Table 1</h6>
                      <br />
                      <Text as="span">4</Text>
                    </Link>
                    <Link to={""} className={"child-one-box"}>
                      <h6>Table 1</h6>
                      <br />
                      <Text as="span">4</Text>
                    </Link>
                  </Box>
                </Col>
                <Col md={3}>
                  {/* <Link
                        to={"/my-products"}
                        className={"child-two-box-container"}
                      >
                        <Box className={"child-two-box"}>
                          <h6>Table 1</h6>
                          <br />
                          <Text as="span">4</Text>
                        </Box>
                      </Link> */}
                </Col>
                <Col md={3}>
                  <Box className={"child-thr-box-container"}>
                    <Link to={""} className={"child-thr-box"}>
                      <h6>Table 1</h6>
                      <br />
                      <Text as="span">4</Text>
                    </Link>
                    <Link to={""} className={"child-thr-box"}>
                      <h6>Table 1</h6>
                      <br />
                      <Text as="span">4</Text>
                    </Link>
                  </Box>
                </Col>
                <Col md={3}>
                  <Box className={"child-one-box-container"}>
                    {/* <Link to={"/my-products"} className={"child-one-box"}>
                          <h6>Table 1</h6>
                          <br />
                          <Text as="span">4</Text>
                        </Link> */}
                    <Link to={""} className={"child-one-box child-four-box"}>
                      <h6>Table 1</h6>
                      <br />
                      <Text as="span">4</Text>
                    </Link>
                    <Link to={""} className={"child-one-box"}>
                      <h6>Table 1</h6>
                      <br />
                      <Text as="span">4</Text>
                    </Link>
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

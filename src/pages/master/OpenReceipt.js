import React from "react";
import { Row, Col, Table } from "react-bootstrap";
import { Box } from "../../components/elements";
import { Th, Thead, Tr } from "../../components/elements/Table";
import { Text } from "../../components/elements";
import { LabelField } from "../../components/fields";
import { dateFormatter } from "../../helpers/functions/date-format";
import { DATE_FORMAT1, TIME_FORMAT1 } from "../../constant/date-format";
export default function OpenReceipt({ kitchenOrders }) {

  return (
    <div>
      <Row>
        <Col md={12}>
          <Box className={"open-receipt-box"}>
            <LabelField
              option={[
                "Sale Type",
                "In-Store",
                "Delivery",
                "Takeaway",
                "dwe",
                "Hungerstation",
                "Marsool",
              ]}
              fieldSize=" mr-10 field-w-200 h-md "
            />
            <LabelField
              option={[
                "Staff",
                "TIS Software",
                "Cashier",
                "WAITER 2",
                "MOHAMMAD",
                "Ahad",
              ]}
              fieldSize=" field-w-200 h-md"
            />
          </Box>
        </Col>
        <Col md={12}>
          <Table>
            <Thead>
              {
                kitchenOrders?.map((item, index) => (
                  <Tr key={index} className={"verticle-align-m"}>
                    <Th>
                      <h5>{dateFormatter(item.createdAt, DATE_FORMAT1)}</h5>
                      <Text className={"f-13 bold"} as="span">
                        {dateFormatter(item.createdAt, TIME_FORMAT1)}
                      </Text>
                    </Th>
                    <Th>
                      <h4>{item.number}</h4>
                      {/* <Text className={"f-13 bold open-receipt-span"} as="span">
                        {"Ahmed"}
                      </Text> */}
                    </Th>
                    <Th>
                      <Text className={`f-13 bold open-receipt-span ${item.orderType === "In-Store" ? "bg-primary" : item.orderType === "Takeaway" ? "bg-green" : "bg-cusbg"}`} as="span">{item.orderType}</Text>
                    </Th>
                    <Th>
                      {" "}
                      <h2 className="text-end secound-color"> {item.total} ریال</h2>{" "}
                    </Th>
                  </Tr>
                ))
              }
              {/* <Tr className={"verticle-align-m"}>
                <Th>
                  <h4>Apri 3</h4>
                  <Text className={"f-13 bold"} as="span">
                    22:33
                  </Text>
                </Th>
                <Th>
                  <h4>#3424</h4>
                  <Text className={"f-13 bold open-receipt-span"} as="span">
                    Ahmed
                  </Text>
                </Th>
                <Th>
                  <Text className={"f-13 bold open-receipt-span"} as="span">
                    Takeaway
                  </Text>
                </Th>
                <Th>
                  {" "}
                  <h2 className="text-end secound-color"> 15 ریال</h2>{" "}
                </Th>
              </Tr>
              <Tr className={"verticle-align-m"}>
                <Th>
                  <h4>Apri 3</h4>
                  <Text className={"f-13 bold"} as="span">
                    22:33
                  </Text>
                </Th>
                <Th>
                  <h4>#3424</h4>
                  <Text className={"f-13 bold open-receipt-span"} as="span">
                    Ahmed
                  </Text>
                </Th>
                <Th>
                  <Text className={"f-13 bold open-receipt-span"} as="span">
                    Takeaway
                  </Text>
                </Th>
                <Th>
                  {" "}
                  <h2 className="text-end secound-color"> 15 ریال</h2>{" "}
                </Th>
              </Tr> */}
            </Thead>
          </Table>
        </Col>
      </Row>
    </div>
  );
}

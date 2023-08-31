import React from "react";
import { Row, Col, FormControl } from "react-bootstrap";
import { LabelField } from "../../components/fields";
import { Box } from "../../components/elements";
export default function AchieveReceipt() {
  return (
    <div>
      <Row>
        <Col md={12}>
          <Box className={"open-receipt-box"}>
            {/* <LabelField type={"date"} fieldSize=" mr-10 field-w-150 h-md " /> */}
            <LabelField
              type={"date"}
              fieldSize="mr-10 field-w-150 h-md"
              defaultValue={new Date().toISOString().slice(0, 10)}
            />

            <Col
              md={2}
              style={{
                marginRight: "10px",
              }}
            >
              <FormControl placeholder="ID" type="text" />
            </Col>
            <LabelField
              option={["Hall", "First Floor ", "Second Floor", "Hall 11"]}
              fieldSize=" mr-10 field-w-150 h-md "
            />
            <LabelField
              option={[
                "Table",
                "Table 1",
                "Table 2",
                "Table 3",
                "Table 4",
                "VIP",
                "Table 5",
              ]}
              fieldSize=" mr-10 field-w-150 h-md "
            />
          </Box>
        </Col>
      </Row>
    </div>
  );
}

import PageLayout from "../../layouts/PageLayout";
import { CardHeader, CardLayout } from "../../components/cards";
import {
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from "../../components/elements/Table";
import {
  Heading,
  Anchor,
  Icon,
  Box,
  Text,
  Input,
  Image,
  Button,
} from "../../components/elements";
import { LabelField } from "../../components/fields/";
import { Row, Col } from "react-bootstrap";

export default function SaleReports() {
  return (
    <PageLayout>
      <Box className="mc-card">
        <CardHeader title={"Sales Report"} />
        <Row
          xs={1}
          sm={2}
          xl={4}
          className="mb-4 justify-content-between text-center"
        >
          <Col>
            <LabelField
              type={"date"}
              label={"Start Date"}
              labelDir="label-col"
              fieldSize="w-100 h-md"
            />
          </Col>
          <Col>
            <LabelField
              type={"date"}
              label={"End Date"}
              labelDir="label-col"
              fieldSize="w-100 h-md"
            />
          </Col>
          <Col sm={4}>
            <Button className="btn btn-primary">Generate Report</Button>
          </Col>
        </Row>
        <Box className="mc-table-responsive">
          <Table className="mc-table">
            <Thead className="mc-table-head primary">
              <Tr>
                <Th>Start Date</Th>
                <Th>End Date</Th>
                <Th>Generated On</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody className="mc-table-body even">
              <Tr>
                <Td>12 May 2020</Td>
                <Td>20 May 2020</Td>
                <Td>30 May 2020</Td>
                <Td>
                  <Box className="mc-table-action">
                    <Anchor
                      title="View"
                      href="/user-profile"
                      className="material-icons view"
                    >
                      visibility
                    </Anchor>
                    <Anchor
                      title="Download"
                      href="#"
                      className="material-icons download"
                      download
                    >
                      download
                    </Anchor>
                    <Button title="Delete" className="material-icons delete">
                      delete
                    </Button>
                  </Box>
                </Td>
              </Tr>
              <Tr>
                <Td>12 May 2020</Td>
                <Td>20 May 2020</Td>
                <Td>30 May 2020</Td>
                <Td>
                  <Box className="mc-table-action">
                    <Anchor
                      title="View"
                      href="/user-profile"
                      className="material-icons view"
                    >
                      visibility
                    </Anchor>
                    <Anchor
                      title="Download"
                      href="#"
                      className="material-icons download"
                      download
                    >
                      download
                    </Anchor>
                    <Button title="Delete" className="material-icons delete">
                      delete
                    </Button>
                  </Box>
                </Td>
              </Tr>
              <Tr>
                <Td>12 May 2020</Td>
                <Td>20 May 2020</Td>
                <Td>30 May 2020</Td>
                <Td>
                  <Box className="mc-table-action">
                    <Anchor
                      title="View"
                      href="/user-profile"
                      className="material-icons view"
                    >
                      visibility
                    </Anchor>
                    <Anchor
                      title="Download"
                      href="#"
                      className="material-icons download"
                      download
                    >
                      download
                    </Anchor>
                    <Button title="Delete" className="material-icons delete">
                      delete
                    </Button>
                  </Box>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Box>
    </PageLayout>
  );
}

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  body: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    // fontFamily: "Oswald",
    fontWeight: "bold",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    width: "12.5%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol: {
    width: "12.5%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: "auto",
    margin: 5,
    fontSize: 12,
    fontWeight: 500,
  },
  tableCell: {
    margin: "auto",
    margin: 5,
    fontSize: 10,
  },
});

// Create Document Component
const PdfDocument = () => {
  const [receipts, setReceipts] = useState([]);

  const location = useLocation();
  useEffect(() => {
    setReceipts(location.state?.receipts);
    console.log(receipts);
  }, []);
  return (
    <PDFViewer width="1000" height="600">
      <Document>
        <Page style={styles.body}>
          <Text style={styles.title}>Sales Report</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>id</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Customer</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Order Type</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Order Amount</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Discount</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Payment Type</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Status</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Date</Text>
              </View>
            </View>

            {/* Dynamic rows */}
            {receipts.map((receipt, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {receipt.td_sale_order_id}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{receipt.customer}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{receipt.order_type}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {receipt
                      ? parseFloat(parseFloat(receipt.order_amount).toFixed(2))
                      : "N/A"}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{receipt.discount}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{receipt.payment_type}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{receipt.status}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {receipt
                      ? new Date(receipt.updated_at).toLocaleString()
                      : "N/A"}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PdfDocument;

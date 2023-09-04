import React, { useState, useEffect } from "react";
import { Box, Text } from "../../../components/elements";
import { CardLayout } from "../../../components/cards";
import axios from "axios";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/react";

function AllOrdersTab({ isOrderUpdating, CountDownSecResult }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const stationId = "md_station_id: 1";

  useEffect(() => {
    setIsLoading(true);

    fetchOrdersForStation();
  }, [stationId]);

  async function fetchOrdersForStation(stationId) {
    try {
      const response = await axios.post(
        "http://idlogix1.utis.pk:7001/api/show_kds",
        {
          stationId: stationId,
        }
      );

      setOrders(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  const hanldeOrderStatus = async (item) => {
    const itemIds =
      item.td_sale_order_item?.map(
        (orderItem) => orderItem.td_sale_order_item_id
      ) || [];

    try {
      const response = await axios.post(
        "http://idlogix1.utis.pk:7001/api/kds_status_update",
        {
          md_order_item_id: itemIds,
          md_order_item_status: "ready",
        }
      );

      if (response.status === 200) {
        // isOrderUpdating = false;
        fetchOrdersForStation(stationId);
        console.log("Order status updated successfully");
        // console.log(response)
        const updatedOrders = orders.filter(
          (order) => order.td_sale_order_id !== item.td_sale_order_id
        );

        setOrders(updatedOrders);
      } else {
        console.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="kitchen-order-main-wrapper ">
      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner">
            <RingLoader size={120} color={"#112143"} loading={isLoading} />
          </div>
        </div>
      ) : (
        orders
          ?.filter(
            (order, i) =>
              order.td_sale_order_item &&
              order.td_sale_order_item.some(
                (item) => item.order_item_status !== "ready"
              )
          )
          .map((item, index) => {
            return (
              <Box key={index} className={"kitchen-order-main mb-3"}>
                <h4
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontWeight: "lighter", fontSize: "0.9em" }}>
                    Order No - {item.td_sale_order_id}
                  </span>
                  <span style={{ fontWeight: "lighter", fontSize: "0.9em" }}>
                    {item.order_type === "Table" ? (
                      <span>
                        {item.order_person ? item.order_person : 1}{" "}
                        {/* Conditionally render item.order_person */}
                        <span>
                          x
                          <span
                            role="img"
                            aria-label="person emoji"
                            style={{ fontSize: "0.8em" }}
                          >
                            👤
                          </span>
                        </span>
                      </span>
                    ) : (
                      ""
                    )}
                  </span>
                </h4>

                <Text className={"pb-2"}>
                  {item.order_type === "Table" && `Table ${item.table_no}`}
                  {item.order_type !== "Table" && item.order_type}
                </Text>
                <CardLayout className={"p-0 rounded"}>
                  <Box
                    className={"kitchen-order-card-top rounded-top"}
                    style={{ justifyContent: "center" }}
                  >
                    <Text>
                      {item.orgination_station
                        ? item.orgination_station
                        : "KITCHEN"}
                    </Text>
                  </Box>
                  <Box className={"px-4 py-2 d-flex flex-column gap-2"}>
                    {item?.td_sale_order_item?.map((orderItem, index) => {
                      return (
                        <div
                          key={index}
                          className="d-flex justify-content-between align-items-center"
                        >
                          <Text style={{ fontWeight: "500" }}>
                            <span
                              style={{
                                fontWeight: "500",
                                fontSize: "1.2em",
                              }}
                            >
                              {orderItem.qty} x
                            </span>{" "}
                            {/* Check if md_product exists and has a product_name property */}
                            {orderItem?.md_product &&
                            orderItem.md_product.product_name ? (
                              <span>{orderItem.md_product.product_name}</span>
                            ) : (
                              <span>Product Name Not Available</span>
                            )}
                            <div style={{ color: "#999" }}>
                              {orderItem.comment
                                ? "(" + orderItem.comment + ")"
                                : ""}
                            </div>
                          </Text>
                        </div>
                      );
                    })}
                  </Box>

                  <Box className={"d-flex kitchen-order-ready-box px-3 py-4"}>
                    <Box
                      className="kitchen-order-ready-box-left bg-green clickable"
                      onClick={() => hanldeOrderStatus(item)}
                      disabled={isOrderUpdating}
                    >
                      Ready
                    </Box>

                    <Box
                      className={"kitchen-order-ready-box-right rounded-end"}
                    >
                      <CountDownSecResult countdownValue={item.createdAt} />{" "}
                    </Box>
                  </Box>
                </CardLayout>
              </Box>
            );
          })
      )}
    </div>
  );
}

export default AllOrdersTab;

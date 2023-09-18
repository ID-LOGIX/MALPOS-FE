import React, { useState, useEffect } from "react";
import { Box, Text } from "../../../components/elements";
import { CardLayout } from "../../../components/cards";
import axios from "axios";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/react";
import CountDownSecResult from "../../../helpers/KDS/CountDownSecResult";
import { HandleNotification } from "../../../components/elements/AlertKDS";
import { useRef } from "react";

function AllOrdersTab({ selectedValue, notificatinSettings, isOrderUpdating,change }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [stationId, setStationId] = useState("");
  const prevFilteredOrdersLength = useRef(0);
  const [stationName, setStationName] = useState("");
  const [statusChanged, setStatusChanged] = useState(false);

  // const stationId = "md_station_id: 1";
  useEffect(() => {
    if (selectedValue.length > 0) {
      setStationId(selectedValue[0].value);
      setStationName(selectedValue[0].label);
    }
  }, [selectedValue]);

  useEffect(() => {
    setIsLoading(true);
    fetchOrdersForStation();
  }, []);
  async function fetchOrdersForStation() {
    try {
      const response = await axios.post(
        "http://idlogix1.utis.pk:7001/api/show_kds",
        {
          // md_station_id: 1,
          stationId: stationId,
        }
      );
      // console.log(response.data);
      setOrders(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  const hanldeOrderStatus = async (item) => {
    setIsUpdating(true);

    setStatusChanged(true);
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
        // console.log("Order status updated successfully");
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
     } finally {
      setIsUpdating(false);
    }
  };

  const handleDelayStatus = async (item) => {
    const itemIds =
      item.td_sale_order_item?.map(
        (orderItem) => orderItem.td_sale_order_item_id
      ) || [];

    try {
      const response = await axios.post(
        "http://idlogix1.utis.pk:7001/api/kds_status_update",
        {
          md_order_item_id: itemIds,
          md_order_item_status: "delay",
        }
      );

      if (response.status === 200) {
        // console.log("Order status updated successfully");
      } else {
        console.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  let items = orders?.flatMap((order) =>
    order.td_sale_order_item.filter(
      (item) =>
        item.order_item_status !== "ready" &&
        item.md_product.stations?.some(
          (station) => station.md_station_id === stationId
        )
    )
  );
// console.log(items)
  const itemOrderIds = items.map((item) => item.td_sale_order_id);

  const filteredOrders = orders
    .filter((order) => itemOrderIds.includes(order.td_sale_order_id))
    .reverse();
  const cookingTime = items.map((item) => item.md_product.cooking_time);

  useEffect(() => {
    const fetchDataInterval = setInterval(() => {
      // setIsLoading(true);
      fetchOrdersForStation(selectedValue);
    }, 7000);

    return () => {
      clearInterval(fetchDataInterval);
    };
  }, []);

  let storedPrevFilteredOrdersLength = parseInt(
    localStorage.getItem("prevFilteredOrdersLength"),
    10
  );

  useEffect(() => {
    storedPrevFilteredOrdersLength = filteredOrders.length;
  }, [stationId]);

  useEffect(() => {
    setTimeout(() => {
      if (
        storedPrevFilteredOrdersLength &&
        filteredOrders.length > storedPrevFilteredOrdersLength
      ) {
        // console.log("Notification triggered");
        HandleNotification(stationName, notificatinSettings);
      }

      prevFilteredOrdersLength.current = filteredOrders.length;

      storedPrevFilteredOrdersLength = filteredOrders.length;

      localStorage.setItem(
        "prevFilteredOrdersLength",
        storedPrevFilteredOrdersLength.toString()
      );
    }, 2000);
  }, [filteredOrders]);

  return (
    <div className="kitchen-order-main-wrapper margin " >
      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner">
            <RingLoader size={120} color={"#112143"} loading={isLoading} />
          </div>
        </div>
      ) : (
        filteredOrders.map((item, index) => {
          return (
            <Box key={index} className={"kitchen-order-main mb-3 width"}>
              <h4
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "20px",
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
                First Floor/الطابق الأول{" "}
                {item.order_type === "Table"
                  ? `Table ${item.table_no}`
                  : item.order_type}{" "}
              </Text>

              <CardLayout className={"p-0 rounded"}>
                <Box
                  className={"kitchen-order-card-top rounded-top"}
                  // style={{ justifyContent: "center" }}
                  style={{
                    justifyContent: "center",
                    // backgroundColor:
                    // stationId === 1 ? "" : stationId === 2 ? "green" : "blue",
                  }}
                >
                  {item?.td_sale_order_item.map((product, i) =>
                    product.md_product.stations.map((station) =>
                      station.md_station_id === stationId ? (
                        <Text key={station.station_name}>
                          {station.station_name}
                        </Text>
                      ) : null
                    )
                  )}
                </Box>

                <Box className={"px-4 py-2 d-flex flex-column gap-2"}>
                  {item?.td_sale_order_item?.map((orderItem, index) => {
                    return (
                      <div
                        key={index}
                        className="d-flex justify-content-between align-items-center"
                      >
                        {orderItem?.md_product &&
                        items.some(
                          (item) =>
                            item.md_product.product_name ===
                            orderItem.md_product.product_name
                        ) ? (
                          <>
                            <Text style={{ fontWeight: "500" }}>
                              <span
                                style={{
                                  fontWeight: "500",
                                  fontSize: "1.2em",
                                }}
                              >
                                {orderItem.qty} x
                              </span>{" "}
                              <span>{orderItem.md_product.product_name}</span>
                              <div style={{ color: "#999" }}>
                                {orderItem.comment
                                  ? "(" + orderItem.comment + ")"
                                  : ""}
                              </div>
                            </Text>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
                </Box>

                <Box className={"d-flex kitchen-order-ready-box px-3 py-4"}>
                  {/* <Box
                    className="kitchen-order-ready-box-left bg-green clickable"
                    onClick={() => hanldeOrderStatus(item)}
                    disabled={isOrderUpdating}
                  >
                    Ready
                  </Box> */}
                  <Box
                    className={`kitchen-order-ready-box-left  clickable ${
                      isUpdating ? "pressed" : ""
                    }`} style={{backgroundColor: change ? "#2b3750":'#1a9f53'}}
                    onClick={() => hanldeOrderStatus(item)}
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <div className="loading-circle"></div>
                    ) : (
                      "Ready"
                    )}
                  </Box>

                  <Box className={"kitchen-order-ready-box-right rounded-end"}>
                    {item?.td_sale_order_item.map((orderItem) => (
                      <CountDownSecResult
                        key={orderItem.td_sale_order_item_id} 
                        countdownValue={orderItem}
                        onCountingUpStart={() => handleDelayStatus(item)}
                        cookingTime={cookingTime}
                      />
                    ))}
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

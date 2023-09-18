import React, { useEffect, useState } from "react";
import { Box, Text } from "../../../components/elements";
import { CardLayout } from "../../../components/cards";
import axios from "axios";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/react";
import moment from 'moment';

function DelayOrdersTab({
  
  isOrderUpdating,
  selectedValue
}) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [elapsedTime, setElapsedTime] = useState(0);

  // const stationId = "md_station_id: 1";
  // const stationId = 1;
  const [stationId, setStationId] = useState('')
  // const stationId = "md_station_id: 1";
  useEffect(() => {
    if (selectedValue.length > 0) {
      setStationId(selectedValue[0].value);
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
          // md_station_id:1,
          stationId: stationId,

          filter: "delay",
        }
      );

      setOrders(response.data);
      if (response.data.length > 0) {
        setIsLoading(false);
      }
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
        fetchOrdersForStation(stationId);
        // console.log("Order status updated successfully");
        const updatedOrders = orders.filter(
          (order) => order.td_sale_order_id !== item.td_sale_order_id
        );
        clearInterval(item.countUpTimer);
        setOrders(updatedOrders);
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
      item.order_item_status == "delay" &&
      item.md_product.stations.some(
        (station) => station.md_station_id === stationId
      )
  )
);
// console.log(items);
// Create an array of td_sale_order_id values from items
const itemOrderIds = items.map((item) => item.td_sale_order_id);

// Filter orders based on matching td_sale_order_id
const filteredOrders = orders.filter((order) =>
  itemOrderIds.includes(order.td_sale_order_id)
).reverse();
const cookingTimes = items.map((item) => item.md_product.cooking_time);
const createdAt = items.map((item) => item.created_at);

const [elapsedTime, setElapsedTime] = useState(0);

const formatTime = (elapsedSeconds) => {
  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
};

const startTimer = () => {
  return setInterval(() => {
    setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
  }, 1000);
};

useEffect(() => {
  // Calculate the maximum elapsed time among all items
  const now = Math.floor(Date.now() / 1000); // Convert to seconds
  let maxElapsedSeconds = 0;

  for (let i = 0; i < items.length; i++) {
    const createdAtInSeconds = Math.floor(new Date(createdAt[i]).getTime() / 1000); // Convert to seconds
    const elapsedSeconds = now - createdAtInSeconds - cookingTimes[i] * 60;
    if (elapsedSeconds > maxElapsedSeconds) {
      maxElapsedSeconds = elapsedSeconds;
    }
  }

  setElapsedTime(maxElapsedSeconds);

  // Start the timer
  const intervalId = startTimer();

  return () => {
    clearInterval(intervalId);
  };
}, [items, cookingTimes, createdAt]);
  return (
    <div className="kitchen-order-main-wrapper margin" >
      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner">
            <RingLoader size={120} color={"#112143"} loading={isLoading} />
          </div>
        </div>
      ) : (
        filteredOrders?.map((item, index) => {
          // if (item.status === "delay") {
          return (
            <Box key={index} className={"kitchen-order-main mb-3 width"} >
              <h4
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop:"20px"
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
                {item.order_type === "Table" && `Table ${item.table_no}`}
                {item.order_type !== "Table" && item.order_type}
              </Text>
              <CardLayout className={"p-0 rounded"}>
                <Box
                  className={"kitchen-order-card-top rounded-top"}
                  style={{ justifyContent: "center" }}
                >
                  <Text>
                    {item?.td_sale_order_item.map((product, i) =>
                      product.md_product.stations.map((station) =>
                        station.md_station_id === stationId ? (
                          <Text key={station.station_name}>
                            {station.station_name}
                          </Text>
                        ) : null
                      )
                    )}
                  </Text>
                </Box>
                <Box className={"px-4 py-2 d-flex flex-column gap-2"}>
                  {item?.td_sale_order_item
                    .filter(
                      (orderItem) =>
                        orderItem.order_item_status === "delay" &&
                        orderItem.md_product.stations.some(
                          (station) => station.md_station_id === stationId
                        )
                    )
                    .map((orderItem, index) => (
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
                            ''
                          )}
                          <div style={{ color: "#999" }}>
                            {orderItem.comment
                              ? "(" + orderItem.comment + ")"
                              : ""}
                          </div>
                        </Text>
                        {/* <span>&#10004;</span> */}
                      </div>
                    ))}
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
                    style={{ color: "red" }}
                  >
                   
                      <Text>
                        {formatTime(elapsedTime)}
                      </Text>
                     
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

export default DelayOrdersTab;

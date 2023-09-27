import React, { useState, useEffect } from "react";
import { Box, Text } from "../../../components/elements";
import { CardLayout } from "../../../components/cards";
import axios from "axios";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/react";
import CountDownSecResult from "../../../helpers/KDS/CountDownSecResult";
import { HandleNotification } from "../../../components/elements/AlertKDS";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faStore,
  faBicycle,
  faBox,
} from "@fortawesome/free-solid-svg-icons";
function AllOrdersTab({
  selectedValue,
  notificatinSettings,
  isOrderUpdating,
  change,
  backgroundClass,
}) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [stationId, setStationId] = useState("");
  const prevFilteredOrdersLength = useRef(0);
  const [stationName, setStationName] = useState("");
  const [statusChanged, setStatusChanged] = useState(false);
  const [displayOrders, setDisplayOrders] = useState([]);

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
  // console.log(stationId);
  const hanldeOrderStatus = async (item) => {
    setIsUpdating(true);

    setStatusChanged(true);
    const itemIds = [item];

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
        fetchOrdersForStation();
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
    const itemIds = [item.td_sale_order_item_id];

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
  // console.log(filteredOrders);
  useEffect(() => {
    const fetchDataInterval = setInterval(() => {
      // setIsLoading(true);
      fetchOrdersForStation(selectedValue);
    }, 7000);

    return () => {
      clearInterval(fetchDataInterval);
    };
  }, []);

  const activeOrders = orders?.filter((order) =>
    order.td_sale_order_item?.some(
      (item) =>
        item.order_item_status !== "ready" &&
        item.md_product.stations?.some((station) => station.md_station_id)
    )
  );

  // console.log(displayOrders)
  useEffect(() => {
    setDisplayOrders(stationId ? filteredOrders : activeOrders.reverse());
  }, [stationId, orders]);

  let storedPrevFilteredOrdersLength = 0;

  useEffect(() => {
    storedPrevFilteredOrdersLength = filteredOrders.length;

    localStorage.setItem(
      "prevFilteredOrdersLength",
      storedPrevFilteredOrdersLength.toString()
    );
  }, [stationId]);

  useEffect(() => {
    storedPrevFilteredOrdersLength = parseInt(
      localStorage.getItem("prevFilteredOrdersLength"),
      10
    );
    setTimeout(() => {
      if (
        storedPrevFilteredOrdersLength &&
        displayOrders.length > storedPrevFilteredOrdersLength
      ) {
        // console.log("Notification triggered");
        HandleNotification(stationName, notificatinSettings);
      }

      prevFilteredOrdersLength.current = displayOrders.length;

      storedPrevFilteredOrdersLength = displayOrders.length;

      localStorage.setItem(
        "prevFilteredOrdersLength",
        storedPrevFilteredOrdersLength.toString()
      );
    });
  }, [displayOrders]);

  const cookTime = items.map((item) => item.md_product.cooking_time);
  const cookingTime = cookTime[0];
  return (
    <div className="kitchen-order-main-wrapper margin horiz">
      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner">
            <RingLoader size={120} color={"#112143"} loading={isLoading} />
          </div>
        </div>
      ) : (
        displayOrders?.map((item, index) => {
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
                <span
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>
                    First Floor/الطابق الأول{" "}
                    {item.order_type === "Table"
                      ? `Table ${item.table_no}`
                      : item.order_type}{" "}
                  </span>
                  <span>
                    {item.order_type === "Delivery" ? (
                      <span>
                        <FontAwesomeIcon icon={faBicycle} size={"1x"} />
                      </span>
                    ) : item.order_type === "Takeaway" ? (
                      <span>
                        <FontAwesomeIcon icon={faBox} size={"1x"} />
                      </span>
                    ) : (
                      <span>
                        <FontAwesomeIcon icon={faStore} size={"1x"} />
                      </span>
                    )}
                  </span>
                </span>
              </Text>
              {stationId && (
                <CardLayout className={"p-0 rounded"}>
                  <Box
                    className={`kitchen-order-card-top rounded-top ${backgroundClass}`}
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

                  <Box
                    className={`px-4 py-2 d-flex flex-column gap-2 ${
                      change ? "lit" : ""
                    }`}
                  >
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

                  <Box
                    className={"d-flex kitchen-order-ready-box px-3 py-4"}
                    style={{ backgroundColor: change ? "#f8f8f8" : "" }}
                  >
                    {item.td_sale_order_item
                      .filter(
                        (item) =>
                          item.order_item_status !== "ready" &&
                          item.md_product.stations?.some(
                            (station) => station.md_station_id === stationId
                          )
                      )
                      .map((filteredItem) => {
                        return (
                          <Box
                            className={`kitchen-order-ready-box-left  clickable ${
                              isUpdating ? "pressed" : ""
                            }`}
                            style={{
                              backgroundColor: "#1a9f53",
                            }}
                            onClick={() =>
                              hanldeOrderStatus(
                                filteredItem.td_sale_order_item_id
                              )
                            }
                            disabled={isUpdating}
                            key={filteredItem.td_sale_order_item_id}
                          >
                            {isUpdating ? (
                              <div className="loading-circle"></div>
                            ) : (
                              "Ready"
                            )}
                          </Box>
                        );
                      })}
                    <Box
                      className={`kitchen-order-ready-box-right rounded-end ${
                        item.td_sale_order_item.some(
                          (filteredItem) =>
                            filteredItem.order_item_status ===
                              "delay" &&
                            filteredItem.md_product.stations.some(
                              (station) =>
                                station.md_station_id ===
                                stationId
                            )
                        )
                          ? "delayed-background"
                          : "bag-color"
                      }`}
                    >
                      {item.td_sale_order_item
                        .filter(
                          (filteredItem) =>
                            filteredItem.order_item_status !== "ready" &&
                            filteredItem.md_product.stations?.some(
                              (station) => station.md_station_id === stationId
                            )
                        )
                        .map((filteredItem) => (
                          <CountDownSecResult
                            key={filteredItem.td_sale_order_item_id}
                            countdownValue={item.time}
                            onCountingUpStart={() =>
                              handleDelayStatus(filteredItem)
                            }
                            cookingTime={cookingTime}
                          />
                        ))}
                    </Box>
                  </Box>
                </CardLayout>
              )}
              {!stationId && (
                <div>
                  {item?.td_sale_order_item
                    .filter(
                      (product) =>
                        product.order_item_status !== "ready" &&
                        product.md_product.stations.some(
                          (station) => station.md_station_id
                        )
                    )
                    .map((product, i) => {
                      // Filter stations with md_station_id and group them by md_station_id
                      const stationsWithId = product.md_product.stations.filter(
                        (station) => station.md_station_id
                      );

                      // Create a Map to group items by md_station_id
                      const groupedItems = new Map();

                      stationsWithId.forEach((station) => {
                        const stationId = station.md_station_id;

                        // Initialize or get the array for this md_station_id
                        const itemsForStation =
                          groupedItems.get(stationId) || [];
                        itemsForStation.push(station);
                        groupedItems.set(stationId, itemsForStation);
                          
                      });

                      return (
                        <div key={i}>
                          {Array.from(groupedItems).map(
                            ([stationId, stations], j) => (
                              <CardLayout
                                key={j}
                                className={"p-0 rounded"}
                                style={{ marginBottom: "20px" }}
                              >
                                
                                {stations.map((station) => (
                                  
                                  <Box
                                    key={station.md_station_id}
                                    
                                    className={`kitchen-order-card-top rounded-top ${backgroundClass}`}

                                  >
                                    <Text>{station.station_name}</Text>
                                  </Box>
                                ))}
                              
                                <Box
                                  className={`px-4 py-2 d-flex flex-column gap-2 ${
                                    change ? "lit" : ""
                                  }`}
                                >
                                  {item?.td_sale_order_item
                                    .filter((orderItem) =>
                                      orderItem.md_product.stations.some(
                                        (station) =>
                                          station.md_station_id === stationId
                                      )
                                    )
                                    .map((orderItem, index) => (
                                      <div
                                        key={index}
                                        className="d-flex justify-content-between align-items-center"
                                      >
                                        {orderItem?.md_product &&
                                        orderItem.md_product.product_name ? (
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
                                              <span>
                                                {
                                                  orderItem.md_product
                                                    .product_name
                                                }
                                              </span>
                                              <div style={{ color: "#999" }}>
                                                {orderItem.comment
                                                  ? "(" +
                                                    orderItem.comment +
                                                    ")"
                                                  : ""}
                                              </div>
                                            </Text>
                                          </>
                                        ) : null}
                                      </div>
                                    ))}
                                </Box>

                                <Box
                                  className={
                                    "d-flex kitchen-order-ready-box px-3 py-4"
                                  }
                                  style={{
                                    backgroundColor: change ? "#f8f8f8" : "",
                                  }}
                                >
                                  {item.td_sale_order_item
                                    .filter(
                                      (orderItem) =>
                                        orderItem.order_item_status !==
                                          "ready" &&
                                        orderItem.md_product.stations.some(
                                          (station) =>
                                            station.md_station_id === stationId
                                        )
                                    )
                                    .map((filteredItem, j) => (
                                      <Box
                                        key={filteredItem.td_sale_order_item_id}
                                        className={`kitchen-order-ready-box-left  clickable ${
                                          isUpdating ? "pressed" : ""
                                        }`}
                                        style={{
                                          backgroundColor: "#1a9f53",
                                        }}
                                        onClick={() =>
                                          hanldeOrderStatus(
                                            filteredItem.td_sale_order_item_id
                                          )
                                        }
                                        disabled={isUpdating}
                                      >
                                        {isUpdating ? (
                                          <div className="loading-circle"></div>
                                        ) : (
                                          "Ready"
                                        )}
                                      </Box>
                                    ))}
                                  {/* <Box
                                    className={
                                      "kitchen-order-ready-box-right rounded-end"
                                    }
                                  >
                                    {item.td_sale_order_item
                                      .filter(
                                        (filteredItem) =>
                                          filteredItem.order_item_status !==
                                            "ready" &&
                                          filteredItem.md_product.stations.some(
                                            (station) =>
                                              station.md_station_id ===
                                              stationId
                                          )
                                      )
                                      .map((filteredItem) => {
                                        const time =
                                          filteredItem.md_product.cooking_time;

                                        return (
                                          <CountDownSecResult
                                            key={
                                              filteredItem.td_sale_order_item_id
                                            }
                                            countdownValue={item.time}
                                            onCountingUpStart={() =>
                                              handleDelayStatus(filteredItem)
                                            }
                                            cookingTime={time}
                                          />
                                        );
                                      })}
                                  </Box> */}
                                  <Box
                                    className={`kitchen-order-ready-box-right rounded-end ${
                                      item.td_sale_order_item.some(
                                        (filteredItem) =>
                                          filteredItem.order_item_status ===
                                            "delay" &&
                                          filteredItem.md_product.stations.some(
                                            (station) =>
                                              station.md_station_id ===
                                              stationId
                                          )
                                      )
                                        ? "delayed-background"
                                        : "bag-color"
                                    }`}
                                  >
                                    {item.td_sale_order_item
                                      .filter(
                                        (filteredItem) =>
                                          filteredItem.order_item_status !==
                                            "ready" &&
                                          filteredItem.md_product.stations.some(
                                            (station) =>
                                              station.md_station_id ===
                                              stationId
                                          )
                                      )
                                      .map((filteredItem) => {
                                        const time =
                                          filteredItem.md_product.cooking_time;

                                        return (
                                          <CountDownSecResult
                                            key={
                                              filteredItem.td_sale_order_item_id
                                            }
                                            countdownValue={item.time}
                                            onCountingUpStart={() =>
                                              handleDelayStatus(filteredItem)
                                            }
                                            cookingTime={time}
                                          />
                                        );
                                      })}
                                  </Box>
                                </Box>
                              </CardLayout>
                            )
                          )}
                        </div>
                      );
                    })}
                </div>
              )}
            </Box>
          );
        })
      )}
    </div>
  );
}

export default AllOrdersTab;

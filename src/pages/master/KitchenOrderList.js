import React, { useEffect } from "react";
import PageLayout from "../../layouts/PageLayout";
import { useState } from "react";
import { Col, Row, Button as RButton } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import CusTabButtons from "../../components/elements/CusTabButtons";
import { Box, Text } from "../../components/elements";
import { useSelector } from "react-redux";
import {
  useOrdersByRestaurantIdQuery,
  useUpdateOrderBookMutation,
} from "../../api/authAPI/authApi";
import CountDown from "../../components/CountDown";
import { useMemo } from "react";
import Countdown from "react-countdown";
import moment from "moment";
import { HandleNotification } from "../../components/elements/Alert";

const KitchenOrderList = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { user } = useSelector((state) => state["auth"]);

  const { data: kitchenOrders, isSuccess } = useOrdersByRestaurantIdQuery(
    user?.userRestaurantMap[0]?.restaurant?.id,
    { pollingInterval: 7000 }
  );
  const [updateOrder, { isLoading: isOrderUpdating }] =
    useUpdateOrderBookMutation();

  useEffect(() => {
    if (
      isSuccess &&
      kitchenOrders !== undefined &&
      kitchenOrders?.find((x) => x?.isRead === false)?.isRead === false
    ) {
      HandleNotification("New Order");
      updateOrder({
        orderId: kitchenOrders?.find((x) => x.isRead === false)?.id,
        payload: { isRead: true },
      }).then((response) => {
        console.log("response", response);
      });
    }
  }, [kitchenOrders, isSuccess, updateOrder]);

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };
  const hanldeOrderStatus = async (orderId) => {
    await updateOrder({ orderId: orderId, payload: { status: "Ready" } }).then(
      (response) => {
        console.log("response", response);
      }
    );
  };

  const buttonList = [
    { text: "All Orders", index: 0, id: "" },
    { text: "Preparing", index: 1, id: "1" },
    { text: "Ready", index: 2, id: "2" },
    { text: "Delay", index: 3, id: "3" },
  ];
  const CountDownTimer = (data) => {
    // Render a countdown
    return (
      <text>
        {data?.formatted?.minutes}:{data?.formatted?.seconds}
      </text>
    );
  };
  const CountDownSecResult = ({ countdownValue }) => {
    const countDownSec = useMemo(
      () => (
        <Countdown
          date={moment(countdownValue).valueOf() + 20 * 60000}
          renderer={CountDownTimer}
        />
      ),
      [countdownValue]
    );

    return <>{countDownSec}</>;
  };
  return (
    <PageLayout>
      <Row>
        <Col md={12}>
          <CardLayout className={"f-13 cusTabsbuttons"}>
            {buttonList.map((buttonText) => (
              <CusTabButtons
                key={buttonText.index}
                buttonText={buttonText}
                activeIndex={activeIndex}
                handleItemClick={handleItemClick}
              />
            ))}
          </CardLayout>
        </Col>
        {activeIndex === 0 && (
          <div className="kitchen-order-main-wrapper">
            {kitchenOrders?.map((item, index) => {
              console.log("itemstatus", item.createdAt);
              return (
                <Box key={index} className={"kitchen-order-main mb-3"}>
                  <h4>Order No - {item.number}</h4>
                  <Text className={"pb-2"}>Maplos/First Floor 4523</Text>
                  <CardLayout className={"p-0 rounded"}>
                    <Box className={"kitchen-order-card-top rounded-top"}>
                      <Text>KITCHEN</Text>
                      {item.status !== "Ready" && (
                        <RButton
                          onClick={() => hanldeOrderStatus(item.id)}
                          className={
                            "text-white shadow bg-green px-2 py-1 rounded"
                          }
                          disabled={isOrderUpdating}
                        >
                          Ready
                        </RButton>
                      )}
                    </Box>
                    <Box className={"px-4 py-2 d-flex flex-column gap-2"}>
                      {item?.orderItem?.map((item, index) => (
                        <Text key={index}>
                          {item.quantity} x {item.foodItem.name}
                        </Text>
                      ))}
                    </Box>
                    <Box className={"d-flex kitchen-order-ready-box px-3 py-4"}>
                      <Box
                        className={`kitchen-order-ready-box-left ${
                          item.status === "Ready"
                            ? "bg-green"
                            : item.status === "Delay"
                            ? "bg-red"
                            : "bg-cusbg"
                        } rounded-start`}
                      >
                        {item.status}
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
            })}
          </div>
        )}
        {activeIndex === 1 && (
          <div className="kitchen-order-main-wrapper">
            <div className="kitchen-order-main-wrapper">
              {kitchenOrders?.map((item, index) => {
                if (item.status === "Preparing") {
                  return (
                    <Box key={index} className={"kitchen-order-main mb-3"}>
                      <h4>Order No - {item.number}</h4>
                      <Text className={"pb-2"}>Maplos/First Floor 4523</Text>
                      <CardLayout className={"p-0 rounded"}>
                        <Box className={"kitchen-order-card-top rounded-top"}>
                          <Text>KITCHEN</Text>
                          {item.status !== "Ready" && (
                            <RButton
                              onClick={() => hanldeOrderStatus(item.id)}
                              className={
                                "text-white shadow bg-green px-2 py-1 rounded"
                              }
                              disabled={isOrderUpdating}
                            >
                              Ready
                            </RButton>
                          )}
                        </Box>
                        <Box className={"px-4 py-2 d-flex flex-column gap-2"}>
                          {item?.orderItem?.map((item, index) => (
                            <Text key={index}>
                              {item.quantity} x {item.foodItem.name}
                            </Text>
                          ))}
                        </Box>
                        <Box
                          className={"d-flex kitchen-order-ready-box px-3 py-4"}
                        >
                          <Box
                            className={
                              "kitchen-order-ready-box-left bg-cusbg rounded-start"
                            }
                            onClick={() => hanldeOrderStatus(item.id)}
                          >
                            {item.status}
                          </Box>
                          <Box
                            className={
                              "kitchen-order-ready-box-right rounded-end"
                            }
                          >
                            <CountDownSecResult
                              countdownValue={item.createdAt}
                            />
                          </Box>
                        </Box>
                      </CardLayout>
                    </Box>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}
        {activeIndex === 2 && (
          <div className="kitchen-order-main-wrapper">
            {kitchenOrders?.map((item, index) => {
              if (item.status === "Ready") {
                return (
                  <Box key={index} className={"kitchen-order-main mb-3"}>
                    <h4>Order No - {item.number}</h4>
                    <Text className={"pb-2"}>Maplos/First Floor 4523</Text>
                    <CardLayout className={"p-0 rounded"}>
                      <Box className={"kitchen-order-card-top rounded-top"}>
                        <Text>KITCHEN</Text>
                        {item.status !== "Ready" && (
                          <RButton
                            onClick={() => hanldeOrderStatus(item.id)}
                            className={
                              "text-white shadow bg-green px-2 py-1 rounded"
                            }
                            disabled={isOrderUpdating}
                          >
                            Ready
                          </RButton>
                        )}
                      </Box>
                      <Box className={"px-4 py-2 d-flex flex-column gap-2"}>
                        {item?.orderItem?.map((item, index) => (
                          <Text key={index}>
                            {item.quantity} x {item.foodItem.name}
                          </Text>
                        ))}
                      </Box>
                      <Box
                        className={"d-flex kitchen-order-ready-box px-3 py-4"}
                      >
                        <Box
                          className={
                            "kitchen-order-ready-box-left bg-green rounded-start"
                          }
                          onClick={() => hanldeOrderStatus(item.id)}
                        >
                          {item.status}
                        </Box>
                        <Box
                          className={
                            "kitchen-order-ready-box-right rounded-end"
                          }
                        >
                          <CountDownSecResult countdownValue={item.createdAt} />
                        </Box>
                      </Box>
                    </CardLayout>
                  </Box>
                );
              }
              return null;
            })}
          </div>
        )}
        {activeIndex === 3 && (
          <div className="kitchen-order-main-wrapper">
            {kitchenOrders?.map((item, index) => {
              if (item.status === "Delay") {
                return (
                  <Box key={index} className={"kitchen-order-main mb-3"}>
                    <h4>Order No - {item.number}</h4>
                    <Text className={"pb-2"}>Maplos/First Floor 4523</Text>
                    <CardLayout className={"p-0 rounded"}>
                      <Box className={"kitchen-order-card-top rounded-top"}>
                        <Text>KITCHEN</Text>
                        {item.status !== "Ready" && (
                          <RButton
                            onClick={() => hanldeOrderStatus(item.id)}
                            className={
                              "text-white shadow bg-green px-2 py-1 rounded"
                            }
                            disabled={isOrderUpdating}
                          >
                            Ready
                          </RButton>
                        )}
                      </Box>
                      <Box className={"px-4 py-2 d-flex flex-column gap-2"}>
                        {item?.orderItem?.map((item, index) => (
                          <Text key={index}>
                            {item.quantity} x {item.foodItem.name}
                          </Text>
                        ))}
                      </Box>
                      <Box
                        className={"d-flex kitchen-order-ready-box px-3 py-4"}
                      >
                        <Box
                          className={
                            "kitchen-order-ready-box-left bg-red rounded-start"
                          }
                        >
                          {item.status}
                        </Box>
                        <Box
                          className={
                            "kitchen-order-ready-box-right rounded-end"
                          }
                        >
                          <CountDownSecResult countdownValue={item.createdAt} />
                        </Box>
                      </Box>
                    </CardLayout>
                  </Box>
                );
              }
              return null;
            })}
          </div>
        )}
      </Row>
    </PageLayout>
  );
};

export default KitchenOrderList;

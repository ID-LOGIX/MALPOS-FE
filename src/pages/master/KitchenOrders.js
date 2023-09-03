import React, { useEffect } from "react";
import PageLayoutKds from "../../layouts/PageLayoutKds";
import { useState } from "react";
import { Col, Row, Button as RButton } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import CusTabButtons from "../../components/elements/CusTabButtons";
import { Box, Text } from "../../components/elements";
import { useSelector } from "react-redux";

import CountDown from "../../components/CountDown";
import { useMemo } from "react";
import Countdown from "react-countdown";
import moment from "moment";
import { HandleNotification } from "../../components/elements/Alert";
import axios from "axios";
import PreparingTab from "./KitchenTabs/PreparingTab";
import AllOrdersTab from "./KitchenTabs/AllOrdersTab";
import DelayOrdersTab from "./KitchenTabs/DelayOrdersTab";
import ReadyOrdersTab from "./KitchenTabs/ReadyOrdersTab";
const KitchenOrderList = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { user } = useSelector((state) => state["auth"]);

  const tabs = [AllOrdersTab, PreparingTab, ReadyOrdersTab, DelayOrdersTab];

  const handleItemClick = (index) => {
    setActiveIndex(index);
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
  const props = {
    CountDownSecResult,
  };
  return (
    <PageLayoutKds>
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

          <div>
            {tabs.map(
              (TabComponent, index) =>
                activeIndex === index && <TabComponent key={index} {...props} />
            )}
          </div>
        </Col>
      </Row>
    </PageLayoutKds>
  );
};

export default KitchenOrderList;

import React, { useEffect,useContext } from "react";
import PageLayoutKds from "../../layouts/PageLayoutKds";
import { useState } from "react";
import { Col, Row, Button as RButton } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import CusTabButtons from "../../components/elements/CusTabButtons";
import { Box, Button  } from "../../components/elements";
import { useSelector } from "react-redux";
import { ThemeContext } from "../../context/Themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
import { Logo } from "../../components";
import data from "../../data/master/header.json";
import { faWifi, faSliders } from "@fortawesome/free-solid-svg-icons";

const KitchenOrderList = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { user } = useSelector((state) => state["auth"]);

  const tabs = [AllOrdersTab, PreparingTab, ReadyOrdersTab, DelayOrdersTab];
  const [wifiConnected, setWifiConnected] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [change, setChange] = useState(false)
  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  const buttonList = [
    { text: "All Orders", index: 0, id: "" },
    { text: "Preparing", index: 1, id: "1" },
    { text: "Ready", index: 2, id: "2" },
    { text: "Delay", index: 3, id: "3" },
  ];
  useEffect(() => {
    // Update the current time every minute
    const intervalId = setInterval(() => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setCurrentTime(formattedTime);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <PageLayoutKds>
      
        
        <Col md={12} className={"f-13 cusTabsbuttons"} >
        
      <Box className="mc-header-group height" style={{  backgroundColor: change ? "" : "#f08143" }} >

          <Box className="mc-header-left">
          <Box className={"logo-div"}>
            <Logo
              src={data?.logo.src}
              alt={data?.logo.alt}
              // name={data?.logo.name}
              href={data?.logo.pathKDS}
            />
          </Box>
        
        <Box className="mc-header-left" style={{marginLeft:"30px"}}>
            {buttonList.map((buttonText) => (
              <CusTabButtons
                key={buttonText.index}
                buttonText={buttonText}
                activeIndex={activeIndex}
                handleItemClick={handleItemClick}
              />
            ))}
            </Box>
            </Box>
            <Box className="mc-header-right">
          <Button
            icon={theme}
            title={data.theme.title}
            onClick={() => {
              toggleTheme();
              setChange((prevState) => !prevState);

            }}
            className={`mc-header-icon ${data.theme.addClass}`}
            
          />

          <Button
            // onClick={openModal}
            className={" cus-mt-5 "}
          >
            <FontAwesomeIcon
              icon={faSliders}
              size="lg"
              style={{ color: "#5e5d72" }}
            />
          </Button>
          {/* <CusModel
            showModal={showModal}
            closeModal={closeModal}
            modalTitle={
              <>
                <span className="bold f-20">Control Pannel</span> TIS Software
                12.3.45.0
              </>
            }
            modalBody={
              <>
                <ControlPanel data={row1} />
                <hr />
                <ControlPanel data={row2} />
                <hr />
                <ControlPanel data={row3} />
              </>
            }
            headerClassName="multiSelect-devices-model-header"
            bodyClassName="multiSelect-devices-model"
            footerClassName="multiSelect-devices-model-footer"
          /> */}

          <Button
            onClick={() => {
              setWifiConnected(!wifiConnected);
            }}
            className={"bars cus-mt-5 "}
          >
            <FontAwesomeIcon
              icon={faWifi}
              size="lg"
              style={{ color: wifiConnected ? "green" : "#5e5d72" }}
            />
          </Button>

          <span className="bars cus-mt-5  mr-10">{currentTime}</span>
        </Box>
        </Box>
         
          </Col>
          <Col md={12} style={{ width: "100%", backgroundColor: change ? "" : "#f8f8f8" }}>
            {tabs.map(
              (TabComponent, index) =>
                activeIndex === index && <TabComponent key={index}  />
            )}
        </Col>
      
    </PageLayoutKds>
  );
};

export default KitchenOrderList;

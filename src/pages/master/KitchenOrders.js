import React, { useEffect, useContext } from "react";
import PageLayoutKds from "../../layouts/PageLayoutKds";
import { useState } from "react";
import { Col, Row, Button as RButton } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import { Box, Button } from "../../components/elements";
import { useSelector } from "react-redux";
import { ThemeContext } from "../../context/Themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CountDown from "../../components/CountDown";
import { useMemo } from "react";
import Countdown from "react-countdown";
import moment from "moment";
import { HandleNotification } from "../../components/elements/Alert";
import PreparingTab from "./KitchenTabs/PreparingTab";
import AllOrdersTab from "./KitchenTabs/AllOrdersTab";
import DelayOrdersTab from "./KitchenTabs/DelayOrdersTab";
import ReadyOrdersTab from "./KitchenTabs/ReadyOrdersTab";
import { Logo } from "../../components";
import data from "../../data/master/header.json";
import { faWifi, faSliders } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import cpButtonsData from "../../data/ControlPannelButtonData";
import ControlPanel from "../../pages/master/ControlPanel";
import CusModel from "../../components/popupsModel/CusModel";
import Multiselect from "multiselect-react-dropdown";
import CusTabButtonsKds from "../../components/elements/CusTabButtonsKds";
import { notificatinSettings } from "../../helpers/KDS/Notification";
import { buttonList, options } from "../../helpers/KDS/Others";
const KitchenOrderList = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { user } = useSelector((state) => state["auth"]);
  const row1 = cpButtonsData[0];
  const row2 = cpButtonsData[1];
  const row3 = cpButtonsData[2];
  const tabs = [AllOrdersTab, PreparingTab, ReadyOrdersTab, DelayOrdersTab];
  const [wifiConnected, setWifiConnected] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [change, setChange] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState([{ label: "All Stations", value: '' }]);
  const [stationId, setStationId] = useState("");

  useEffect(() => {
    if (selectedValue.length > 0) {
      setStationId(selectedValue[0].value);
    }
  }, [selectedValue]);
  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    setChange(theme === "dark_mode");
  }, [theme]);

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

  const handleSelectChange = (selected) => {
    setSelectedValue(selected);
    closeModal();
  };

  const backgroundClass =
    stationId === 1
      ? "customBackground bbq"
      : stationId === 2
      ? "customBackground live"
      : "customBackground coldbar";
  const props = {
    selectedValue,
    notificatinSettings,
    backgroundClass,
    change,
  };
  return (
    <PageLayoutKds>
      <Col md={12} className={"f-13 cusTabsbuttons"}>
        <Box
          className="mc-header-group height"
          style={{ backgroundColor: change ? "#1516165c" : "#f08143d4" }}
        >
          <Box className="mc-header-left">
            <Box className={"logo-div"}>
              <Logo
                src={data?.logo.src}
                alt={data?.logo.alt}
                // name={data?.logo.name}
                href={data?.logo.pathKDS}
              />
            </Box>

            <Box className="mc-header-left" style={{ marginLeft: "30px" }}>
              {buttonList.map((buttonText) => (
                <CusTabButtonsKds
                  key={buttonText.index}
                  buttonText={buttonText}
                  activeIndex={activeIndex}
                  handleItemClick={handleItemClick}
                  change={change}
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

            <Button onClick={openModal} className={" cus-mt-5 "}>
              <FontAwesomeIcon
                icon={faSliders}
                size="lg"
                style={{ color: "#5e5d72" }}
              />
            </Button>
            <CusModel
              showModal={showModal}
              closeModal={closeModal}
              modalTitle={
                <>
                  <span className="bold f-20">Control Pannel</span>
                </>
              }
              modalBody={
                <>
                  <Multiselect
                    options={options}
                    selectedValues={selectedValue}
                    onSelect={handleSelectChange}
                    singleSelect
                    displayValue="label"
                    placeholder="Select The Station"
                  />
                  {/* <ControlPanel data={row1} />
                <hr /> */}
                  {/* <ControlPanel data={row2} />
                <hr />
                <ControlPanel data={row3} /> */}
                </>
              }
              headerClassName="multiSelect-devices-model-header"
              bodyClassName="multiSelect-devices-model"
              footerClassName="multiSelect-devices-model-footer"
            />

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
      <Col
        md={12}
        style={{ width: "100%", backgroundColor: change ? "" : "#f8f8f8" }}
      >
        {tabs.map(
          (TabComponent, index) =>
            activeIndex === index && <TabComponent key={index} {...props} />
        )}
      </Col>
    </PageLayoutKds>
  );
};

export default KitchenOrderList;

import React, { useContext, useState, useRef, useEffect } from "react";
import {
  LanguageDropdown,
  WidgetDropdown,
  ProfileDropdown,
} from "../components/header";
import { Modal, Row, Col } from "react-bootstrap";
import { Button, Section, Box, Input, List } from "../components/elements";
import { DrawerContext } from "../context/Drawer";
import { ThemeContext } from "../context/Themes";
import { Logo } from "../components";
import data from "../data/master/header.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

import { faWifi, faSliders } from "@fortawesome/free-solid-svg-icons";
import { Text } from "../components/elements";
import OrdersLine from "../pages/master/OrdersLine";
import CusModel from "../components/popupsModel/CusModel";
import cpButtonsData from "../data/ControlPannelButtonData";
import ControlPanel from "../pages/master/ControlPanel";

import { useSelector } from "react-redux";
export default function HeaderKds() {
  const row1 = cpButtonsData[0];
  const row2 = cpButtonsData[1];
  const row3 = cpButtonsData[2];
  const { drawer, toggleDrawer } = useContext(DrawerContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const searchRef = useRef();
  const [scroll, setScroll] = useState("fixed");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state["auth"]);
  const [wifiConnected, setWifiConnected] = useState(true);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  const [currentTime, setCurrentTime] = useState("");

 
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
    <Section as="header" className={`mc-header ${scroll}`}>
      <Box className="mc-header-group">
        <Box className="mc-header-left">
          <Box className={"logo-div"}>
            <Logo
              src={data?.logo.src}
              alt={data?.logo.alt}
              // name={data?.logo.name}
              href={data?.logo.path}
            />
          </Box>
        </Box>
        <Box className="mc-header-right">
          <Button
            icon={theme}
            title={data.theme.title}
            onClick={toggleTheme}
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
          <CusModel
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
    </Section>
  );
}

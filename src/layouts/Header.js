import React, { useContext, useState, useRef } from "react";
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

import {
  faBars,
  faBell,
  faBicycle,
  faBox,
  faLock,
  faLockOpen,
  faPlus,
  faReceipt,
  faStore,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import { Text } from "../components/elements";
import OrdersLine from "../pages/master/OrdersLine";
import CusModel from "../components/popupsModel/CusModel";
import cpButtonsData from "../data/ControlPannelButtonData";
import ControlPanel from "../pages/master/ControlPanel";
import { useAppDispatch } from "../app/customStoreHooks";
import { clearAuth } from "../features/auth/authSlice";
import {
  useAllOrdersByRestaurantIdQuery,
  useOrdersByRestaurantIdQuery,
} from "../api/authAPI/authApi";
import { useSelector } from "react-redux";
export default function Header() {
  const row1 = cpButtonsData[0];
  const row2 = cpButtonsData[1];
  const row3 = cpButtonsData[2];
  const { drawer, toggleDrawer } = useContext(DrawerContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const searchRef = useRef();
  const [scroll, setScroll] = useState("fixed");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state["auth"]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data: allOrders } = useAllOrdersByRestaurantIdQuery(
    user?.userRestaurantMap[0]?.restaurant?.id,
    {
      pollingInterval: 20000,
    }
  );

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 0) setScroll("sticky");
    else setScroll("fixed");
  });

  document.addEventListener("mousedown", (event) => {
    if (!searchRef.current?.contains(event.target)) {
      setSearch("");
    }
  });

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate("/login", { replace: true });
  };

  return (
    <Section as="header" className={`mc-header ${scroll}`}>
      {/* <Logo
        src={data?.logo.src}
        alt={data?.logo.alt}
        // name={data?.logo.name}
        href={data?.logo.path}
      /> */}
      <Box className="mc-header-group">
        <Box className="mc-header-left">
          <Box className={"logo-div"}>
            <Logo
              src={data?.logo.src}
              alt={data?.logo.alt}
              // name={data?.logo.name}
              href={data?.logo.path}
            />
            {/* <Text
              className={`bold floor-bg mr-10 ${
                activeIndex === 0 ? "active" : ""
              }`}
              as="span"
              onClick={() => handleItemClick(0)}
            >
              First Floor Al-Babesi
            </Text> */}

            {/* <Text
              className={`bold floor-bg mr-10 ${
                activeIndex === 1 ? "active" : ""
              }`}
              as="span"
              onClick={() => handleItemClick(1)}
              id="1"
            >
              2nd Floor
            </Text> */}
          </Box>
          {/* <Button
            icon={data?.search.icon}
            className="mc-header-icon search"
            onClick={() => setSearch("show")}
          />
          <Button 
                        icon={ drawer ? "menu_open" : "menu" } 
                        className="mc-header-icon toggle" 
                        onClick={ toggleDrawer } 
                    />
          <Box className={`mc-header-search-group ${search}`}>
            <form className="mc-header-search" ref={searchRef}>
              <Button className="material-icons">{data?.search.icon}</Button>
              <Input type="search" placeholder={data?.search.placeholder} />
            </form>
          </Box> */}
        </Box>
        <Box className="mc-header-right">
          {/* <Button
            icon={theme}
            title={data.theme.title}
            onClick={toggleTheme}
            className={`mc-header-icon ${data.theme.addClass}`}
          /> */}

          <Box className={"header-right-or "}>
            <Button onClick={handleShow} className={"header-add-btn"}>
              <FontAwesomeIcon icon={faPlus} /> New Order
            </Button>
            <Modal className="new-order-model" show={show} onHide={handleClose}>
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                <Row className="text-center">
                  <Col md={4} className="mt-0">
                    <Link
                      to="/my-products"
                      onClick={handleClose}
                      state={{ service: "In-Store" }}
                    >
                      <FontAwesomeIcon icon={faStore} size={"1x"} />
                      <br />
                      <Text
                        className={"new-order-model-text f-13 bold"}
                        as="span"
                      >
                        In-Store
                      </Text>
                    </Link>
                  </Col>
                  <Col md={4} className="mt-0">
                    <Link
                      to="/my-products"
                      onClick={handleClose}
                      state={{ service: "Delivery" }}
                    >
                      <FontAwesomeIcon icon={faBicycle} size={"1x"} />
                      <br />

                      <Text
                        className={"new-order-model-text f-13 bold"}
                        as="span"
                      >
                        Delivery
                      </Text>
                    </Link>
                  </Col>
                  <Col md={4} className="mt-0">
                    <Link
                      to="/my-products"
                      onClick={handleClose}
                      state={{ service: "Takeaway" }}
                    >
                      <FontAwesomeIcon icon={faBox} size={"1x"} />
                      <br />

                      <Text className="new-order-model-text f-13 bold">
                        Takeaway
                      </Text>
                    </Link>
                  </Col>
                  <Col md={12}>
                    <Box className={"f-13 bold border-top ptb-10"}>
                      <Link
                        to="/my-products"
                        onClick={handleClose}
                        state={{ service: "dwe" }}
                      >
                        <button className={"bold"}>dwe</button>
                      </Link>
                    </Box>
                    <Box className={"f-13 bold border-top ptb-10"}>
                      <Link
                        to="/my-products"
                        onClick={handleClose}
                        state={{ service: "Hungerstation" }}
                      >
                        <button className={"bold"}>Hungerstation</button>
                      </Link>
                    </Box>
                    <Box className={"f-13 bold border-top ptb-10"}>
                      <Link
                        to="/my-products"
                        onClick={handleClose}
                        state={{ service: "Marsool" }}
                      >
                        <button className={"bold"}>Marsool</button>
                      </Link>
                    </Box>
                  </Col>
                </Row>
              </Modal.Body>
            </Modal>

            <Link to={"/order-receipt"}>
              {" "}
              <button className={" cus-mt-5 cus-btn-outline-fontIcon"}>
                <FontAwesomeIcon icon={faReceipt} color="#f29b30" /> Receipt{" "}
                <Text className={"r-count"} as={"span"}>
                  {allOrders?.length}
                </Text>
              </button>
            </Link>
            <button
              onClick={openModal}
              className={" cus-mt-5 cus-btn-outline-fontIcon"}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
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
              onClick={handleLogout}
              className={" cus-mt-5 cus-btn-outline-fontIcon mr-10 "}
            >
              <FontAwesomeIcon icon={faLock} color="#f29b30" /> TIS Software
            </Button>
            <button className={"bars cus-mt-5 mr-10"}>
              <FontAwesomeIcon icon={faBell} color="#f29b30" />
            </button>
            <button className={"bars cus-mt-5  mr-10"}>
              <FontAwesomeIcon icon={faWifi} color="#f29b30" />
            </button>

            {/* <Box className={'bars mr-10'}>
            <LanguageDropdown
            icon={data.language.icon}
            title={data.language.title}
            addClass={data.language.addClass}
            dropdown={data.language.dropdown}
          />
            </Box> */}
          </Box>
          {/* <WidgetDropdown
            icon={data.cart.icon}
            title={data.cart.title}
            badge={data.cart.badge}
            addClass={data.cart.addClass}
            dropdown={data.cart.dropdown}
          /> */}
          {/* <WidgetDropdown
            icon={data.message.icon}
            title={data.message.title}
            badge={data.message.badge}
            addClass={data.message.addClass}
            dropdown={data.message.dropdown}
          /> */}
          {/* <WidgetDropdown
            icon={data.notify.icon}
            title={data.notify.title}
            badge={data.notify.badge}
            addClass={data.notify.addClass}
            dropdown={data.notify.dropdown}
          /> */}
          {/* <ProfileDropdown
            name={data.profile.name}
            image={data.profile.image}
            username={data.profile.username}
            dropdown={data.profile.dropdown}
          /> */}
        </Box>
      </Box>
    </Section>
  );
}

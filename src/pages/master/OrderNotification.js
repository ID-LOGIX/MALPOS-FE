import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import CusTabButtons from "../../components/elements/CusTabButtons";
import LayoutWithoutSidebar from "../../layouts/LayoutWithoutSidebar";
import { MenuItem, MultipleMenu } from "../../components/sidebar/";
import { Menu } from "../../components/elements";
import { List } from "../../components/elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "../../components/elements";
import {
  faBarcode,
  faHome,
  faPhoneVolume,
  faPersonBiking,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import OldHomeN from "./OldHomeN";
import OldPhoneN from "./OldPhoneN";
import EmptyDivMh from "../supports/EmptyDivMh";
export default function OrderNotification() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [checkDataNoti, setCheckDataNoti] = useState(0);
  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  const buttonList = [
    { text: "New Notifications", index: 0, id: "" },
    { text: "Old Notifications ", index: 1, id: "1" },
  ];
  const notificationIcons = [
    { icon: faHome },
    { icon: faBarcode },
    { icon: faPhoneVolume },
    { icon: faPersonBiking },
    { icon: faWifi },
  ];
  const checkData = (id) => {
    setCheckDataNoti(id);
  };
  return (
    <div>
      <LayoutWithoutSidebar>
        <Row>
          <Col md={12}>
            <Row>
              <Col md={1} className="d-flex-c ">
                <CardLayout>
                  {/* <Menu>
                                        {notificationIcons.map((item, index) => (
                                            <Box className='cus-border-t'>
                                            <List key={index} className={'cus-mt-5 cus-ptb-5 '}>
                                                <FontAwesomeIcon icon={item.icon} />
                                            </List>
                                            </Box>
                                        ))}
                                    </Menu> */}

                  <Menu>
                    <List className={"cus-mt-5 cus-ptb-5 cusur-p"}>
                      <Box onClick={() => checkData(0)}>
                        <FontAwesomeIcon icon={faHome} />
                      </Box>
                    </List>
                    <List className={"cus-mt-5 cus-ptb-5 cusur-p"}>
                      <Box onClick={() => checkData(1)}>
                        <FontAwesomeIcon icon={faBarcode} />
                      </Box>
                    </List>
                    <List className={"cus-mt-5 cus-ptb-5 cusur-p"}>
                      <Box onClick={() => checkData(2)}>
                        <FontAwesomeIcon icon={faPhoneVolume} />
                      </Box>
                    </List>
                    <List className={"cus-mt-5 cus-ptb-5 cusur-p"}>
                      <Box onClick={() => checkData(3)}>
                        <FontAwesomeIcon icon={faPersonBiking} />
                      </Box>
                    </List>
                    <List className={"cus-mt-5 cus-ptb-5 cusur-p"}>
                      <Box onClick={() => checkData(4)}>
                        <FontAwesomeIcon icon={faWifi} />
                      </Box>
                    </List>
                  </Menu>
                </CardLayout>
              </Col>
              <Col md={11}>
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
                  <Col md={12}>
                    <CardLayout>
                      {activeIndex === 0 && (
                        <>
                          {checkDataNoti === 0 && <EmptyDivMh />}
                          {checkDataNoti === 1 && <EmptyDivMh />}
                          {checkDataNoti === 2 && <EmptyDivMh />}
                          {checkDataNoti === 3 && <EmptyDivMh />}
                          {checkDataNoti === 4 && <EmptyDivMh />}
                        </>
                      )}
                      {activeIndex === 1 && (
                        <>
                          {checkDataNoti === 0 && <OldHomeN />}
                          {checkDataNoti === 1 && <OldHomeN />}
                          {checkDataNoti === 2 && <OldPhoneN />}
                          {checkDataNoti === 3 && <EmptyDivMh />}
                          {checkDataNoti === 4 && <EmptyDivMh />}
                        </>
                      )}
                    </CardLayout>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </LayoutWithoutSidebar>
    </div>
  );
}

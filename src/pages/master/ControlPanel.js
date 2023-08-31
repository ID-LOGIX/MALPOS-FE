import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faDollarSign,
  faUser,
  faTentArrowTurnLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Box, Button } from "../../components/elements";
import { Text } from "../../components/elements";
import {
  Model1,
  CustomerReceiptModel,
  Model3,
  OrderAddTransactionModel,
  ClearCashe,
  Terminals,
  Support,
  OpenCashRegister,
} from "../../components/popupsModel/Models";
export default function ControlPanel(props) {
  const [activeModel, setActiveModel] = useState(null);

  const navigate = useNavigate();
  const handleButtonClick = (model) => {
    // setActiveModel(model);
    switch (model) {
      case "model1":
        navigate("/sale-reports");
        break;
      case "model2":
        navigate("/path-for-model2");
        break;
      case "model3":
        navigate("/sale-reports");
        break;
      // and so on for the rest of the models
      default:
        navigate("/default-path");
    }
  };

  const closeModal = () => {
    setActiveModel(null);
  };
  return (
    <div>
      <Box className={"control-p-m d-flex-wrap"}>
        {props.data.map((item, i) => (
          <Box
            onClick={() => handleButtonClick(item.model)}
            key={i}
            className={"model-cp-buttons cusur-p"}
          >
            <Box className={" icon-box flex-1 text-center "}>
              <FontAwesomeIcon icon={item.icon} />{" "}
            </Box>
            <Box className={"text-box flex-3 "}>
              <Text className={"cp-btn-title"} as={"span"}>
                {item.text}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
      {/* render active model based on state */}
      {/* {activeModel === "model1" && (
        <Model1 showModal={true} closeModal={closeModal} />
      )}
      {activeModel === "model2" && (
        <CustomerReceiptModel showModal={true} closeModal={closeModal} />
      )}
      {activeModel === "model3" && (
        <Model3 showModal={true} closeModal={closeModal} />
      )}
      {activeModel === "model4" && (
        <OrderAddTransactionModel showModal={true} closeModal={closeModal} />
      )}
      {activeModel === "ClearCashe" && (
        <ClearCashe showModal={true} closeModal={closeModal} />
      )}
      {activeModel === "Terminal" && (
        <Terminals showModal={true} closeModal={closeModal} />
      )}
      {activeModel === "Refresh" && window.location.reload()}
      {activeModel === "Support" && (
        <Support showModal={true} closeModal={closeModal} />
      )}
      {activeModel === "OpenCashRegister" && (
        <OpenCashRegister showModal={true} closeModal={closeModal} />
      )} */}
    </div>
  );
}

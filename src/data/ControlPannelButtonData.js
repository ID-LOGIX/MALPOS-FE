import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faDollarSign,
  faUser,
  faTentArrowTurnLeft,
  faBoxArchive,
  faDesktop,
  faDatabase,
  faRotateRight,
  faMobileAndroid,
  faQuestion,
  faVolumeHigh,
  faClock,
  faExpand,
  faCashRegister,
} from "@fortawesome/free-solid-svg-icons";
const cpButtonsData = [
  [
    {
      icon: faTentArrowTurnLeft,
      text: "Return",
      model: "model1",
    },
    {
      icon: faUser,
      text: "Customers",
      model: "model2",
    },
    {
      icon: faFile,
      text: "Make Report",
      model: "model3",
    },
    {
      icon: faDollarSign,
      text: "Add Transaction",
      model: "model4",
    },
  ],

  [
    {
      icon: faBoxArchive,
      text: "Receipt archive",
    },
    {
      icon: faDesktop,
      text: "Devices",
    },
  ],
  [
    {
      icon: faDatabase,
      text: "Clear cashe",
      model: "ClearCashe",
    },
    {
      icon: faRotateRight,
      text: "Refresh",
      model: "Refresh",
    },
    {
      icon: faMobileAndroid,
      text: "Terminals",
      model: "Terminal",
    },
    {
      icon: faVolumeHigh,
      text: "Sound",
    },
    {
      icon: faClock,
      text: "Clock",
    },
    {
      icon: faExpand,
      text: "Full Screen",
    },
    {
      icon: faCashRegister,
      text: "Cash Register",
      model: "OpenCashRegister",
    },
    {
      icon: faQuestion,
      text: "Support",
      model: "Support",
    },
  ],
];
export default cpButtonsData;

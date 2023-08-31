import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { persistStore } from "redux-persist";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ToastContainer />
      <App />
    </PersistGate>
  </Provider>
);

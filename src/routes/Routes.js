import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import OrdersLine from "../pages/master/OrdersLine";
import ProductsView from "../pages/master/ProductsView";
import OrderReceipt from "../pages/master/OrderReceipt";
import ProductDetails from "../pages/master/ProductDetails";
import OrderNotification from "../pages/master/OrderNotification";
import KitchenOrderList from "../pages/master/KitchenOrderList";
import KitchenOrders from "../pages/master/KitchenOrders";

import LoginPage from "../pages/LoginPage/LoginPage";
import { Error } from "../pages/supports";
import BrandNameForm from "../pages/BrandNameForm/BrandNameForm";
import PasswordPage from "../pages/PasswordPage/PasswordPage";
import PinPadPage from "../pages/PinPadPage/PinPadPage";
import SignupPage from "../pages/SignupPage/SignupPage";
import ProductsUnderCategory from "../components/ProductsUnderCategory";
import Checkout from "../pages/Checkout/Checkout";
import SaleReports from "../pages/SaleReports/SaleReports";
// import BlankPage from "../pages/master/BlankPage";
import CRM from "../pages/master/CRM";
import RightSidebar from "../layouts/RightSideBar";
import PdfDocument from "../components/PdfDocument";
import ThermalInvoice from "../pages/ThermalInvoice/ThermalInvoice";
import ByItem from "../components/BillSplitting/ByItem/ByItem";
import BySeat from "../components/BillSplitting/BySeat/BySeat";
import ByAmount from "../components/BillSplitting/ByAmount/ByAmount";
import ByPercentage from "../components/BillSplitting/ByPercentage/ByPercentage";
import ByEvenly from "../components/BillSplitting/ByEvenly/ByEvenly";
import Sidebar from "../components/SideBar";
import OrderLineTable1 from "../pages/master/OrderLineTable1";

const AllRoutes = () => {
  const token = Cookies.get("userData");
  return (
    <BrowserRouter>
      {/* <RightSidebar /> */}
      <Routes>
        {/* <Route path="/login" element={<LoginPage />} /> */}
        <Route
          path="/login"
          element={token ? <Navigate to="/pin-pad" /> : <LoginPage />}
        />
        <Route path="sign-up" element={<SignupPage />} />
        <Route path="/pin-pad" element={<PinPadPage />} />
        <Route path="brand-name" element={<BrandNameForm />} />
        <Route path="/password" element={<PasswordPage />} />
        <Route
          path="/"
          element={token ? <Navigate to="/pin-pad" /> : <LoginPage />}
        />

        <Route path="*" element={<Error />} />
        <Route path="/orders-line" element={<OrdersLine />} />
        {/* <Route path="/kitchen-order-list" element={<KitchenOrderList />} /> */}
        <Route path="/kitchen-order-list" element={<KitchenOrders />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/order-receipt" element={<OrderReceipt />} />
        <Route path="/order-notification" element={<OrderNotification />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/my-products" element={<ProductsView />}>
          <Route path=":categoryId" element={<ProductsUnderCategory />} />
        </Route>
        {/* <Route path="/blank-page" element={<BlankPage />} /> */}
        <Route path="/sale-reports" element={<SaleReports />} />
        <Route path="/report" element={<PdfDocument />} />
        <Route path="/crm" element={<CRM />} />
        <Route path="/print-screen" element={<ThermalInvoice />} />

        {/* BillSplitting routes */}
        <Route path="/by-item" element={<ByItem />} />
        <Route path="/by-seat" element={<BySeat />} />
        <Route path="by-amount" element={<ByAmount />} />
        <Route path="by-percentage" element={<ByPercentage />} />
        <Route path="by-evenly" element={<ByEvenly />} />
        <Route path="/sidebar" element={<Sidebar />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;

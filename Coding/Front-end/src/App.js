import { Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./Home/Home";
import LandingPageLayout from "./layout/LandingPageLayout";
import Login from "./login/Login";
import SignUp from "./signup/SignUp";
import Information from "./signup/Information";
import ResetPassword from "./forgot_password/ResetPassword";
import OtpScreen from "./forgot_password/OtpScreen";
import ConfirmPassword from "./forgot_password/ConfirmPassword";
import Collections from "./Home/Collections";
import About from "./Home/About";
import Blogs from "./Home/Blogs";
import "bootstrap/dist/css/bootstrap.min.css";
import UserManagerLayout from "./layout/UserManagerLayout";
import ClientManager from "./clientManager/ClientManager";
// import DashboardManger from "./dashboard/DashboardManger";
import OrderManager from "./ordersManager/OrderManager";
import BlogManager from "./blogManager/BlogManager";
import EmployeeManager from "./employeeManager/EmployeeManager";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPageLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/info" element={<Information />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/otp" element={<OtpScreen />} />
        <Route path="/new_password" element={<ConfirmPassword />} />
        <Route path="/collections_page" element={<Collections />} />
        <Route path="/blogs_page" element={<Blogs />} />
        <Route path="/about_page" element={<About />} />
      </Route>
      <Route path="/userManager" element={<UserManagerLayout />}>
        {/* <Route path="/userManager/dashboard" element={<DashboardManger />} /> */}
        <Route path="/userManager/client_manager" element={<ClientManager />} />
        <Route path="/userManager/orders_manager" element={<OrderManager />} />
        <Route path="/userManager/blogs_manager" element={<BlogManager />} />
        <Route
          path="/userManager/employees_manager"
          element={<EmployeeManager />}
        />
      </Route>
    </Routes>
  );
}

export default App;

import Home from "../pages/Home";
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Mentors from "../pages/Mentors/Mentors";
import MentorDetails from "../pages/Mentors/MentorDetails";
import GroupSession from "../pages/GroupSession/GSessions.jsx";
import GroupSessionDetails from "../pages/GroupSession/GSessionDetails.jsx";
import Notfound from "../pages/NotFound";
import MyAccount from "../Dashboard/user-account/MYAccount.jsx";
import Dashboard from "../Dashboard/mentor-account/Dashboard.jsx";
import CheckoutSuccess from "../pages/CheckoutSuccess";
import GSessions from "../pages/GroupSession/GSessions";

import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/mentors" element={<Mentors />} />
      <Route path="/mentors/:id" element={<MentorDetails />} />
      <Route path="/Group_Session" element={<GroupSession />} />
      <Route path="/Group_Session/:id" element={<GroupSessionDetails />} />
      <Route path="/group-sessions" element={<GSessions />} />
      <Route
        path="/users/profile/me"
        element={
          <ProtectedRoute allowedRoles={["mentee"]}>
            <MyAccount />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mentors/profile/me"
        element={
          <ProtectedRoute allowedRoles={["mentor"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/checkout-success" element={<CheckoutSuccess />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};

export default Routers;

import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function LandingPageLayout() {
  return (
    <div className="d-flex flex-column ">
      <Header role="guest" />

      <div className="flex-grow-1">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

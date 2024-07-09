import React from "react";
import HeaderManager from "./HeaderManager";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function UserManagerLayout() {
  return (
    <div style={{ height: "100vh", padding: 0, margin: 0 }} className="row">
      <div
        style={{
          backgroundColor: "rgb(75, 75, 75)",
          padding: 0,
          paddingTop: "2%",
        }}
        className="col-2 h-full d-flex flex-column  aligin-items-center "
      >
        <NavBar />
      </div>
      <div
        style={{ padding: 0, maxHeight: "100vh", overflowY: "auto" }}
        className="col-10 d-flex flex-column h-100 flex-grow-1"
      >
        <HeaderManager />
        <Outlet />
      </div>
    </div>
  );
}

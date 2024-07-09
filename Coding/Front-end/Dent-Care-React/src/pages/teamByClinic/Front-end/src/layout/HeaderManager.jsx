import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

export default function HeaderManager() {
  return (
    <div
      className="d-flex justify-content-between align-items-center px-5 py-2  "
      style={{ height: "10%", backgroundColor: "rgb(75, 75, 75)" }}
    >
      <div  className="position-relative ">
        <FiSearch
          size={20}
          className="position-absolute top-50 translate-middle"
          style={{ left: "10%" }}
        />
        <input
          className="w-100 py-1"
          style={{
            borderRadius: 10,
            backgroundColor: "rgba(255, 251, 251, 1)",
          }}
          type="text"
        />
      </div>
      <div className="d-flex flex-row  align-items-center gap-2">
        <IoMdNotificationsOutline size={30} color="white" />
        <div
          style={{
            width: "2.5rem",
            backgroundColor: "gray",
            height: "2.5rem",
            borderRadius: "50%",
          }}
        ></div>
      </div>
    </div>
  );
}

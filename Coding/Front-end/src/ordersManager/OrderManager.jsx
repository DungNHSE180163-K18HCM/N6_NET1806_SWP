import React from "react";
import { Space, Table, Tag } from "antd";
import { IoIosArrowDown } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
export default function OrderManager() {
  const columns = [
    {
      title: <span style={{ fontSize: 20, fontWeight: 400 }}>OrderID</span>,
      dataIndex: "orderId",
      key: "orderId",

      render: (text) => <span>{text}</span>,
    },
    {
      title: <span style={{ fontSize: 20, fontWeight: 400 }}>CustomerID</span>,
      dataIndex: "customerID",
      key: "customerID",
      style: { fontSize: "18px" },
    },
    {
      title: <span style={{ fontSize: 20, fontWeight: 400 }}>Date</span>,
      dataIndex: "date",
      key: "date",
    },
    {
      title: <span style={{ fontSize: 20, fontWeight: 400 }}>Total</span>,
      key: "total",
      dataIndex: "total",
    },
    {
      title: <span style={{ fontSize: 20, fontWeight: 400 }}>Status</span>,
      key: "status",
      dataIndex: "status",
      render: (_, record) => (
        <Space size="middle">
          {record.status === "paid" ? (
            <Tag color="green">Paid</Tag>
          ) : (
            <Tag color="red">Unpaid</Tag>
          )}
        </Space>
      ),
    },
    {
      title: <span style={{ fontSize: 20, fontWeight: 400 }}>Detail</span>,
      key: "detail",
      dataIndex: "detail",
    },
  ];

  const data = [
    {
      orderId: "ID_0001",
      customerID: "CL_0009",
      date: "11/6/1994",
      total: "$1200",
      status: "paid",
      detail:
        "                                                                 ",
    },
    {
      orderId: "ID_0001",
      customerID: "CL_0009",
      date: "11/6/1994",
      total: "$1200",
      status: "unpaid",
      detail:
        "                                                                 ",
    },
    {
      orderId: "ID_0001",
      customerID: "CL_0009",
      date: "11/6/1994",
      total: "$1200",
      status: "paid",
      detail:
        "                                                                 ",
    },
    {
      orderId: "ID_0001",
      customerID: "CL_0009",
      date: "11/6/1994",
      total: "$1200",
      status: "unpaid",
      detail:
        "                                                                 ",
    },   {
        orderId: "ID_0001",
        customerID: "CL_0009",
        date: "11/6/1994",
        total: "$1200",
        status: "paid",
        detail:
          "                                                                 ",
      },
      {
        orderId: "ID_0001",
        customerID: "CL_0009",
        date: "11/6/1994",
        total: "$1200",
        status: "unpaid",
        detail:
          "                                                                 ",
      },
  ];

  return (
    <div style={{ padding: "3%" }} >
      <p style={{ margin: 0, fontSize: 24 }} className="fw-bolder">
        Welcome, K!
      </p>
      <p style={{ fontSize: 16 }}>Project Tracking</p>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

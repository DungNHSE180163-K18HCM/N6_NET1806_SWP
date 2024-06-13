import React from "react";
import { Space, Table, Tag } from "antd";
import { IoIosArrowDown } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
export default function BlogManager() {
  const columns = [
    {
      title: <span style={{ fontSize: 20, fontWeight: 400 }}>Id</span>,
      dataIndex: "id",
      key: "id",

      render: (text) => <span>{text}</span>,
    },
    {
      title: <span style={{ fontSize: 20, fontWeight: 400 }}>Title</span>,
      dataIndex: "title",
      key: "title",
    },
    {
      title: <span style={{ fontSize: 20, fontWeight: 400 }}>Tag</span>,
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: <span style={{ fontSize: 20, fontWeight: 400 }}>Category</span>,
      key: "category",
      dataIndex: "category",
    },
    {
      title: <span style={{ fontSize: 20, fontWeight: 400 }}>Stauts</span>,
      key: "status",
      dataIndex: "status",
      render: (_, record) => (
        <Space size="middle">
          {record.status === "hot" ? (
            <Tag color="green">Hot</Tag>
          ) : (
            <Tag color="red">Display</Tag>
          )}
        </Space>
      ),
    },
    {
      title: <span style={{ fontSize: 20, fontWeight: 400 }}>Action</span>,
      key: "action",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <p style={{ margin: 0 }}>Delete</p>
          <span style={{ margin: "0 8px" }}>|</span>
          <p style={{ margin: 0 }}>Delete</p>
        </div>
      ),
    },
  ];

  const data = [
    {
      id: "BL_0001",
      title:
        "Customer enagagement ring trends: elevatong personal expressions of love",
      phone: "01234556",
      gmail: "New York No. 1 Lake Park",
      status: "display",
    },
    {
      id: "BL_0002",
      title: "How do clean your jewelry at home",
      tag: "#cleaning gemstones #cleaning glod jewelry #cleaning planitium jewlry #cleaning silver jewelry #custom jewelry",
      category: "Customer jewelry ",
      status: "hot",
    },
    {
      id: "BL_0003",
      title:
        "Customer enagagement ring trends: elevatong personal expressions of love",
      phone: "01234556",
      gmail: "Sydney No. 1 Lake Park",
      status: "display",
    },
    {
      id: "BL_0004",
      title:
        "Customer enagagement ring trends: elevatong personal expressions of love",
      phone: "01234556",
      gmail: "New York No. 1 Lake Park",
      status: "display",
    },
    {
      id: "BL_0005",
      title: "Jim Green",
      phone: "01234556",
      gmail: "London No. 1 Lake Park",
      status: "hot",
    },
    {
      id: "BL_0006",
      title: "Joe Black",
      phone: "01234556",
      gmail: "Sydney No. 1 Lake Park",
      status: "display",
    },
    {
      id: "BL_0007",
      title:
        "Customer enagagement ring trends: elevatong personal expressions of love",
      phone: "01234556",
      gmail: "New York No. 1 Lake Park",
      status: "display",
    },
    {
      id: "BL_0008",
      title: "Jim Green",
      phone: "01234556",
      gmail: "London No. 1 Lake Park",
      status: "hot",
    },
    {
      id: "BL_0009",
      title: "Joe Black",
      phone: "01234556",
      gmail: "Sydney No. 1 Lake Park",
      status: "display",
    },
  ];

  return (
    <div style={{ padding: "3%" }} BLassName="">
      <p style={{ margin: 0, fontSize: 24 }} className="fw-bolder">
        Welcome, K!
      </p>
      <p style={{ fontSize: 16 }}>Blogs</p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: "2%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "5px 20px",
              backgroundColor: "rgba(101, 101, 101, 1)",
              gap: 10,
              borderRadius: 5,
            }}
          >
          
            <FiPlus color="rgba(224, 215, 234, 1)" />
            <p style={{ margin: 0, fontSize: 20, color: "white" }}>New Blog</p>
          </div>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

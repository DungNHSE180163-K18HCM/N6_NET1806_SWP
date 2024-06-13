import React, { useState } from "react";
import { Space, Table, Tag } from "antd";
import { IoIosArrowDown } from "react-icons/io";
import { FiPlus } from "react-icons/fi";

export default function EmployeeManager() {
  const [filterStatus, setFilterStatus] = useState(null);

  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    console.log(selectedValue);
    setFilterStatus(selectedValue);
  };
  const columns = [
    {
      title: <span style={{ fontSize: 20, fontWeight: 400 }}>Id</span>,
      dataIndex: "id",
      key: "id",

      render: (text) => <span>{text}</span>,
    },
    {
      title: <span style={{ fontSize: 20, fontWeight: 400 }}>Name</span>,
      dataIndex: "name",
      key: "name",
      style: { fontSize: "18px" },
    },
    {
      title: <span style={{ fontSize: 20, fontWeight: 400 }}>Gmail</span>,
      dataIndex: "gmail",
      key: "gmail",
    },
    {
      title: <span style={{ fontSize: 20, fontWeight: 400 }}>Phone</span>,
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: <span style={{ fontSize: 20, fontWeight: 400 }}>Status</span>,
      key: "status",
      dataIndex: "status",
      render: (_, record) => (
        <Space size="middle">
          {record.status === "active" ? (
            <Tag color="green">Active</Tag>
          ) : (
            <Tag color="red">Inactive</Tag>
          )}
        </Space>
      ),
    },
    {
      title: <span style={{ fontSize: 20, fontWeight: 400 }}>Permissions</span>,
      key: "permissions",
      dataIndex: "permissions",
    },
  ];

  const data = [
    {
      id: "CL_0001",
      name: "John Brown",
      phone: "01234556",
      gmail: "New York No. 1 Lake Park",
      status: "active",
      permissions: "Manager",
    },
    {
      id: "CL_0002",
      name: "Jim Green",
      phone: "01234556",
      gmail: "London No. 1 Lake Park",
      status: "inactive",
      permissions: "Manager",
    },
    {
      id: "CL_0003",
      name: "Joe Black",
      phone: "01234556",
      gmail: "Sydney No. 1 Lake Park",
      status: "active",
      permissions: "Manager",
    },
    {
      id: "CL_0004",
      name: "John Brown",
      phone: "01234556",
      gmail: "New York No. 1 Lake Park",
      status: "active",
      permissions: "Manager",
    },
    {
      id: "CL_0005",
      name: "Jim Green",
      phone: "01234556",
      gmail: "London No. 1 Lake Park",
      status: "inactive",
      permissions: "Manager",
    },
    {
      id: "CL_0006",
      name: "Joe Black",
      phone: "01234556",
      gmail: "Sydney No. 1 Lake Park",
      status: "active",
      permissions: "Manager",
    },
    {
      id: "CL_0007",
      name: "John Brown",
      phone: "01234556",
      gmail: "New York No. 1 Lake Park",
      status: "active",
      permissions: "Design",
    },
    {
      id: "CL_0008",
      name: "Jim Green",
      phone: "01234556",
      gmail: "London No. 1 Lake Park",
      status: "inactive",
      permissions: "Manager",
    },
    {
      id: "CL_0009",
      name: "Joe Black",
      phone: "01234556",
      gmail: "Sydney No. 1 Lake Park",
      status: "active",
      permissions: "Manager",
    },
  ];
  const filteredData = filterStatus
    ? data.filter((item) => item.permissions === filterStatus)
    : data;

  return (
    <div style={{ padding: "3%" }} className="">
      <p style={{ margin: 0, fontSize: 24 }} className="fw-bolder">
        Welcome, K!
      </p>
      <p style={{ fontSize: 16 }}>Employee Manager</p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
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
              padding: "5px 10px",
              backgroundColor: "rgba(101, 101, 101, 1)",
              gap: 7,
              borderRadius: 5,
            }}
          >
            <p style={{ margin: 0, fontSize: 20, color: "white" }}>
              Permissions
            </p>
            <select
              value={filterStatus}
              onChange={handleFilterChange}
              style={{
                margin: 0,
                fontSize: 20,
                color: "rgba(255, 139, 55, 1)",
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
              }}
            >
              <option value="">All</option>
              <option value="Manager">Manager</option>
              <option value="Design">Design</option>
            </select>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "5px 10px",
              backgroundColor: "rgba(101, 101, 101, 1)",
              gap: 80,
              borderRadius: 5,
            }}
          >
            <p style={{ margin: 0, fontSize: 20, color: "white" }}>Joined</p>

            <IoIosArrowDown color="rgba(224, 215, 234, 1)" />
          </div>
        </div>
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
              padding: "5px 10px",
              backgroundColor: "rgba(101, 101, 101, 1)",
              gap: 7,
              borderRadius: 5,
            }}
          >
            <p style={{ margin: 0, fontSize: 20, color: "white" }}>Export</p>
          </div>
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
            {" "}
            <FiPlus color="rgba(224, 215, 234, 1)" />
            <p style={{ margin: 0, fontSize: 20, color: "white" }}>
              Add Employee
            </p>
          </div>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

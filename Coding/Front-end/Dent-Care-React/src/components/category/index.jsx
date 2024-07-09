import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Select, Modal, Table, Menu, Dropdown, Popconfirm } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import api from '../../config/axios';

const { Option } = Select;

const Category = () => {
  const [data, setData] = useState([]);
  const [roleFilter, setRoleFilter] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('');
  const [clinic, setClinic] = useState([]);
  const [room, setRoom] = useState([]);
  const [form] = Form.useForm();

  const fetchData = async () => {
    const response = await api.get("/account");
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchRoom = async () => {
    try {
      const res = await api.get("/room");
      setRoom(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  const fetchClinic = async () => {
    try {
      const res = await api.get("/clinic");
      setClinic(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClinic();
  }, []);

  const handleDeleteActive = async (record, action) => {
    try {
      let endpoint = '';
      if (action === 'delete') {
        endpoint = `/account/${record.id}`;
        await api.delete(endpoint);
        setData(data.filter((item) => item.id !== record.id));
        message.success('Deleted successfully');
      // } else if (action === 'activate') {
      //   endpoint = `/account/${record.id}/activate`;
      //   await api.put(endpoint);
      //   fetchData(); // Refresh the data to include the updated status
      //   message.success('Activated successfully');
      }
    } catch (error) {
      console.error('Failed:', error.response);
      message.error('Failed operation');
    }
  };
  

  const handleMenuClick = (e) => {
    setRoleFilter(e.key);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleDetail = (record) => {
    Modal.info({
      title: 'Detail',
      width: 1200,
      centered: true,
      content: (
        <div>
          <p><strong>ID:</strong> {record.id}</p>
          <p><strong>FullName:</strong> {record.fullName}</p>
          <p><strong>Email:</strong> {record.email}</p>
          <p><strong>Phone:</strong> {record.phone}</p>
          <p><strong>Role:</strong> {record.role}</p>
          <p><strong>Status:</strong> {record.status}</p>
          <h3>Dental Clinic Information:</h3>
          {record.dentalClinic && (
            <div>
              <p><strong>ID:</strong> {record.dentalClinic.id}</p>
              <p><strong>Clinic Name:</strong> {record.dentalClinic.clinicName}</p>
              <p><strong>Address:</strong> {record.dentalClinic.address}</p>
              <p><strong>Open Hours:</strong> {record.dentalClinic.openHours}</p>
              <p><strong>Close Hours:</strong> {record.dentalClinic.closeHours}</p>
              <p><strong>Clinic Status:</strong> {record.dentalClinic.clinicEnum}</p>
            </div>
          )}
          <p><strong>Enabled:</strong> {record.enabled ? 'Yes' : 'No'}</p>
          <p><strong>Username:</strong> {record.username}</p>
          <h3>Authorities:</h3>
          <ul>
            {record.authorities.map((auth, index) => (
              <li key={index}>{auth.authority}</li>
            ))}
          </ul>
          <p><strong>Account Non-Expired:</strong> {record.accountNonExpired ? 'Yes' : 'No'}</p>
          <p><strong>Account Non-Locked:</strong> {record.accountNonLocked ? 'Yes' : 'No'}</p>
          <p><strong>Credentials Non-Expired:</strong> {record.credentialsNonExpired ? 'Yes' : 'No'}</p>
        </div>
      ),
      onOk() {},
    });
  };

  const handleCreateAccount = async (values) => {
    setLoading(true);

    try {
      await api.post('/register-by-admin', {
        email: values.email,
        password: values.password,
        fullName: values.fullName,
        phone: values.phone,
        role: values.role,
        clinicId: values.role !== 'ADMIN' ? Number(values.clinicId) : undefined,
      });

      message.success('Account created successfully!');
      fetchData(); // Refresh the data to include the new account
      setIsModalOpen(false);
    } catch (e) {
      console.error('Error:', e.response ? e.response.data : e.message);
      const errorMsg = e.response && e.response.data ? JSON.stringify(e.response.data) : 'Failed to create account.';
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const onFinish = (values) => {
    handleCreateAccount(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleRoleChange = (value) => {
    setRole(value);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="all">All</Menu.Item>
      <Menu.Item key="ADMIN">Admin</Menu.Item>
      <Menu.Item key="Manager">Manager</Menu.Item>
      <Menu.Item key="dentist">Dentist</Menu.Item>
      <Menu.Item key="customer">Customer</Menu.Item>
    </Menu>
  );

  const filteredData = roleFilter === 'all'
    ? data
    : data.filter((item) => item.role.toLowerCase() === roleFilter.toLowerCase());

  const searchedData = filteredData.filter((item) =>
    item.fullName.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'FullName',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      render: (record) => (
        <>
          <Button type="primary" onClick={() => handleDetail(record)}>
            Detail
          </Button>
          {/* {record.status === 'INACTIVE' && (
            <Button
              onClick={() => handleDeleteActive(record, 'activate')}
              style={{ marginLeft: 8 }}
            >
              Activate
            </Button>
          )} */}
          {record.status !== 'INACTIVE' && (
            <Popconfirm
              title="Are you sure to delete this account?"
              onConfirm={() => handleDeleteActive(record, 'delete')}
              okText="Yes"
              cancelText="No"
            >
              <Button danger type="primary" style={{ marginLeft: 8 }}>Delete</Button>
            </Popconfirm>
          )}
        </>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search FullName"
          value={searchText}
          onChange={handleSearch}
          style={{ width: 200, marginRight: 16 }}
        />
        <Dropdown overlay={menu}>
          <Button>
            Filter by Role <DownOutlined />
          </Button>
        </Dropdown>
        <Button type="primary" onClick={showModal} style={{ marginLeft: 16 }}>
          Create Account
        </Button>
      </div>

      <Table dataSource={searchedData} columns={columns} />

      <Modal title="Create New Account" visible={isModalOpen} onCancel={handleCancel} footer={null}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: 'Please input your full name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your Email!' },
              { type: 'email', message: 'The input is not valid E-mail!' },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Please select a role!' }]}
          >
            <Select onChange={handleRoleChange}>
              <Option value="MANAGER">Manager</Option>
              {/* <Option value="DENTIST">Dentist</Option>
              <Option value="STAFF">Staff</Option> */}
            </Select>
          </Form.Item>
          {/* {(role === 'DENTIST' || role === 'STAFF' || role === 'MANAGER') && ( */}
          <Form.Item
            label="Clinic"
            name="clinicId"
            rules={[{ required: true, message: 'Please select a clinic ID!' }]}
          >
            <Select>
              {clinic.map((item) => (
                <Option key={item.id} value={item.id}>{item.clinicName}</Option>
              ))}
            </Select>
          </Form.Item>
          {/* )} */}
          {/* {role === 'DENTIST' && (
            <Form.Item
              label="Room ID"
              name="roomId"
              rules={[{ required: true, message: 'Please select the room ID!' }]}
            >
              <Select>
                {room.map((item) => (
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                ))}
              </Select>
            </Form.Item>
          )} */}
          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              Create Account
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Category;

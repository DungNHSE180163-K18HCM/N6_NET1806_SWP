import React, { useEffect, useState } from 'react';
import { Button, Table, message, Modal, Dropdown, Menu, Input, Select, Form } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import api from '../../config/axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/counterSlice';

const { Option } = Select;

const ManagerDentist = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clinic, setClinic] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [form] = Form.useForm();
  const user = useSelector(selectUser);
  const [roleFilter, setRoleFilter] = useState(['DENTIST', 'STAFF']); // Default role filter

  const fetchData = async () => {
    setLoading(true);
    try {
      console.log(`Fetching data for roles ${roleFilter.join(', ')} and clinic ${user.dentalClinic?.id}`);
      const responses = await Promise.all(
        roleFilter.map(role => api.get(`/account/role/${role}/clinic/${user.dentalClinic?.id}`))
      );
      const combinedData = responses.flatMap(response => response.data);
      setData(Array.isArray(combinedData) ? combinedData : []);
    } catch (error) {
      console.error('Failed to fetch data:', error.response ? error.response.data : error.message);
      message.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.dentalClinic?.id) {
      fetchData();
    }
  }, [user?.dentalClinic?.id, roleFilter]);

  const fetchClinic = async () => {
    try {
      const clinicResponse = await api.get(`/clinic/${user.dentalClinic?.id}`);
      setClinic(clinicResponse.data);

      const roomsResponse = await api.get(`/room/clinic/${user.dentalClinic?.id}`);
      setRooms(roomsResponse.data);
    } catch (error) {
      console.error('Failed to fetch clinic or rooms:', error.response ? error.response.data : error.message);
      message.error('Failed to fetch clinic or rooms');
    }
  };

  useEffect(() => {
    fetchClinic();
  }, [user?.dentalClinic?.id]);

  const handleSearch = (value) => {
    if (value.key === 'ALL') {
      setRoleFilter(['DENTIST', 'STAFF']);
    } else {
      setRoleFilter([value.key]);
    }
  };

  const handleDetail = (record) => {
    Modal.info({
      title: 'Detail',
      width: 800,
      centered: true,
      content: (
        <div>
          <p><strong>ID:</strong> {record.id}</p>
          <h3>Account Information:</h3>
          <p><strong>Full Name:</strong> {record.fullName}</p>
          <p><strong>Email:</strong> {record.email}</p>
          <p><strong>Phone:</strong> {record.phone}</p>
          <p><strong>Role:</strong> {record.role}</p>
          <p><strong>Status:</strong> {record.status}</p>
          <h3>Dental Clinic Information:</h3>
          {record.dentalClinic && (
            <div>
              <p><strong>Clinic ID:</strong> {record.dentalClinic.id}</p>
              <p><strong>Clinic Name:</strong> {record.dentalClinic.clinicName}</p>
              <p><strong>Address:</strong> {record.dentalClinic.address}</p>
              <p><strong>Open Hours:</strong> {record.dentalClinic.openHours}</p>
              <p><strong>Close Hours:</strong> {record.dentalClinic.closeHours}</p>
              <p><strong>Clinic Status:</strong> {record.dentalClinic.clinicEnum}</p>
            </div>
          )}
          {record.room && (
            <div>
              <h3>Room Information:</h3>
              <p><strong>Room ID:</strong> {record.room.id}</p>
              <p><strong>Room Name:</strong> {record.room.name}</p>
              <p><strong>Room Status:</strong> {record.room.roomEnum}</p>
            </div>
          )}
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
        roomId: values.roomId,
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
    form.setFieldsValue({ roomId: undefined }); // Reset room value when role changes
    if (value === 'DENTIST') {
      fetchClinic(); // Fetch the rooms again
    } else {
      setRooms([]); // Clear the rooms if the role is not DENTIST
    }
  };

  const handleDeleteAccount = async (accountId) => {
    setLoading(true);
    try {
      await api.delete(`/account/${accountId}`);
      message.success('Account deleted successfully!');
      fetchData(); // Refresh the data to reflect the updated list
    } catch (error) {
      console.error('Failed to delete account:', error.response ? error.response.data : error.message);
      message.error('Failed to delete account');
    } finally {
      setLoading(false);
    }
  };

  const menu = (
    <Menu onClick={handleSearch}>
      <Menu.Item key="ALL">All</Menu.Item>
      <Menu.Item key="DENTIST">Dentist</Menu.Item>
      <Menu.Item key="STAFF">Staff</Menu.Item>
      {/* Add other roles as needed */}
    </Menu>
  );

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Clinic Name',
      dataIndex: ['dentalClinic', 'clinicName'],
      key: 'clinicName',
    },
    {
      title: 'Room Name',
      dataIndex: ['room', 'name'],
      key: 'roomName',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      render: (record) => (
        <div>
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
          {
            record.status !== 'INACTIVE' && (
              <Button danger type="primary" style={{ marginLeft: 8 }} onClick={() => handleDeleteAccount(record.id)}>
            Delete
          </Button>
            )
          }
          
        </div>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Dropdown overlay={menu}>
          <Button>
            Filter by Role <DownOutlined />
          </Button>
        </Dropdown>
        <Button type="primary" onClick={showModal}>
          Create Account
        </Button>
      </div>
      <Table dataSource={data} columns={columns} rowKey="id" loading={loading} />

      <Modal
        title="Create New Account"
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
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
            <Select onChange={handleRoleChange} >
              <Option value="DENTIST">Dentist</Option>
              <Option value="STAFF">Staff</Option>
              {/* Add other roles as needed */}
            </Select>
          </Form.Item>
          {form.getFieldValue('role') === 'DENTIST' && (
            <Form.Item
              label="Room"
              name="roomId"
              rules={[{ required: true, message: 'Please select a room!' }]}
            >
              <Select>
                {rooms.map((room) => (
                  <Option key={room.id} value={room.id}>{room.name}</Option>
                ))}
              </Select>
            </Form.Item>
          )}
          <Form.Item
            label="Clinic"
            name="clinicId"
            initialValue={user.dentalClinic?.id}
          >
            <Select disabled>
              <Option value={user.dentalClinic?.id}>{user.dentalClinic?.clinicName}</Option>
            </Select>
          </Form.Item>
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

export default ManagerDentist;

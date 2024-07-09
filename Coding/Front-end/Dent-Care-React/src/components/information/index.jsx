import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Select } from 'antd';
import api from '../../config/axios';

const { Option } = Select;

const Information = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('');
  const [clinic, setClinic] = useState([]);
  const [room, setRoom] = useState([]); // Sửa từ userState thành useState

  const fetchRoom = async () => {
    try {
      const res = await api.get("/room");
      console.log(res.data);
      setRoom(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  const fetchClinic = async () => {
    try {
      const res = await api.get("/clinic");
      console.log(res.data);
      setClinic(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchClinic();
  }, []);

  const onFinish = async (values) => {
    console.log(values.email, values.password, values.phone, values.fullName, values.clinicId, values.roomId);
    setLoading(true);

    try {
      await api.post('/register-by-admin', {
        email: values.email,
        password: values.password,
        fullName: values.fullName,
        phone: values.phone,
        role: values.role,
        clinicId: values.role !== 'ADMIN' ? Number(values.clinicId) : undefined,
        roomId: values.role === 'DENTIST' ? Number(values.roomId) : undefined,
      });

      message.success('Account created successfully!');
    } catch (e) {
      console.error('Error:', e.response ? e.response.data : e.message);
      const errorMsg = e.response && e.response.data ? JSON.stringify(e.response.data) : 'Failed to create account.';
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleRoleChange = (value) => {
    setRole(value);
  };

  console.log(clinic);

  return (
    <div className="container">
      <div className="content">
        <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <h1>Create Account</h1>
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
              <Option value="DENTIST">Dentist</Option>
              <Option value="MANAGER">Manager</Option>
              <Option value="STAFF">Staff</Option>
            </Select>
          </Form.Item>
          {(role === 'DENTIST' || role === 'STAFF' || role === 'MANAGER') && (
            <Form.Item
              label="Clinic"
              name="clinicId"
              rules={[{ required: true, message: 'Please select a clinic ID!' }]}
            >
              <Select>
                {clinic?.map((item) => (
                  <Option key={item.id} value={item.id}>{item.clinicName}</Option>
                ))}
              </Select>
            </Form.Item>
          )}
          {role === 'DENTIST' && (
            <Form.Item
              label="Room ID"
              name="roomId"
              rules={[{ required: true, message: 'Please select the room ID!' }]}
            >
              <Select>
                {room?.map((item) => (
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                ))}
              </Select>
            </Form.Item>
          )}
          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              Create Account
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Information;

import React, { useState } from 'react';
import { Form, Input, Button, message, TimePicker } from 'antd';
import api from '../../config/axios';

const Product = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const openHours = values.openHours.format('h:mm a');
    const closeHours = values.closeHours.format('h:mm a');

    try {
      const res = await api.post('/clinic', {
        clinicName: values.clinicName,
        address: values.address,
        openHours,
        closeHours,
      });

      message.success('Clinic created successfully!');
    } catch (e) {
      console.error('Error:', e.response ? e.response.data : e.message);
      const errorMsg = e.response && e.response.data ? JSON.stringify(e.response.data) : 'Failed to create clinic.';
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="container">
      <div className="content">
        <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <h1>Create New Clinic</h1>
          <Form.Item
            label="Clinic Name"
            name="clinicName"
            rules={[{ required: true, message: 'Please input the clinic name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input the address!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Open Hours"
            name="openHours"
            rules={[{ required: true, message: 'Please select the opening hours!' }]}
          >
            <TimePicker format="h:mm a" use12Hours />
          </Form.Item>
          <Form.Item
            label="Close Hours"
            name="closeHours"
            rules={[{ required: true, message: 'Please select the closing hours!' }]}
          >
            <TimePicker format="h:mm a" use12Hours />
          </Form.Item>
          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit" className="btn">
              Create Clinic
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Product;
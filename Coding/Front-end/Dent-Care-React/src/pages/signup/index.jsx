
import React, { useState } from 'react';
import './sign.css';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../config/axios';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function SignupPage() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values.email);
    console.log(values.password);
    console.log(values.phone);
    console.log(values.fullName);

    setLoading(true);

    try {
      const res = await api.post('/register', {
        email: values.email,
        password: values.password,
        fullName: values.fullName,
        phone: values.phone,
      });

      toast.success('Sign up successfully!');
      navigate('/login');
    } catch (e) {
      toast.error(e.response.data);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 style={{ color: '#06A3DA' }}>SIGN UP HERE</h2>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your Email!' },
              { type: 'email', message: 'The input is not valid E-mail!' },
            ]}
          >
            <Input prefix={<i className="fa fa-envelope" />} placeholder="EMAIL" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password prefix={<i className="fa fa-lock" />} placeholder="PASSWORD" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            rules={[
              { required: true, message: 'Please input your confirm password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<i className="fa fa-lock" />} placeholder="RE PASSWORD" />
          </Form.Item>

          <Form.Item
            name="fullName"
            rules={[{ required: true, message: 'Please input your full name!' }]}
          >
            <Input prefix={<i className="fa fa-user" />} placeholder="FULL NAME" />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[{ required: true, message: 'Please input your phone!' }]}
          >
            <Input prefix={<i className="fa fa-phone" />} placeholder="PHONE" />
          </Form.Item>

          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Sign up
            </Button>
          </Form.Item>
        </Form>

        <Form.Item>
          <Link to="/login" className="signup-link">
            Already have an account? <strong>Log in</strong>
          </Link>
        </Form.Item>
      </div>
    </div>
  );
}

export default SignupPage;

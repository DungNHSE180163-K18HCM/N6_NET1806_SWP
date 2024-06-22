import React from 'react';
import { Button, Form, Input, Radio, message } from 'antd';
import axios from 'axios';

const Information = () => {
  const [form] = Form.useForm();

  const handleSave = () => {
    form.validateFields()
      .then(values => {
        // Send form data to server
        axios.post('/api/save', values)
          .then(response => {
            message.success('Information saved successfully!');
          })
          .catch(error => {
            message.error('Failed to save information.');
          });
      })
      .catch(errorInfo => {
        console.log('Validation Failed:', errorInfo);
      });
  };

  return (
    <div className="container">
      <div className="sidebar">
        <a href="#account">Quản lý tài khoản</a>
        <a href="#password">Đổi mật khẩu</a>
      </div>

      <div className="content">
        <div id="image-section">
          <Button className="btn">Chọn hình</Button>
          <p>Dùng hình 18+ sẽ bị khóa tài khoản vĩnh viễn.</p>
        </div>

        <Form form={form} layout="vertical">
          <h1>Thông tin tài khoản</h1>
          <Form.Item label="Điểm" name="score" initialValue="33745">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" initialValue="thanhcao643@gmail.com">
            <Input type="email" />
          </Form.Item>

          <h1>Thông tin cá nhân</h1>
          <Form.Item label="Họ" name="lastname" initialValue="Q">
            <Input />
          </Form.Item>
          <Form.Item label="Tên" name="firstname" initialValue="Thank">
            <Input />
          </Form.Item>
          <Form.Item label="Giới tính" name="gender" initialValue="male">
            <Radio.Group>
              <Radio value="male">Nam</Radio>
              <Radio value="female">Nữ</Radio>
            </Radio.Group>
          </Form.Item>

          <h1>Chọn Loại Cấp Bậc</h1>
          <Form.Item name="rank" initialValue="none">
            <Radio.Group>
              <Radio value="none">Không Chọn</Radio>
              <Radio value="game">Game</Radio>
              <Radio value="phap-su">Pháp Sư</Radio>
              <Radio value="tu-tien">Tu Tiên</Radio>
              <Radio value="ma-vuong">Ma Vương</Radio>
              <Radio value="tinh-khong">Tinh Không</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={handleSave} className="btn">Lưu</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Information;

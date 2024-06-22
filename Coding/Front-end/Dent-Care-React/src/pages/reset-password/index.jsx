import React from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Form, Input } from 'antd';
// import api from '../../config/axios';
import axios from 'axios';
import { toast } from 'react-toastify';

function ResetPage() {
 

  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token")
  const navigate = useNavigate()


  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

    const onFinish = async (values) => {
      if(values.newPassword === values.confirmPassword){
        try {
          const res = await axios.patch("http://68.183.183.140:8080/api/reset-password", {
            password: values.newPassword
          }, config)
          toast.success('Reset password successfully!')
          navigate("/login")
        } catch (error) {
          console.log(error)
        }
      }

      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

  return (
    <>
    
    <section className="vh-100 d-flex align-items-center">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100 wow fadeInUp" data-wow-delay="0.1s">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <Link to={'/'}>
              <h1 className="my-5 display-3 fw-bold ls-tight text-primary">
                DentCare
              </h1>
            </Link>
            <p style={{ color: 'hsl(217, 10%, 50.8%)' }}>We believe in delivering the highest standard of dental care. Our state-of-the-art facility is equipped with the latest technology and adheres to the strictest hygiene protocols to ensure your safety and comfort.
            </p>
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 wow zoomIn" data-wow-delay="0.6s">

            <Form
              name="basic"
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="New Password"
                labelCol={{span:"24"}}
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: 'Please input your new password !',
                  },
                ]}
              >
               <Input.Password/>
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                labelCol={{span:"24"}}
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: 'Please input your confirm password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The new password that you entered do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password/>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 0,
                  span: 16,
                }}
              >

                <Button className="btn btn-primary btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', paddingBottom: '2.5rem' }} type="primary" htmlType="submit">
                  Reset Password
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </section>

    </>
  )
}

export default ResetPage
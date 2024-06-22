import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Input } from 'antd';
import { toast } from 'react-toastify';
import api from '../../config/axios';

function ForgotPage() {

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()


    const onFinish = async (values) => {
        console.log(values.email)


        setLoading(true)

        try {



            const res = await api.post("/forgot-password", {

                email: values.email

            })
            toast.info("Please check your email")

            setTimeout(() => {
                navigate("/login")
            }, 10000);



        } catch (e) {
            toast.error(e.response.data)
        } finally {
            setLoading(false)
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
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your email!',
                                        },
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    wrapperCol={{
                                        offset: 4,
                                        span: 16,
                                    }}
                                >

                                    <Button loading={loading} className="btn btn-primary btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', paddingBottom: '2.5rem' }} type="primary" htmlType="submit">
                                        Send to email
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

export default ForgotPage
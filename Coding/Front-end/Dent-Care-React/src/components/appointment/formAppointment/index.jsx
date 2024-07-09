import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, Modal, Select, Space } from 'antd';
import api from '../../../config/axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/features/counterSlice';
import { toast } from 'react-toastify';
import './style.css'
import { useNavigate } from 'react-router-dom';

function FormAppointment({ clinic, service, denSer, dentist, patient, did, setIsFullFormVisible }) {


    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();
    const [slot, setSlot] = useState([]);
    const [date, setDate] = useState('');

    const user = useSelector(selectUser)

    const navigate= useNavigate()


    const handleBackClick = () => {
        setIsFullFormVisible(false);
    };

    useEffect(() => {
        form.setFieldsValue({
            name: patient.name,
            age: patient.age,
            address: patient.address,
            phone: patient.phoneNumber,
            email: patient.email,
            gender: patient.gender ? "male" : "female"
        })



    }, [patient]);

    const getDate = async (value) => {
        const datee = value.format('YYYY-MM-DD');
        setDate(datee);
        try {
            const res = await api.get(`/slot/available/dentist/${did}/day-off/${datee}`);
            console.log(res.data)
            setSlot(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };

    const tailLayout = {
        wrapperCol: { offset: 4, span: 16 },
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    const show = (values) => {
        Modal.info({
            title: 'Confirm',
            content:
                <div className="appointment-card d-flex flex-column justify-content-center align-items-center">
                    <i className="fa-regular fa-calendar-check" style={{ fontSize: '100px', marginBottom: '20px', color: '#06A3DA' }} />
                    <p className='text-center fw-normal' style={{ fontSize: '20px' }}>{patient.name}, we've got you confirmed for your appointment.</p>
                    <h3 className="time">
                        {slot.map(item => (item.id == values.slotID) ? `${item.startTime}  ` : '')}

                        | {dentist.fullName}</h3>
                    <p className="location text-center" style={{ fontSize: '20px', fontWeight:'100' }}>{formatDate(date)} 
                        <br/> {clinic.clinicName}
                    </p>
                    <Button
                        className='btn btn-primary px-5'
                        style={{ borderRadius: '20px', paddingLeft:'10px' }}
                        onClick={() => {
                            console.log(values);
                            Modal.destroyAll();
                            navigate('/patient')
                        }}
                    >
                        MY APPOINTMENT
                    </Button>
                    <hr style={{color:'black', width:'200px', marginTop:'20px'}}/>
                </div>
            ,
            footer: (_, { CancelBtn }) => (
                <>
                    <Button
                        className='btn btn-primary px-5'
                        style={{ borderRadius: '20px', marginRight:'100px', marginTop:'-20px' }}
                        onClick={() => {
                            console.log(values);
                            Modal.destroyAll();
                            navigate('/')
                        }}
                    >
                        HOME
                    </Button>
                </>
            ),
        });
    };

    const onFinishAppointmentAgain = async (values) => {
        setLoading(true)
        await makeAppointment(values, patient.id)
        console.log(values)
        toast.success('Make appointment successfully!');
        show(values)
    };

    const makeAppointment = async (values, id) => {
        try {
            await api.post('/appointment-patient', {
                id: 0,
                slotId: values.slotID,
                patientId: id,
                dentistServiceId: values.serviceID,
                date: date,
                cusId: user.id,
                status: "ALREADY",
            });
        } catch (error) {
            console.log(error)
            toast.error(error.response.data)
        }finally{
            setLoading(false)
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='appoinment'>

            <Form
                {...layout}
                form={form}
                name="appointment-form"
                onFinish={onFinishAppointmentAgain}
                onFinishFailed={onFinishFailed}
                style={{ maxWidth: 800 }}
            >
                <Form.Item
                    name="clinicID"
                    label="Select Clinic"
                    rules={[{ required: true, message: 'Please select a clinic!' }]}
                    initialValue={clinic.id}
                >
                    <div
                        className='ant-input css-dev-only-do-not-override-3rel02 ant-input-outlined'
                        style={{ textAlign: 'start' }}
                    >{clinic.clinicName}</div>
                    <Input type='hidden' />
                </Form.Item>

                <Form.Item
                    name="serviceID"
                    label="Select Service"
                    rules={[{ required: true, message: 'Please select a service!' }]}
                    initialValue={denSer.id}
                >
                    <div
                        className='ant-input css-dev-only-do-not-override-3rel02 ant-input-outlined'
                        style={{ textAlign: 'start' }}
                    >{service.name}</div>
                    <Input type='hidden' />
                </Form.Item>

                {did && (
                    <Form.Item
                        name="dentistID"
                        label="Select Doctor"
                        rules={[{ required: true, message: 'Please select a doctor!' }]}
                        initialValue={dentist.fullName}
                    >
                        <div
                            className='ant-input css-dev-only-do-not-override-3rel02 ant-input-outlined'
                            style={{ textAlign: 'start' }}
                        >{dentist.fullName}</div>
                        <Input type='hidden' />
                    </Form.Item>
                )}

                <Form.Item
                    name="date"
                    label="Select Date"
                    rules={[{ required: true, message: 'Please select a date!' }]}
                >
                    <DatePicker style={{ width: '100%' }} onChange={getDate} />
                </Form.Item>

                <Form.Item
                    name="slotID"
                    label="Select Slot"
                    rules={[{ required: true, message: 'Please select a slot!' }]}
                >
                    <Select placeholder="Select Slot">
                        {slot?.map((item) => (
                            <Select.Option key={item.id} value={item.id} disabled={!item.available}>
                                Slot {item.id}: {item.startTime} - {item.endTime}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="name" label="Name">
                    <Input />
                </Form.Item>

                <Form.Item name="age" label="Age">
                    <Input />
                </Form.Item>

                <Form.Item name="gender" label="Gender">
                    <Input />
                </Form.Item>

                <Form.Item name="address" label="Address">
                    <Input />
                </Form.Item>

                <Form.Item name="phone" label="Phone">
                    <Input />
                </Form.Item>

                <Form.Item name="email" label="Email">
                    <Input />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Space>
                        <Button
                            loading={loading}
                            type="primary"
                            htmlType="submit"
                            className="btn btn-primary btn-lg appointment-btn"
                            style={{
                                paddingLeft: '2.5rem',
                                paddingRight: '2.5rem',
                                paddingBottom: '2.5rem',
                                marginRight: '10px',
                            }}
                        >
                            Make Appointment
                        </Button>
                        <Button
                            onClick={handleBackClick}
                            className="btn btn-secondary btn-lg appointment-btn"
                            style={{
                                paddingLeft: '2.5rem',
                                paddingRight: '2.5rem',
                                paddingBottom: '2.5rem',
                            }}
                        >
                            Back
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
}

export default FormAppointment;
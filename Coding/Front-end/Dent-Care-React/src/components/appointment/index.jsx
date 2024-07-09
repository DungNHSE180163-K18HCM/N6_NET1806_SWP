import React, { useEffect, useState } from 'react'
import useClinics from '../../callApi/clinic';
import useDentists from '../../callApi/dentists';
import useServices from '../../callApi/services';
import { Button, DatePicker, Form, Input, Modal, Radio, Select, Space } from 'antd';
import useSlot from '../../callApi/slot';
import './style.css'
import { Link,  useParams } from 'react-router-dom';
import useClinicByID from '../../callApi/cliByID';
import api from '../../config/axios';
import { useForm } from 'antd/es/form/Form';
import useServiceByID from '../../callApi/serviceByID';
import useDentistByID from '../../callApi/dentistByID';
import useDentistsByClinicAndService from '../../callApi/dentByCliandSer';
import { toast } from 'react-toastify';
import { setLogLevel } from 'firebase/app';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/counterSlice';
import useSlotByDentistID from '../../callApi/slotByDen';
import useSlotByDentistIDAndDate from '../../callApi/slotByDate';
import useSerAndDenByID from '../../callApi/den-ser';
import usePatientByPhone, { getPatient } from '../../callApi/patientByPhone';
import FormAppointment from './formAppointment';
import { useNavigate } from 'react-router-dom';
import usePatientForSelect from '../../callApi/patientForSelect';



function Appointment() {

    const user = useSelector(selectUser)

    const [isFullFormVisible, setIsFullFormVisible] = useState(false);

    const [patient, setPatient] = useState({})

    const { id, sid, did } = useParams()
    const [form1] = Form.useForm();

    const navigate= useNavigate()



    const { clinic } = useClinicByID(id);
    const { service } = useServiceByID(sid);
    const { dentist } = useDentistByID(did);
    const { denSer } = useSerAndDenByID(sid, did);

    const {patientSelect} = usePatientForSelect(user.id)



    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };

    const tailLayout = {
        wrapperCol: { offset: 4, span: 16 },


    };


    const handlePhoneSubmit = async (values) => {
        setIsFullFormVisible(true);
        const patien = await getPatient(values.phone)
        setPatient(patien)
    };

    const handleSelectSubmit = async (values) => {
        console.log(values.phone)
        setIsFullFormVisible(true);
        const patien = await getPatient(values.phone)
        setPatient(patien)
    };



    const handleBackClick = () => {
        setIsFullFormVisible(false);
    };



    const onFinish = async (values) => {
        const phone = await createPatient(values)
        const { id } = await getPatient(phone)
        await makeAppointment(values, id)
        show(values)
    };



    const createPatient = async (values) => {
        try {
            const res = await api.post('/patient', {
                name: values.name,
                age: values.age,
                gender: values.gender,
                address: values.address,
                phoneNumber: values.phone,
                email: values.email,
            });
            return res.data.phoneNumber
        } catch (error) {
            console.log(error)
            toast.error(error.response.data)
        }
    }

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
        }
    }

    const [date, setDate] = useState('');


    const getDate = async (value) => {
        const dateCurrent = value.format('YYYY-MM-DD')
        setDate(dateCurrent);
        try {
            const res = await api.get(`/slot/available/dentist/${did}/day-off/${dateCurrent}`)
            setSlot(res.data)

        } catch (error) {
            console.log(error)
        }

    }

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
                    <p className='text-center fw-normal' style={{ fontSize: '20px' }}>{values.name}, we've got you confirmed for your appointment.</p>
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
    const [slot, setSlot] = useState([])


    const onFinishFailed = (errorInfo, values) => {
        console.log('Failed:', errorInfo);
    };

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 },
        },
    };

    const tailFormItemLayout = {
        wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 14, offset: 6 },
        },
    };

    return (
        <>
            <div className="container-fluid bg-primary bg-appointment my-5 wow fadeInUp" data-wow-delay="0.1s">
                <div className="container">
                    <div className="row gx-5">
                        <div className="col-lg-6 py-5">
                            <div className="py-5">
                                <h1 className="display-5 text-white mb-4">We Are A Certified and Award Winning Dental Clinic You Can Trust</h1>
                                <p className="text-white mb-0">As a certified and award-winning dental clinic, we pride ourselves on delivering exceptional dental care that you can trust. Our commitment to excellence and patient satisfaction has earned us recognition in the industry, ensuring you receive the highest quality of service every time you visit.</p>
                            </div>
                        </div>

                        {!isFullFormVisible ? (
                            <div className="col-lg-6">
                                <div className="appointment-form h-100 d-flex flex-column justify-content-center text-center p-5 wow zoomIn" data-wow-delay="0.6s">
                                    <h1 className="text-white mb-4">Make Appointment</h1>

                                    <Form
                                        {...formItemLayout}
                                        onFinish={handleSelectSubmit}
                                    >
                                        <Form.Item
                                            label="Patient"
                                            name="phone"
                                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                                        >
                                            <Select placeholder="Select Patient">
                                                    {patientSelect.map((item) => (
                                                        <Option key={item.phoneNumber} value={item.phoneNumber}>
                                                            {item.name} - {item.phoneNumber}
                                                        </Option>
                                                    ))}
                                                </Select>
                                        </Form.Item>
                                        <Form.Item {...tailFormItemLayout}>
                                            <Button type="primary" htmlType="submit" className='btn btn-primary' style={{ padding: '0px 80px', borderRadius: '4px' }}>
                                                Next
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                    
                                    <hr className='bg-light m-4'/>

                                    <Form
                                        {...formItemLayout}
                                        onFinish={handlePhoneSubmit}
                                    >
                                        <p className='mt-3'>If it's your first time to be here, click below button</p>
                                        <Form.Item {...tailFormItemLayout}>
                                            <Button type="primary" htmlType="submit" className='btn btn-primary' style={{ padding: '0px 80px', borderRadius: '4px' }}>
                                                Next
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                        ) : (
                            <div className="col-lg-6">
                                <div className="appointment-form h-100 d-flex flex-column justify-content-center text-center p-5 wow zoomIn" data-wow-delay="0.6s">
                                    <h1 className="text-white mb-4">Make Appointment</h1>

                                    {patient ? (
                                        <div>
                                            <FormAppointment clinic={clinic} service={service}
                                                denSer={denSer} dentist={dentist}
                                                patient={patient} did={did}
                                                setIsFullFormVisible={setIsFullFormVisible} />
                                        </div>
                                    ) : (
                                        <Form
                                            {...layout}
                                            form={form1}
                                            name="appointment-form"
                                            onFinish={onFinish}
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
                                                initialValue={denSer.id}

                                                rules={[{ required: true, message: 'Please select a service!' }]}
                                            >
                                                <div
                                                    className='ant-input css-dev-only-do-not-override-3rel02 ant-input-outlined'
                                                    style={{ textAlign: 'start' }}
                                                >{service.name}</div>
                                                <Input type='hidden' />
                                            </Form.Item >

                                            {did && <Form.Item
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
                                            </Form.Item>}

                                            <Form.Item
                                                name="date"
                                                label="Select Date"
                                                rules={[{ required: true, message: 'Please select a date!' }]}
                                            >
                                                <DatePicker
                                                    style={{ width: '100%' }}

                                                    onChange={getDate}
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                name="slotID"
                                                label="Select Slot"
                                                rules={[{ required: true, message: 'Please select a slot!' }]}
                                            >
                                                <Select placeholder="Select Slot">
                                                    {slot?.map((item) => (
                                                        <Option key={item.id} value={item.id} disabled={!item.available}>
                                                            Slot {item.id}: {item.startTime} - {item.endTime}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>

                                            <Form.Item
                                                name="name"
                                                label="Name"
                                                rules={[{ required: true, message: 'Please enter your name!' }]}
                                            >
                                                <Input placeholder="Name" />
                                            </Form.Item>

                                            <Form.Item
                                                name="age"
                                                label="Age"
                                                rules={[{ required: true, message: 'Please enter your age!' }]}
                                            >
                                                <Input placeholder="Age" />
                                            </Form.Item>

                                            <Form.Item
                                                name="gender"
                                                label="Select Gender"
                                                rules={[{ required: true, message: 'Please select your gender!' }]}
                                            >
                                                <Select placeholder="Select Gender">
                                                    <Option value={true}>Male</Option>
                                                    <Option value={false}>Female</Option>
                                                </Select>
                                            </Form.Item>

                                            <Form.Item
                                                name="address"
                                                label="Address"
                                                rules={[{ required: true, message: 'Please enter your address!' }]}
                                            >
                                                <Input placeholder="Address" />
                                            </Form.Item>

                                            <Form.Item
                                                name="phone"
                                                label="Phone"
                                                rules={[{ required: true, message: 'Please enter your phone number!' }]}
                                            >
                                                <Input placeholder="Phone" />
                                            </Form.Item>

                                            <Form.Item
                                                name="email"
                                                label="Email"
                                                rules={[{ required: true, message: 'Please enter your email!' }]}
                                            >
                                                <Input placeholder="Email" />
                                            </Form.Item>

                                            <Form.Item {...tailLayout}>
                                                <Space>
                                                    <Button
                                                        type="primary"
                                                        htmlType="submit"
                                                        className="btn btn-primary btn-lg appointment-btn"
                                                        style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', paddingBottom: '2.5rem', marginRight: '10px' }}
                                                    >
                                                        Make Appointment
                                                    </Button>
                                                    <Button onClick={handleBackClick}
                                                        className="btn btn-secondary btn-lg appointment-btn"
                                                        style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', paddingBottom: '2.5rem' }}
                                                    >
                                                        Back
                                                    </Button>
                                                </Space>
                                            </Form.Item>
                                        </Form>)}
                                </div>
                            </div>
                        )}


                    </div>
                </div>
            </div>






        </>
    )
}

export default Appointment
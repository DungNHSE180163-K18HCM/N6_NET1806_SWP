import React, { useEffect, useState } from 'react'
import HeroHeader from '../hero-header'
import './style.css'
import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Select,
} from 'antd';
import usePatientByPhone, { getPatient } from '../../callApi/patientByPhone';
import { toast } from 'react-toastify';
import api from '../../config/axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/counterSlice';

function Record() {

    const [isFullFormVisible, setIsFullFormVisible] = useState(false);

    const [appointment, setAppointment] = useState([])

    const user = useSelector(selectUser);

    // const [patient, setPatient] = useState({});

    const [form] = Form.useForm();

    const handlePhoneSubmit = async (values) => {
        setIsFullFormVisible(true);
        const { id } = await getPatient(values.phone);
        console.log(id)
        await getAppointment(id)
        // setPatient(patient)
    };

    const getToDay = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };


    const getAppointment = async (id) => {
        try {
            const res = await api.get(`/appointment-patient/patient/${id}/dentist/${user.id}/date/${getToDay()}`)
            setAppointment(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleBackClick = () => {
        setIsFullFormVisible(false);
    };

    // console.log(patient.id)

    // const createRecord= async (values) =>{
    //     try {
    //         const res = await api.post('/medical-record', {
    //           name: patient.name,
    //           note: values.note,
    //           diagnosis: values.diagnosis,
    //           appointmentPatientId: patient.id
    //         });
    //         // navigate('/');
    //       } catch (error) {
    //         console.log(error)
    //         toast.error(error.response.data)
    //       }
    // }


    // console.log(patient)

    const onFinish = (values) => {
        console.log(values)
        // createRecord(values)
    }

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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <>

            <HeroHeader content="Record" />

            {!isFullFormVisible ? (
                <div className='container bg-light'>
                    <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px' }}>
                        <Form
                            {...formItemLayout}
                            onFinish={handlePhoneSubmit}
                        >
                            <Form.Item
                                label="Phone"
                                name="phone"
                                rules={[{ required: true, message: 'Please input your phone number!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit" className='btn btn-primary' style={{ padding: '0px 80px', borderRadius: '4px' }}>
                                    Next
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            ) : (
                <div className="row  wow zoomIn" style={{ margin: '20px 50px' }} data-wow-delay="0.6s">
                    <div className="col-lg-12">
                        <div className="row">
                            <main className="col-lg-12 mb-5" style={{ fontSize: 15, marginTop: 40 }}>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Date</th>
                                            <th scope="col">Slot</th>
                                            <th scope="col">Service</th>
                                            <th scope="col">Patient</th>
                                            <th scope="col">Age</th>
                                            <th scope="col">Address</th>
                                            <th scope="col">Room</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appointment.map((item, index) => (


                                            item?.status != 'CANCEL' ? (
                                                <tr>
                                                    <td>{formatDate(item.date)}</td>
                                                    <td>{item.slot.name}:   {item.slot.startTime}-{item.slot.endTime}</td>
                                                    <td>{item.dentistServices.serviceDetail.name}</td>
                                                    <td>{item.patient.name}</td>
                                                    <td>{item.patient.age}</td>
                                                    <td>{item.patient.address}</td>
                                                    <td>{item.dentistServices.account.room?.name}</td>
                                                    <td>
                                                        <Link to={`/create-record/${item.id}`} className='btn btn-primary'>Create</Link>
                                                    </td>
                                                </tr>
                                            ) : ""

                                            // <tr>
                                            //     <td>{formatDate(item.date)}</td>
                                            //     <td>{item.slot.name}:   {item.slot.startTime}-{item.slot.endTime}</td>
                                            //     <td>{item.dentistServices.serviceDetail.name}</td>
                                            //     <td>{item.patient.name}</td>
                                            //     <td>{item.patient.age}</td>
                                            //     <td>{item.patient.address}</td>
                                            //     <td>{item.dentistServices.account.room?.name}</td>
                                            //     <td>
                                            //         <Link to={`/create-record/${item.id}`} className='btn btn-primary'>Create</Link>
                                            //     </td>
                                            // </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </main>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default Record
import React, { useEffect, useState } from 'react'
import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Select,
} from 'antd';
import { toast } from 'react-toastify';
import api from '../../config/axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import HeroHeader from '../../components/hero-header';
import useRecordByAppointmentID from '../../callApi/recordByAppointmentID';
import useTreatmentByID from '../../callApi/treatmentPlanByID';
import useAppointmentByID from '../../callApi/appointmentByID';

function RegularCheckUpSchedule() {

    const { aid, tid } = useParams()

    const { appointment } = useAppointmentByID(aid)

    const [form] = Form.useForm();

    const [date, setDate] = useState('');

    const [slot, setSlot] = useState([]);


    const onFinish = (values) => {
        // console.log(appointment.patient.id)
        // console.log(appointment.dentistServices.id)
        // console.log(values.date.format('YYYY-MM-DD'))
        // console.log(appointment.patient.account.id)

        // console.log(values.slotID)

        makeAppointment(values)


    }

    const makeAppointment = async (values) => {
        try {
            await api.post('/appointment-patient', {
                id: 0,
                // slotId: 1,
                slotId: values.slotID,
                patientId: appointment.patient.id,
                dentistServiceId: appointment.dentistServices.id,
                // date: values.date.format('YYYY-MM-DD'),
                date: date,
                cusId: appointment.patient.account.id,
                status: "ALREADY",
            });
            toast.success('Make appointment successfully!');
        } catch (error) {
            console.log(error)
            toast.error(error.response.data)
        } finally {
            setLoading(false)
        }
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

    const getDate = async (value) => {
        const datee = value.format('YYYY-MM-DD');
        setDate(datee);
        try {
            const res = await api.get(`/slot/available/dentist/${appointment.dentistServices.account.id}/day-off/${datee}`);
            console.log(res.data)
            setSlot(res.data);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <HeroHeader content="Create Regular Check-up Schedule" />
            <div className='container bg-light'>
                <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px' }}>

                    <Form
                        {...formItemLayout}
                        onFinish={onFinish}
                        form={form}
                    >
                        <Form.Item
                            label="Clinic"

                        >
                            <div
                                className='ant-input css-dev-only-do-not-override-3rel02 ant-input-outlined'
                                style={{ textAlign: 'start' }}>
                                {appointment.dentistServices?.account.dentalClinic.clinicName}
                            </div>
                        </Form.Item>

                        <Form.Item
                            label="Service"

                        >
                            <div
                                className='ant-input css-dev-only-do-not-override-3rel02 ant-input-outlined'
                                style={{ textAlign: 'start' }}>
                                {appointment.dentistServices?.serviceDetail.name}
                            </div>
                        </Form.Item>


                        <Form.Item
                            label="Dentist"

                        >
                            <div
                                className='ant-input css-dev-only-do-not-override-3rel02 ant-input-outlined'
                                style={{ textAlign: 'start' }}>
                                {appointment.dentistServices?.account.fullName}
                            </div>
                        </Form.Item>

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


                        <Form.Item
                            label="Name"

                        >
                            <div
                                className='ant-input css-dev-only-do-not-override-3rel02 ant-input-outlined'
                                style={{ textAlign: 'start' }}>
                                {appointment.patient?.name}
                            </div>
                        </Form.Item>

                        <Form.Item
                            label="Age"

                        >
                            <div
                                className='ant-input css-dev-only-do-not-override-3rel02 ant-input-outlined'
                                style={{ textAlign: 'start' }}>
                                {appointment.patient?.age}
                            </div>
                        </Form.Item>

                        <Form.Item
                            label="Address"

                        >
                            <div
                                className='ant-input css-dev-only-do-not-override-3rel02 ant-input-outlined'
                                style={{ textAlign: 'start' }}>
                                {appointment.patient?.address}
                            </div>
                        </Form.Item>


                        {/* <Form.Item
                            label="Treatment Name"
                            name='name'
                        >
                            <div
                                className='ant-input css-dev-only-do-not-override-3rel02 ant-input-outlined'
                                style={{ textAlign: 'start' }}>
                                    {treatment.name}
                            </div>
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input.TextArea />
                        </Form.Item>

                        <Form.Item
                            label="Frequency"
                            name="frequency"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input />
                        </Form.Item> */}

                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" className='btn btn-primary' style={{ padding: '0px 80px', borderRadius: '4px' }}>
                                Make Appointment
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>


        </>
    )
}

export default RegularCheckUpSchedule
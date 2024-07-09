import React, { useEffect, useState } from 'react'
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
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAppointmentByID from '../../callApi/appointmentByID';
import HeroHeader from '../../components/hero-header';

function CreateRecord() {

    const { aid } = useParams()

    const { appointment } = useAppointmentByID(aid)

    const navigate= useNavigate()

    const createRecord= async (values) =>{
        try {
            const res = await api.post('/medical-record', {
              name: values.recordName,
              note: values.note,
              diagnosis: values.diagnosis,
              appointmentPatientId: appointment.id
            });
            toast.success("Create record success")
          } catch (error) {
            console.log(error)
            toast.error(error.response.data)
          }
    }


    const onFinish = (values) => {
        console.log(values)
        createRecord(values)
        navigate(`/treatment-plan/${appointment.id}`)
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



    return (
        <>
            <HeroHeader content="Create Record" />
            <div className='container bg-light'>
                <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px' }}>

                    <Form
                        {...formItemLayout}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Name"
                            name="name"

                        >
                            <div
                                className='ant-input css-dev-only-do-not-override-3rel02 ant-input-outlined'
                                style={{ textAlign: 'start' }}>
                                    {appointment.patient?.name}
                            </div>
                        </Form.Item>

                        <Form.Item
                            label="age"
                            name="age"

                        >
                            <div
                                className='ant-input css-dev-only-do-not-override-3rel02 ant-input-outlined'
                                style={{ textAlign: 'start' }}>
                                    {appointment.patient?.age}
                            </div>
                        </Form.Item>

                        <Form.Item
                            label="Record Name"
                            name="recordName"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Note"
                            name="note"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input.TextArea />
                        </Form.Item>

                        <Form.Item
                            label="Diagnosis"
                            name="diagnosis"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input.TextArea />
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" className='btn btn-primary' style={{ padding: '0px 80px', borderRadius: '4px' }}>
                                Next
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>


        </>
    )
}

export default CreateRecord
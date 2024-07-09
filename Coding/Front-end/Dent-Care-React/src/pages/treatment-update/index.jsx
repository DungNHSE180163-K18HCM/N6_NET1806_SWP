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

function UpdateTreatment() {

    const { aid, tid } = useParams()

    const { record } = useRecordByAppointmentID(aid)

    const {treatment} =  useTreatmentByID(tid)

    console.log(record.id)

    const navigate= useNavigate()

    const [form] = Form.useForm();


    const updateTreatment= async (values) =>{
        try {
            const res = await api.put('/treatment-plan', {
                id: tid,
              name: values.name,
              description: values.description,
              frequency: values.frequency,
              status:"ACTIVE",
              medicalId: record.id
            });
            toast.success("Update treatment success")
          } catch (error) {
            console.log(error)
            toast.error(error.response.data)
          }
    }


    const onFinish = (values) => {
        updateTreatment(values)
        navigate(`/dentist-record/${record.id}`)
    }

    useEffect(() => {
        form.setFieldsValue({
            name: treatment.name,
            description: treatment.description,
            frequency: treatment.frequency
        })

    }, [record,treatment]);

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
            <HeroHeader content="Create Treatment Plan" />
            <div className='container bg-light'>
                <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px' }}>

                    <Form
                        {...formItemLayout}
                        onFinish={onFinish}
                        form={form}
                    >
                        <Form.Item
                            label="Record Name"

                        >
                            <div
                                className='ant-input css-dev-only-do-not-override-3rel02 ant-input-outlined'
                                style={{ textAlign: 'start' }}>
                                    {record.name}
                            </div>
                        </Form.Item>


                        <Form.Item
                            label="Treatment Name"
                            name='name'
                        >
                            {/* <div
                                className='ant-input css-dev-only-do-not-override-3rel02 ant-input-outlined'
                                style={{ textAlign: 'start' }}>
                                    {treatment.name}
                            </div> */}
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
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" className='btn btn-primary' style={{ padding: '0px 80px', borderRadius: '4px' }}>
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>


        </>
    )
}

export default UpdateTreatment
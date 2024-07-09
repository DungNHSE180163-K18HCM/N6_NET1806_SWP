import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/features/counterSlice'
import HeroHeader from '../../components/hero-header'
import { Link, useParams } from 'react-router-dom'
import useRecordByAppointmentID from '../../callApi/recordByAppointmentID'
import { Button, Form, Input } from 'antd'
import useTreatmentByRecordName from '../../callApi/treatmentByRecordName'
import useRecordByID from '../../callApi/recordByID'
import api from '../../config/axios'
import { toast } from 'react-toastify'

function DentistRecord
    () {

    const user = useSelector(selectUser)

    const { rid } = useParams()

    const { record } = useRecordByID(rid)

    const [form] = Form.useForm();

    console.log(record.name)

    const { treatment } = useTreatmentByRecordName(record.name)

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    const onFinish = (values) => {
        console.log(values)
        updateRecord(values)
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

    useEffect(() => {
        form.setFieldsValue({
            note: record.note,
            diagnosis: record.diagnosis
        })



    }, [record]);

    const updateRecord = async (values) => {

        try {
            await api.put('/medical-record', {
                id: record.id,
                name: record.name,
                note: values.note,
                diagnosis: values.diagnosis
            })
            toast.success("Update record success")
        } catch (error) {
            console.log(error)
            toast.error(error.response.data)
        }
    }

    return (
        <>
            <HeroHeader content=" Record Details" />

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
                            label="Date"
                        >
                            <div
                                className='ant-input css-dev-only-do-not-override-3rel02 ant-input-outlined'
                                style={{ textAlign: 'start' }}>
                                {record.appointmentPatient?.date}

                            </div>
                        </Form.Item>

                        <Form.Item
                            label="Service"
                        >
                            <div
                                className='ant-input css-dev-only-do-not-override-3rel02 ant-input-outlined'
                                style={{ textAlign: 'start' }}>
                                {record.appointmentPatient?.dentistServices.serviceDetail.name}

                            </div>
                        </Form.Item>

                        <Form.Item
                            label="Dentist"
                        >
                            <div
                                className='ant-input css-dev-only-do-not-override-3rel02 ant-input-outlined'
                                style={{ textAlign: 'start' }}>
                                {record.appointmentPatient?.dentistServices.account.fullName}

                            </div>
                        </Form.Item>

                        <Form.Item
                            label="Note"
                            name="note"
                        >
                            <Input.TextArea />
                        </Form.Item>

                        <Form.Item
                            label="Diagnosis"
                            name="diagnosis"
                        >
                            <Input.TextArea />
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" className='btn btn-primary' style={{ padding: '0px 80px', borderRadius: '4px' }}>
                                Update
                            </Button>
                        </Form.Item>


                    </Form>
                </div>
            </div>

            <HeroHeader content="Treatment Plan" />


            <div className="row  wow zoomIn" style={{ margin: '20px 50px' }} data-wow-delay="0.6s">
                <div className="col-lg-12">
                    <div className="row">
                        <main className="col-lg-12 mb-5" style={{ fontSize: 15, marginTop: 40 }}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Frequency</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {treatment.map((item, index) => (
                                        <tr>
                                            <td>{item?.name}</td>
                                            <td>{item?.description}</td>
                                            <td>{item?.frequency}</td>
                                            <td>
                                                <Link to={`/update-treatment/appoinmnet/${record.appointmentPatient?.id}/treatment/${item.id}`} className='btn btn-primary'>Update</Link>
                                            </td>
                                        </tr>
                                    ))}

                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>
                                                <Link to={`/treatment-plan/${record.appointmentPatient?.id}`} className='btn btn-primary'>Create</Link>
                                            </td>
                                        </tr>

                                </tbody>
                            </table>
                        </main>
                    </div>
                </div>
            </div>




        </>
    )
}

export default DentistRecord

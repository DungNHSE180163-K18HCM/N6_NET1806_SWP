import React, { useEffect, useState } from 'react'
import HeroHeader from '../../components/hero-header'
import { Link, useNavigate } from 'react-router-dom'
import useAppointmentByDentistID from '../../callApi/appointmentByDentistID'
import { Button, DatePicker, Form, Pagination, Select } from 'antd';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/counterSlice';
import api from '../../config/axios';

function DentistSchedule() {

    const { Option } = Select;
    const { RangePicker  } = DatePicker;

    const user = useSelector(selectUser)
    const [appointment, setAppointment] = useState([])
    const navigate= useNavigate()
    const [date,setDate] = useState([])
    const getAppointment = async () => {
        try {
            const res = await api.get(`/appointment-patient/dentist/${user.id}`)
            setAppointment(res.data)
        } catch (error) {
            console.log(error)
        }
    }
      
    useEffect(() => {
        getAppointment()
    }, [date]);


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = appointment.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // const [appointment, setAppointment] = useState([])

    const getAppointmentByDate = async () => {
        try {
            const res = await api.get(`/appointment-patient/date/between/${date[0]}/${date[1]}/dentist/${user.id}`)
            console.log(res)
            setAppointment(res.data)

        } catch (error) {
            console.log(error)
        }
    }
   





    console.log(date[0])
    console.log(date[1])
    return (
        <>
            <HeroHeader content="Dentist Schedule" />

            <div className='d-flex justify-content-center'>
                <Form layout="inline"
                        onFinish={getAppointmentByDate}>
                    <Form.Item label="Select Week">
                    <RangePicker   onChange={(value, dateString) => {
                 console.log('Formatted Selected Time: ', setDate(dateString));
                 
      }} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType='submit' >
                            Add Schedule
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            <div className="row  wow zoomIn" style={{ margin: '20px 50px' }} data-wow-delay="0.6s">
                <div className="col-lg-12">
                    <div className="row">
                        <main className="col-lg-12 mb-5" style={{ fontSize: 15, marginTop: 40 }}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Clinic</th>
                                        <th scope="col">Slot</th>
                                        <th scope="col">Service</th>
                                        <th scope="col">Patient</th>
                                        <th scope="col">Room</th>
                                        <th scope="col">Regular Schedule</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.map((item, index) => (

                                        item?.status != 'CANCEL' ? (
                                            <tr>
                                                <td>{item.date}</td>
                                                <td>{item.dentistServices.account.dentalClinic.address}</td>
                                                <td>{item.slot.name}:   {item.slot.startTime}-{item.slot.endTime}</td>
                                                <td>{item.dentistServices.serviceDetail.name}</td>
                                                <td>{item.patient.name}</td>
                                                <td>{item.dentistServices.account.room?.name}</td>
                                                <td>
                                                    <Link  onClick={()=>{navigate(`/regular-schedule/${item?.id}`)}}  className='btn btn-primary'>Create</Link>
                                                </td>
                                            </tr>
                                        ) : ""
                                    ))}

                                </tbody>
                            </table>
                        </main>
                    </div></div></div>
                    <Pagination
                            className='d-flex justify-content-center mt-5'
                            current={currentPage}
                            total={appointment?.length}
                            pageSize={itemsPerPage}
                            onChange={handlePageChange}
                            
                        />
        </>
    )
}

export default DentistSchedule
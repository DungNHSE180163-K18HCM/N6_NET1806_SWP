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
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/counterSlice';
import HeroHeader from '../../components/hero-header';

function CheckIn() {

    const [appointment, setAppointment] = useState([])

    const user = useSelector(selectUser);


    const getToDay = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };


    const getAppointment = async () => {
        try {
            const res = await api.get(`/appointment-patient/clinic/${user.dentalClinic.id}/date/${getToDay()}`)
            setAppointment(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAppointment()
    })


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    const handleCheckIn =async (id)=>{
        try {
            await api.patch(`/appointment-patient/id/${id}/status/ALREADY`);
            toast.success("Check-in appoinment success")
          } catch (error) {
            console.log(error)
            toast.error(error.response.data)
          }
    }

    const cancelAppointment = async (id)=>{
        try {
            await api.patch(`appointment-patient/id/${id}/status/CANCEL`);
            toast.success("Cancel appoinment success")
          } catch (error) {
            console.log(error)
            toast.error(error.response.data)
          }
    }

    return (
        <>

            <HeroHeader content="Check In" />


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
                                        <th scope="col">Room</th>
                                        <th scope="col">Status</th>
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
                                                <td>{item.dentistServices.account.room?.name}</td>
                                                <td>{item.status}</td>
                                                {item?.status === "PROCESSING" &&(
                                                    <td>
                                                        <Link  onClick={() => handleCheckIn(item?.id)} className='btn btn-primary me-5'>Check In</Link>
                                                        <Link onClick={() => cancelAppointment(item?.id)}  className='btn btn-primary'>Cancel</Link>

                                                    </td>
                                                    
                                                )}
                                                {/* <td>
                                                    <Link  onClick={() => handleCheckIn(item?.id)} className='btn btn-primary'>Check In</Link>
                                                </td> */}
                                                {/* <td>
                                                    <Link onClick={() => cancelAppointment(item?.id)}  className='btn btn-primary'>Cancel</Link>
                                                </td> */}
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

        </>
    )
}

export default CheckIn
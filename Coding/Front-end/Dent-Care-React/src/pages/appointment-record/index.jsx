import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/features/counterSlice'
import HeroHeader from '../../components/hero-header'
import { Link, useParams } from 'react-router-dom'
import useAppointmentByPatientID from '../../callApi/appointmentByPatientID'

function AppointmentRecord() {

    const user = useSelector(selectUser)

    const { pid } = useParams()

    const { appointment } = useAppointmentByPatientID(pid)

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <>
            <HeroHeader content="Patient Schedule" />

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
                                        <th scope="col">Dentist</th>
                                        <th scope="col">Room</th>
                                        <th scope="col">Record</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointment.map((item, index) => (


                                        item?.status != 'CANCEL' ? (
                                            <tr>
                                                <td>{formatDate(item.date)}</td>
                                                <td>{item.dentistServices.account.dentalClinic.address}</td>
                                                <td>{item.slot.name}:   {item.slot.startTime}-{item.slot.endTime}</td>
                                                <td>{item.dentistServices.serviceDetail.name}</td>
                                                <td>{item.dentistServices.account.fullName}</td>
                                                <td>{item.dentistServices.account.room?.name}</td>
                                                <td>
                                                    <Link to={`/patient-record/${item.id}`} className='btn btn-primary'>View</Link>
                                                </td>
                                            </tr>
                                        ) : ""

                                        // <tr>
                                        //     <td>{formatDate(item.date)}</td>
                                        //     <td>{item.dentistServices.account.dentalClinic.address}</td>
                                        //     <td>{item.slot.name}:   {item.slot.startTime}-{item.slot.endTime}</td>
                                        //     <td>{item.dentistServices.serviceDetail.name}</td>
                                        //     <td>{item.dentistServices.account.fullName}</td>
                                        //     <td>{item.dentistServices.account.room?.name}</td>
                                        //     <td>
                                        //         <Link to={`/patient-record/${item.id}`} className='btn btn-primary'>View</Link>
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

export default AppointmentRecord
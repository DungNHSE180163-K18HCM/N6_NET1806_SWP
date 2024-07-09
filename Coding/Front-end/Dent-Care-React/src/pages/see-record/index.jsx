import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/features/counterSlice'
import HeroHeader from '../../components/hero-header'
import { Link, useParams } from 'react-router-dom'
import useAppointmentByPatientID from '../../callApi/appointmentByPatientID'
import useRecordByDentistID from '../../callApi/recordByDentistID'

function RecordByDentist() {

    const user = useSelector(selectUser)

    const { pid } = useParams()

    const { record } = useRecordByDentistID(user.id)

    console.log(record)

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <>
            <HeroHeader content="Dentist Record" />

            <div className="row  wow zoomIn" style={{ margin: '20px 50px' }} data-wow-delay="0.6s">
                <div className="col-lg-12">
                    <div className="row">
                        <main className="col-lg-12 mb-5" style={{ fontSize: 15, marginTop: 40 }}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Slot</th>
                                        <th scope="col">Patient</th>
                                        <th scope="col">Service</th>
                                        <th scope="col">Room</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {record.map((item, index) => (
                                            <tr>
                                                <td>{formatDate(item.appointmentPatient.date)}</td>
                                                <td>{item.appointmentPatient.slot.name}: {item.appointmentPatient.slot.startTime}-{item.appointmentPatient.slot.endTime}</td>
                                                <td>{item.appointmentPatient.patient.name}</td>
                                                <td>{item.appointmentPatient.dentistServices.serviceDetail.name}</td>
                                                <td>{item.appointmentPatient.dentistServices.account.room.name}</td>
                                                
                                                <td>
                                                    <Link to={`/dentist-record/${item.id}`} className='btn btn-primary'>View</Link>
                                                </td>
                                            </tr>
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

export default RecordByDentist
import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/features/counterSlice'
import usePatientByUserID from '../../callApi/patientByUserID'
import HeroHeader from '../../components/hero-header'
import { Link } from 'react-router-dom'

function PatientAppointmentRecord() {

    const user = useSelector(selectUser)

    const { patient } = usePatientByUserID(user.id)


    return (
        <>
            <HeroHeader content="Patient Appointment Record" />

            <div className="row  wow zoomIn" style={{ margin: '20px 50px' }} data-wow-delay="0.6s">
                <div className="col-lg-12">
                    <div className="row">
                        <main className="col-lg-12 mb-5" style={{ fontSize: 15, marginTop: 40 }}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Appointment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {patient.map((item, index) => (
                                        <tr>
                                            <td>{item.name}</td>
                                            <td>{item.phoneNumber}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <Link to={`/appointment-record/${item.id}`} className='btn btn-primary'>View</Link>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </main>
                    </div></div></div>



        </>
    )
}

export default PatientAppointmentRecord
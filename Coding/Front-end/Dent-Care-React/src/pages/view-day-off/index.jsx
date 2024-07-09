import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/features/counterSlice'
import HeroHeader from '../../components/hero-header'
import { Link, useParams } from 'react-router-dom'
import useAppointmentByPatientID from '../../callApi/appointmentByPatientID'
import { toast } from 'react-toastify'
import api from '../../config/axios'
import useDayOffByDentistID from '../../callApi/day-off'

function ViewDayOff() {

    const user = useSelector(selectUser)

    const {dayOff} = useDayOffByDentistID(user.id)

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
                                        <th scope="col">Slot</th>
                                        <th scope="col">Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dayOff.map((item, index) => (
                                            <tr>
                                                <td>{formatDate(item.dayOff)}</td>
                                                <td>{item.slot.name}</td>
                                                <td>{item.slot.startTime}-{item.slot.endTime}</td>

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

export default ViewDayOff
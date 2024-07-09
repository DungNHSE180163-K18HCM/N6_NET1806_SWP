import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/features/counterSlice'
import HeroHeader from '../../components/hero-header'
import { Link, useParams } from 'react-router-dom'
import useAppointmentByPatientID from '../../callApi/appointmentByPatientID'
import { toast } from 'react-toastify'
import api from '../../config/axios'

function PatientSchedule() {

    const user = useSelector(selectUser)

    const { pid } = useParams()

    const { appointment,setAppointment } = useAppointmentByPatientID(pid)

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    const cancelAppointment = async (id)=>{
        console.log(id)
        try {
            await api.delete(`/appointment-patient/${id}`);    
            setAppointment(appointment.filter(item => item.id != id));
            toast.success("Cancel appointment success")
          } catch (error) {
            console.log(error)
            toast.error(error.response.data)
          } 
    }

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
                                        <th scope="col">Action</th>
                                        <th scope="col"></th>
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
                                                    <Link to={`/appointment-details/${item?.id}`} className='btn btn-primary'>View</Link>
                                                    
                                                </td>

                                                <td>
                                                    <Link to={`/patient-schedule/${pid}`} onClick={() => cancelAppointment(item?.id)} className='btn btn-primary'>Cancel</Link>
                                                    
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
                                        //         <Link to={`/`} className='btn btn-primary'>Cancel</Link>
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

export default PatientSchedule
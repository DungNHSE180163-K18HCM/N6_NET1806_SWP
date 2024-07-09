import { useState, useEffect } from 'react';
import api from '../../config/axios';

const useAppointmentByPatientID = (id) => {


    const [appointment, setAppointment] = useState([])

    const getAppointment = async () => {
        try {
            const res = await api.get(`/appointment-patient/patient/id/${id}`)
            setAppointment(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAppointment()
    }, []);

    return { appointment,setAppointment};
};

export default useAppointmentByPatientID;

import { useState, useEffect } from 'react';
import api from '../../config/axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/counterSlice';
import { useParams } from 'react-router-dom';

const useAppointmentByID = (aid) => {

    const [appointment, setAppointment] = useState({})

    const getAppointment = async () => {
        try {
            const res = await api.get(`/appointment-patient/${aid}`)
            setAppointment(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAppointment()
    }, [aid]);

    return { appointment};
};

export default useAppointmentByID;

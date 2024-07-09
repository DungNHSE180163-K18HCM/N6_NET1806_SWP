import { useState, useEffect } from 'react';
import api from '../../config/axios';
import { useParams } from 'react-router-dom';

const usePatientByUserID = (id) => {


    const [patient, setPatient] = useState([])

    const getPatient = async () => {
        try {
            const res = await api.get(`/patient/customer/${id}`)
            setPatient(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPatient()
    }, []);

    return { patient};
};

export default usePatientByUserID;

import { useState, useEffect } from 'react';
import api from '../../config/axios';
import { useParams } from 'react-router-dom';

const usePatientForSelect = (id) => {


    const [patientSelect, setPatientSelect] = useState([])

    const getPatient = async () => {
        try {
            const res = await api.get(`/patient/customer/${id}`)
            setPatientSelect(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPatient()
    }, [id]);

    return { patientSelect};
};

export default usePatientForSelect;

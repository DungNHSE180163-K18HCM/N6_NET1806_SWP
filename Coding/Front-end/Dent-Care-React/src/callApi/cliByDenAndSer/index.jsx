import { useState, useEffect } from 'react';
import api from '../../config/axios';
import { useParams } from 'react-router-dom';

const useClinicByServicesAndDentist = (did,sid) => {


    const [clinic, setClinic] = useState([])

    const getClinics = async () => {
        try {
            const res = await api.get(`/clinic/dentist/${did}/service/${sid}`)
            setClinic(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getClinics()
    }, []);

    return { clinic};
};

export default useClinicByServicesAndDentist;

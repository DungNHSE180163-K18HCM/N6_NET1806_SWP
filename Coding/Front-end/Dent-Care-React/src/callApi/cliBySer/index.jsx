import { useState, useEffect } from 'react';
import api from '../../config/axios';
import { useParams } from 'react-router-dom';

const useClinicByServicesID = () => {

    const {sid} = useParams()

    const [clinic, setClinic] = useState([])

    const getClinics = async () => {
        try {
            const res = await api.get(`/service-clinic/search-clinic-by-service-id/${sid}`)
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

export default useClinicByServicesID;

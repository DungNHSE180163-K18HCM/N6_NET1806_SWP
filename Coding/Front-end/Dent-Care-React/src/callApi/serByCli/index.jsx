import { useState, useEffect } from 'react';
import api from '../../config/axios';
import { useParams } from 'react-router-dom';

const useServicesByClinicID = () => {

    const {id} = useParams()

    const [service, setService] = useState([])

    const getServices = async () => {
        try {
            const res = await api.get(`/service-clinic/search-service-by-clinic-id/${id}`)
            setService(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getServices()
    }, []);

    return { service};
};

export default useServicesByClinicID;

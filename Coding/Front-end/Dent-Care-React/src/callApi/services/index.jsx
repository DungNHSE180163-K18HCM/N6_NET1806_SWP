import { useState, useEffect } from 'react';
import api from '../../config/axios';

const useServices = () => {
    const [service, setService] = useState([])

    const getServices = async () => {
        try {
            const res = await api.get('/service')
            setService(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getServices()
    }, []);

    return { service,setService};
};

export default useServices;

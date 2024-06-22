import { useState, useEffect } from 'react';
import api from '../../config/axios';

const useServiceByID = (id) => {
    const [service, setService] = useState({})

    const getService = async () => {
        try {
            const res = await api.get(`/service/${id}`)
            setService(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getService()
    }, []);

    return { service};
};

export default useServiceByID;

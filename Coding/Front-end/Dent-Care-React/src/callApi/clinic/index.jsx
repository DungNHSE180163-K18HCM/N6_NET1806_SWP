import { useState, useEffect } from 'react';
import api from '../../config/axios';

const useClinics = () => {
    const [clinic, setClinic] = useState([])

    const getClinics = async () => {
        try {
            const res = await api.get('/clinic')
            setClinic(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getClinics()
    }, []);

    return { clinic };
};

export default useClinics;

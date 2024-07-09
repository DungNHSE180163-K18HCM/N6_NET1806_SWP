import { useState, useEffect } from 'react';
import api from '../../config/axios';

const useQualification = (id) => {


    const [qualification, setQualification] = useState([])

    const getQualification = async () => {
        try {
            const res = await api.get(`/qualification/dentist/${id}`)
            setQualification(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getQualification()
    }, []);

    return { qualification};
};

export default useQualification;

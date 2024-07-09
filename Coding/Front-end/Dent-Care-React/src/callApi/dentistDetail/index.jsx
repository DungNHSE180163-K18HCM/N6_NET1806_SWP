import { useState, useEffect } from 'react';
import api from '../../config/axios';
import { useParams } from 'react-router-dom';

const useDentistDetail = () => {
    const { did } = useParams()

    const [dentist, setDentist] = useState({});

    const getDentistDetail = async () => {
        try {
            const res = await api.get(`/account/${did}`);
            setDentist(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Optionally, you can fetch the data when the hook is first used
    useEffect(() => {
        getDentistDetail();
    }, []);

    return { dentist };
};

export default useDentistDetail;

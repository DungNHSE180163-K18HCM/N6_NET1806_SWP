import { useState, useEffect } from 'react';
import api from '../../config/axios';

const useDentistByID = (id) => {
    const [dentist, setDentist] = useState({});

    const getDentist = async () => {
        try {
            const res = await api.get(`/account/${id}`);
            setDentist(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Optionally, you can fetch the data when the hook is first used
    useEffect(() => {
        getDentist();
    }, []);

    return { dentist };
};

export default useDentistByID;

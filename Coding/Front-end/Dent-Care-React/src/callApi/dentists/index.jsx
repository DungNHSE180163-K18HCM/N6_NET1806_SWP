import { useState, useEffect } from 'react';
import api from '../../config/axios';

const useDentists = () => {
    const [dentist, setDentist] = useState([]);
    const role = 'DENTIST';

    const getDentists = async () => {
        try {
            const res = await api.get(`/account/role/${role}`);
            setDentist(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Optionally, you can fetch the data when the hook is first used
    useEffect(() => {
        getDentists();
    }, []);

    return { dentist };
};

export default useDentists;

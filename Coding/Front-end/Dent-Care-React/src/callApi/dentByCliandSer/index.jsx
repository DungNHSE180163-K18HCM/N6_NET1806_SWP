import { useState, useEffect } from 'react';
import api from '../../config/axios';
import { useParams } from 'react-router-dom';

const useDentistsByClinicAndService = () => {
    const [dentist, setDentist] = useState([]);
    const role = 'DENTIST';
    const {id,sid}= useParams();

    const getDentists = async () => {
        try {
            const res = await api.get(`/account/role/DENTIST/clinic/${id}/service/${sid}`);
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

export default useDentistsByClinicAndService;

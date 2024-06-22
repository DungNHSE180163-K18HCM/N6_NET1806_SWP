import { useState, useEffect } from 'react';
import api from '../../config/axios';
import { useParams } from 'react-router-dom';

const useDentistsByClinic = () => {
    const [dentist, setDentist] = useState([]);
    const role = 'DENTIST';
    const { id } = useParams()


    const getDentists = async () => {
        try {
            const res = await api.get(`/account/role/${role}/clinic/${id}`);
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

export default useDentistsByClinic;

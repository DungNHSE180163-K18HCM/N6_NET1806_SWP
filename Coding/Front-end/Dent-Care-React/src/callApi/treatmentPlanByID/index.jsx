import { useState, useEffect } from 'react';
import api from '../../config/axios';

const useTreatmentByID = (id) => {


    const [treatment, setTreatment] = useState({})

    const getTreatment = async () => {
        try {
            const res = await api.get(`/treatment-plan/id/${id}`)
            setTreatment(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTreatment()
    }, [id]);

    return { treatment};
};

export default useTreatmentByID;

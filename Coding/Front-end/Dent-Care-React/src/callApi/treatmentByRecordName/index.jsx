import { useState, useEffect } from 'react';
import api from '../../config/axios';

const useTreatmentByRecordName = (name) => {


    const [treatment, setTreatment] = useState([])

    const getTreatment = async () => {
        try {
            const res = await api.get(`/treatment-plan/record/${name}`)
            setTreatment(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTreatment()
    }, [name]);

    return { treatment};
};

export default useTreatmentByRecordName;

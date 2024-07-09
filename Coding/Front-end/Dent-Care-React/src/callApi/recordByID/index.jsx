import { useState, useEffect } from 'react';
import api from '../../config/axios';

const useRecordByID = (id) => {


    const [record, setRecord] = useState({})

    const getRecord = async () => {
        try {
            const res = await api.get(`/medical-record/id/${id}`)
            setRecord(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getRecord()
    }, [id]);

    return { record};
};

export default useRecordByID;

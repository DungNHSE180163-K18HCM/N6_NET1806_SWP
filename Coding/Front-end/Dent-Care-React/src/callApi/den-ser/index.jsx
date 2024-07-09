import { useState, useEffect } from 'react';
import api from '../../config/axios';
import { useParams } from 'react-router-dom';

const useSerAndDenByID = (sid,did) => {

    const [denSer, setDenSer] = useState([]);

    const getDenSer = async () => {
        try {
            const res = await api.get(`/dentist-service/dentist/${did}/service/${sid}`);
            setDenSer(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Optionally, you can fetch the data when the hook is first used
    useEffect(() => {
        getDenSer();
    }, []);

    return { denSer };
};

export default useSerAndDenByID;

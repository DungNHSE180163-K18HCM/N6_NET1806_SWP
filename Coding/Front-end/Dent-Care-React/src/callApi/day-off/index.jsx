import { useState, useEffect } from 'react';
import api from '../../config/axios';

const useDayOffByDentistID = (id) => {
    const [dayOff, setdayOff] = useState([])

    const getdayOff = async () => {
        try {
            const res = await api.get(`/working-day-off/dentist/${id}`)
            setdayOff(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getdayOff()
    }, []);

    return { dayOff };
};

export default useDayOffByDentistID;

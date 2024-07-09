import { useState, useEffect } from 'react';
import api from '../../config/axios';

const useSlotByDentistID = (id) => {
  
    const [slot, setSlot] = useState([])

    const getSlot = async () => {
        try {
            const res = await api.get(`/slot/dentists/${id}`)
            setSlot(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getSlot()
    }, []);

    return { slot};
};

export default useSlotByDentistID;

import { useState, useEffect } from 'react';
import api from '../../config/axios';

const useSlotByDentistIDAndDate = (date,did) => {
  
    console.log(date)
    console.log(did)

    const [slot, setSlot] = useState([])

    const getSlot = async () => {
        try {
            const res = await api.get(`/slot/available/dentist/${did}/day-off/${date}`)
            setSlot(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return { slot, getSlot};
};

export default useSlotByDentistIDAndDate;

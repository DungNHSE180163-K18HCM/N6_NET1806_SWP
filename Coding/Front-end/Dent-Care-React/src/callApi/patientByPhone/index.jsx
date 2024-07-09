import { useState, useEffect } from 'react';
import api from '../../config/axios';

import { useParams } from 'react-router-dom'
const getPatient = async (phone) => {
    try {
        return (await api.get(`/patient/phone/${phone}`)).data
    } catch (error) {
        console.log(error)
    }
}
;

const usePatientByPhone = (phone) => {


    const [patient, setPatient] = useState({})



    useEffect(async () => {
        setPatient( await getPatient(phone))
    }, [phone]);


  
    return { patient };
};

export {getPatient}

export default usePatientByPhone;

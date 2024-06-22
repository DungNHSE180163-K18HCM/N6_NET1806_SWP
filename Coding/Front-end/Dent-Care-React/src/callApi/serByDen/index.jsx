import { useEffect, useState } from "react";
import api from "../../config/axios";
import { useParams } from "react-router-dom";

const useServiceByDentistID = () => {

    const { id } = useParams()


    const [service, setService] = useState([])
    const getServiceByDentistID = async () => {
        try {
            const res = await api.get(`/dentist-service/search-by-dentist-id/${id}`)
            setService(res.data)
        } catch (error) {
            console.log(error);
        }
    };

    // Optionally, you can fetch the data when the hook is first used
    useEffect(() => {
        getServiceByDentistID();
    }, []);

    return { service };
};

export default useServiceByDentistID;
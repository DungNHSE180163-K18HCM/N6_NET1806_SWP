import { useEffect, useState } from "react";
import api from "../../config/axios";
import { useParams } from "react-router-dom";

const useClinicDetail = () => {

    const { id } = useParams()


    const [clinic, setClinic] = useState({})
    const getClinicDetail = async () => {
        try {
            const res = await api.get(`/clinic/${id}`)
            setClinic(res.data)
        } catch (error) {
            console.log(error);
        }
    };

    // Optionally, you can fetch the data when the hook is first used
    useEffect(() => {
        getClinicDetail();
    }, []);

    return { clinic };
};

export default useClinicDetail;
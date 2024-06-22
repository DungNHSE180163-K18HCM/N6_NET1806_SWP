import { useEffect, useState } from "react";
import api from "../../config/axios";
import { useParams } from "react-router-dom";

const useServiceDetail = () => {

    const { sid } = useParams()


    const [service, setService] = useState({})
    const getServiceDetail = async () => {
        try {
            const res = await api.get(`/service/${sid}`)
            setService(res.data)
        } catch (error) {
            console.log(error);
        }
    };

    // Optionally, you can fetch the data when the hook is first used
    useEffect(() => {
        getServiceDetail();
    }, []);

    return { service };
};

export default useServiceDetail;
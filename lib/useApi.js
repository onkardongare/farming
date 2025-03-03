
import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useApi = (apiFunction, params = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = params ? await apiFunction(params) : await apiFunction();
            setData(response);
        } catch (error) {
            Alert.alert("Error", error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading, refetch: fetchData };
};

export default useApi;

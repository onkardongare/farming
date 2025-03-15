import axios from "axios";

const BASE_URL = "http://192.168.34.29:5000"; // Change to your backend server URL

console.log("something in api")

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;
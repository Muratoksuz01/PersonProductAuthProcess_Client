import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BaseUrl, API_PATH } from "./API_PATH";

export const axiosInstance = axios.create({
    baseURL: BaseUrl,

});
axiosInstance.interceptors.request.use(config => {
    let token = localStorage.getItem("userToken");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (
            error.response &&
            (error.response.status === 401 || error.response.status === 403)
        ) {
            console.error("Response error :: ", error.response);
            const navigate = useNavigate();
            navigate("/login");
        }

        return Promise.reject(error);
    }
);

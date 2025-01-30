import axios from "axios";

export const getToken = async (payload) => {
    let response = await axios.post(`${import.meta.env.VITE_API_URL}/shopify/init`, payload);
    return response.data;
}

export const userLogin = async (payload) => {
    let response = await axios.post(`${import.meta.env.VITE_API_URL}/shopify/login`, payload);
    return response.data;
}
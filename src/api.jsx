import axios from "axios";

export const contactForm = async (payload) => {
    let response = await axios.post(`${import.meta.env.VITE_API_URL}/appvertix/contact`, payload);
    return response.data;
}

export const subscribeForm = async (payload) => {
    let response = await axios.post(`${import.meta.env.VITE_API_URL}/appvertix/subscribe`, payload);
    return response.data;
}
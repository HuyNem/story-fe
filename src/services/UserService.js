import axios from "axios";

export const loginUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/sign-in`, data);
    return res.data;
};

export const signupUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/sign-up`, data);
    return res.data;
};
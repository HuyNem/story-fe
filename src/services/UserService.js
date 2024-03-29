import axios from "axios";

export const axiosJWT = axios.create()

export const loginUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/sign-in`, data);
    return res.data;
};

export const signupUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/sign-up`, data);
    return res.data;
};

export const getDetailUser = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/get-detail-user/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
};

export const refreshToken = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/refresh-token`, {
        withCredentials: true
    });
    return res.data;
};


export const logoutUser = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/log-out`);
    return res.data;
};

export const updateUser = async (id, data) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/update-user/${id}`, data);
    return res.data;
};
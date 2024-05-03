import axios from "axios";
import { axiosJWT } from "./UserService";

export const getAllCategory = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/category/get-all`);
    return res.data;
};

export const createCategory = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/category/create-category`, data);
    return res.data;
};

export const getCategoryById = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/category/get-category/${id}`);
    return res.data;
};

export const updateCategory = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/api/category/update-category/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
};

export const deleteCategory = async (id, access_token) => {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/category/delete-category/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
};
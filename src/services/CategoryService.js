import axios from "axios";

export const getAllCategory = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/admin/category/get-all`);
    return res.data;
};

export const createCategory = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/admin/category/create-category`, data);
    return res.data;
};

export const getCategoryById = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/admin/category/get-category/${id}`);
    return res.data;
};
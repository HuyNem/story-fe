import axios from "axios";

export const getAllStory = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/admin/story`);
    return res.data;
};

export const createStory = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/admin/story/create-story`, data);
    return res.data;
};
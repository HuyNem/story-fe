import axios from "axios";

export const getAllChapter = async (storyId) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/chapter/${storyId}`);
    return res.data;
};

export const createChapter = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/chapter/create-chapter`, data);
    return res.data;
};

export const deleteChapter = async (chapId, access_token) => {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/chapter/delete-chapter/${chapId}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
};
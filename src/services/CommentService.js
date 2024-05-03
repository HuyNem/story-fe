import axios from "axios";

export const getComment = async (storyId) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/comment/get-comments/${storyId}`);
    return res.data;
};

export const comment = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/comment/create-comment`, data);
    return res.data;
};
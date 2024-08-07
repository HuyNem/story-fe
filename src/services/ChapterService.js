import axios from "axios";
import { axiosJWT } from "./UserService";

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

//get chapter by id
export const getChapterById = async (chapterId) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/chapter/get-chapter/${chapterId}`);
    return res.data;
};

//update chapter
export const updateChapter = async (chapterId, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/api/chapter/update-chapter/${chapterId}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
};

//get chapter by id
export const getChapter = async (storyId, chapNum) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/chapter/${storyId}/${chapNum}`);
    return res.data;
};
import axios from "axios";
import { axiosJWT } from "./UserService";

export const getAllStory = async (page) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/admin/story?page=${page}`);
    return res.data;
};

export const getStoryCategory = async (category, page) => {
    if (category) {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/admin/story/get-story-by-category/${category}/${page}`);
        return res.data;
    }

};

export const createStory = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/admin/story/create-story`, data);
    return res.data;
};

export const getDetailStory = async (NAME) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/admin/story/${NAME}`);
    return res.data;
};

//get member stories
export const getMemberStories = async (userId) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/admin/story/get-member-stories/${userId}`);
    return res.data;
};

//get story by id
export const getStoryById = async (storyId) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/admin/story/get-story/${storyId}`);
    console.log(res);
    return res.data;
};

//update story
export const updateStory = async (storyId, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/admin/story/update-story/${storyId}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
};


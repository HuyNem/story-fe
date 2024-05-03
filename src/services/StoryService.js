import axios from "axios";
export const axiosJWT = axios.create()

export const getStoryCompleted = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/story/completed`);
    return res.data;
};

export const getAllStory = async (page) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/story?page=${page}`);
    return res.data;
};

export const getNewStory = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/story/new-story`);
    return res.data;
};

export const getStoryCategory = async (category, page) => {
    if (category) {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/story/get-story-by-category/${category}/${page}`);
        return res.data;
    }
};

export const createStory = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/story/create-story`, data);
    return res.data;
};

export const getDetailStory = async (NAME) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/story/${NAME}`);
    return res.data;
};

//get member stories
export const getMemberStories = async (userId) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/story/get-member-stories/${userId}`);
    return res.data;
};

//get story by id
export const getStoryById = async (storyId) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/story/get-story/${storyId}`);
    console.log(res);
    return res.data;
};

//update story
export const updateStory = async (storyId, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/api/story/update-story/${storyId}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
};

//admin
//pending approval stories
export const getPendingApprovalStories = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/story/get-unapproved-stories`);
    return res.data;
};

//get approved stories
export const getApprovedStories = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/story/get-approved-stories`);
    return res.data;
};


//approval story
export const approvalStory = async (storyId, access_token) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/api/story/approval-story/${storyId}`, null, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
};

//approval story
export const increaseView = async (storyId) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/story/${storyId}/views/increase`);
    return res.data;
};

//get top view
export const getTopView = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/story/top-view`);
    return res.data;
}

//search
export const search = async (q) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/story/search/${q}`);
    return res.data;
}


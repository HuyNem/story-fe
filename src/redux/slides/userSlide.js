import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    avatar: '',
    facebook: '',
    description: '',
    access_token: '',
    id: '',
    isAdmin: false,
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { name, email, avatar = '', facebook = '', description = '', access_token, _id = '', isAdmin } = action.payload;
            state.name = name;
            state.email = email;
            state.avatar = avatar;
            state.facebook = facebook;
            state.description = description;
            state.access_token = access_token;
            state.id = _id;
            state.isAdmin = isAdmin;
        },
        resetUser: (state) => {
            state.name = '';
            state.email = '';
            state.avatar = '';
            state.facebook = '';
            state.description = '';
            state.access_token = '';
            state.id = '';
        },
    },
})

export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer
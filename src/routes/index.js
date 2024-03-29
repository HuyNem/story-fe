import HomePage from "../pages/HomePage/HomePage";
import PostStory from "../pages/PostStory/PostStory";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import StoryDetailPage from "../pages/StoryDetailPage/StoryDetailPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";

import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import StoryManager from "../pages/StoryManager/StoryManager";
import AdminPage from "../pages/AdminPage/AdminPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
    },
    {
        path: '/dang-truyen',
        page: PostStory,
        isShowHeader: true,
    },
    {
        path: '/dang-nhap',
        page: SignInPage,
        isShowHeader: false,
    },
    {
        path: '/dang-ky',
        page: SignUpPage,
        isShowHeader: false,
    },
    {
        path: '/detail-story-test',
        page: StoryDetailPage,
        isShowHeader: true,
    },
    {
        path: '/trang-ca-nhan',
        page: ProfilePage,
        isShowHeader: true,
    },
    {
        path: '/quan-ly-truyen',
        page: StoryManager,
        isShowHeader: true,
    },
    {
        path: '/system/admin',
        page: AdminPage,
    },
    {
        path: '*',
        page: NotFoundPage,
    }
]

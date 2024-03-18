import HomePage from "../pages/HomePage/HomePage";
import PostStory from "../pages/PostStory/PostStory";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import StoryDetailPage from "../pages/StoryDetailPage/StoryDetailPage";

import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

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
        path: '*',
        page: NotFoundPage,
    }
]

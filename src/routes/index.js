import HomePage from "../pages/HomePage/HomePage";
import PostStoryPage from "../pages/PostStoryPage/PostStoryPage";
import EditStoryPage from "../pages/EditStoryPage/EditStoryPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import StoryDetailPage from "../pages/StoryDetailPage/StoryDetailPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import StoryCategory from "../pages/StoryCategoryPage/StoryCategoryPage";

import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import StoryManager from "../pages/StoryManager/StoryManager";
import AdminPage from "../pages/AdminPage/AdminPage";
import StoryEpisodes from "../pages/StoryEpisodes/StoryEpisodes";
import PostChapterPage from "../pages/PostChapterPage/PostChapterPage";
import EditChapterPage from "../pages/EditChapterPage/EditChapterPage";
import Chapter from "../pages/ChapterPage/Chapter";
import Search from "../pages/SearchPage/SearchPage";
import SortTopView from "../pages/SortPage/SortTopView";
import SortCompleted from "../pages/SortPage/SortCompleted";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
    },
    {
        path: '/dang-truyen',
        page: PostStoryPage,
        isShowHeader: true,
    },
    {
        path: '/quan-ly-truyen/sua-truyen',
        page: EditStoryPage,
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
        path: 'truyen/:name',
        page: StoryDetailPage,
        isShowHeader: true,
    },
    {
        path: 'truyen/:name/truyenhay',
        page: Chapter,
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
        path: '/sap-xep/luot-doc',
        page: SortTopView,
        isShowHeader: true,
    },
    {
        path: '/sap-xep/hoan-thanh',
        page: SortCompleted,
        isShowHeader: true,
    },
    {
        path: '/quan-ly-truyen/cac-tap-truyen',
        page: StoryEpisodes,
        isShowHeader: true,
    },
    {
        path: '/quan-ly-truyen/them-chap',
        page: PostChapterPage,
        isShowHeader: true,
    },
    {
        path: '/quan-ly-truyen/cac-tap-truyen/sua-chuong',
        page: EditChapterPage,
        isShowHeader: true,
    },
    {
        path: '/the-loai/:category',
        page: StoryCategory,
        isShowHeader: true,
    },
    {
        path: '/system/admin',
        page: AdminPage,
    },
    {
        path: '/tim-kiem/:search',
        page: Search,
        isShowHeader: true,
    },
    {
        path: '*',
        page: NotFoundPage,
    }
]

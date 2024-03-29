import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import PostStory from './pages/PostStory/PostStory';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { routes } from './routes';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { useEffect } from 'react';
import axios from 'axios';
import { isJsonString } from './utils';
import { jwtDecode } from "jwt-decode";
import * as UserService from './services/UserService';
import { useDispatch } from 'react-redux'
import { updateUser } from './redux/slides/userSlide';

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleGetDetailUser = async (id, token) => {
      try {
        const res = await UserService.getDetailUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
      } catch (error) {
        // Xử lý lỗi khi gọi API
        console.error('Error fetching user details:', error);
      }
    };

    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailUser(decoded?.id, storageData);
    }
  }, []);

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token');
    let decoded = {}
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData)
    }
    return { decoded, storageData }
  }

  UserService.axiosJWT.interceptors.request.use(async (config) => {
    const currentTime = new Date()
    const { decoded } = handleDecoded();
    if (decoded?.exp < currentTime.getTime() / 1000) {
      const data = await UserService.refreshToken()
      config.headers['token'] = `Bearer ${data?.access_token}`
    }
    return config;
  }, (err) => {
    return Promise.reject(err);
  }
  )

  // const handleGetDetailUser = async (id, token) => {
  //   const res = await UserService.getDetailUser(id, token);
  //   dispatch(updateUser({ ...res?.data, access_token: token }));
  // }

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            const Page = route.page;
            return (
              <Route key={route.path} path={route.path} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            )
          })}
        </Routes>
      </Router>
    </div>
  )
}

export default App;

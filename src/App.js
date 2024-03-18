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

export function App() {
  // useEffect(() => {

  // })

  // const fetchApi = async () => {
  //   const res = axios.get()
  // }
  // console.log(process.env.REACT_APP_API_URL);

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

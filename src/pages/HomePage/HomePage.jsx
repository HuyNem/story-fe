import React from 'react';
import NewStoryComponent from '../../components/StoryComponent/NewStoryComponent';
import NavbarCategoryComponent from '../../components/NavbarCategoryComponent/NavbarCategoryComponent';
import { Col, Row } from 'antd';
import TopView from '../../components/NavbarCategoryComponent/TopView';
import { Wrapper, WrapperContent, WrapperNav } from './style';
import CompletedStory from '../../components/StoryComponent/CompletedStory';


function HomePage() {

    const breadcrumbItems = [
        {
            href: 'http://localhost:3000/',
            title: 'Trang chủ',
        },

    ];

    return (
        <Wrapper>
            <WrapperNav>
                <NavbarCategoryComponent />
                <TopView />
            </WrapperNav>
            <WrapperContent>
                <NewStoryComponent />
                <CompletedStory />
            </WrapperContent>
        </Wrapper>

    );
}

export default HomePage;
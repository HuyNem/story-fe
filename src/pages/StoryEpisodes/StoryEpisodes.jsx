import React from 'react';
import StoryEpisodesList from '../../components/StoryManagerComponent/StoryEpisodesList';
import { Wrapper, WrapperStoryEpisodes } from './style';
import BreadCrumbComponent from '../../components/BreadCrumbComponent/BreadCrumbComponent';

function StoryEpisodes() {
    const breadcrumbItems = [
        {
            href: 'http://localhost:3000/',
            title: 'Trang chủ',
        },
        {
            href: 'http://localhost:3000/quan-ly-truyen',
            title: 'Quản lý truyện',
        },
        {
            title: 'Chương',
        },
    ];
    return (
        <Wrapper>
            <BreadCrumbComponent items={breadcrumbItems} />
            <WrapperStoryEpisodes>
                <h5>Chương</h5>
                <StoryEpisodesList />
            </WrapperStoryEpisodes>
        </Wrapper>
    );
}

export default StoryEpisodes;
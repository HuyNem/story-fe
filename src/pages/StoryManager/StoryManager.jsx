import React from 'react';
import ListStoryComponent from '../../components/StoryManagerComponent/ListStoryComponent';
import { Wrapper, WrapperStoryManager } from './style';
import BreadCrumbComponent from '../../components/BreadCrumbComponent/BreadCrumbComponent';

function StoryManager() {
    const breadcrumbItems = [
        {
            href: 'http://localhost:3000/',
            title: 'Trang chủ',
        },
        {
            title: `Quản lý truyện`,
        },
    ];
    return (
        <Wrapper>
            <BreadCrumbComponent items={breadcrumbItems} />

            <WrapperStoryManager>
                <h5>Quản lý truyện</h5>
                <ListStoryComponent />
            </WrapperStoryManager>
        </Wrapper>

    );
}

export default StoryManager;
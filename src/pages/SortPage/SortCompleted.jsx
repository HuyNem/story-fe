import React from 'react';
import { Wrapper, WrapperCategory, WrapperContent, WrapperLeft, WrapperRight, WrapperStory } from './style';
import NavbarCategoryComponent from '../../components/NavbarCategoryComponent/NavbarCategoryComponent';
import CompletedStory from '../../components/StoryComponent/CompletedStory';
import BreadCrumbComponent from '../../components/BreadCrumbComponent/BreadCrumbComponent';


function SortCompleted() {

    const breadcrumbItems = [
        {
            href: 'http://localhost:3000/',
            title: 'Trang chủ',
        },
        {
            title: 'sắp xếp',
        },
        {
            title: 'Truyện đã hoàn thành',
        },
    ];


    return (
        <Wrapper>
            <div style={{ padding: '0px 200px', backgroundColor: '#EAE8DC' }}>
                <BreadCrumbComponent items={breadcrumbItems} />
            </div>
            <WrapperContent>
                <WrapperLeft>
                    <WrapperStory >
                        <CompletedStory />
                    </WrapperStory>
                </WrapperLeft>

                <WrapperRight>
                    <WrapperCategory>
                        <NavbarCategoryComponent />
                    </WrapperCategory>
                </WrapperRight>
            </WrapperContent>
        </Wrapper>
    );
}

export default SortCompleted;
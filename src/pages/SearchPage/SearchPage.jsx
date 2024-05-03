import React from 'react';
import { Col, Row } from 'antd';
import NavbarCategoryComponent from '../../components/NavbarCategoryComponent/NavbarCategoryComponent';
import Search from '../../components/StoryComponent/Search';
import { Wrapper, WrapperCategory, WrapperContent, WrapperLeft, WrapperRight, WrapperStory } from './style';


function SearchPage() {
    return (
        <Wrapper>
            <WrapperContent>
                <WrapperLeft>
                    <WrapperStory >
                        <Search />
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

export default SearchPage;
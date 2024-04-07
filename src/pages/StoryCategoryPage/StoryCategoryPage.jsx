import React from 'react';
import { Wrapper, WrapperCategory, WrapperContent, WrapperLeft, WrapperRight, WrapperStory } from './style';
import NavbarCategoryComponent from '../../components/NavbarCategoryComponent/NavbarCategoryComponent';
import StoryByCategoryComponent from '../../components/StoryComponent/StoryByCategoryComponent';


function StoryCategory(props) {

    return (
        <Wrapper>
            <WrapperContent>
                <WrapperLeft>
                    <WrapperStory >
                        <StoryByCategoryComponent />
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

export default StoryCategory;
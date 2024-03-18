import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import StoryComponent from './StoryComponents';
import { Col } from 'antd';
import { WrapperStory, WrapperNewStory, WrapperPagination } from './style';

NewStoryComponent.propTypes = {

};

function NewStoryComponent(props) {

    return (
        <WrapperNewStory>
            <h3 style={{ marginLeft: '10px' }}>Truyện mới nhất</h3>
            <hr />
            <WrapperStory>
                <StoryComponent />
                <StoryComponent />
                <StoryComponent />
                <StoryComponent />
            </WrapperStory>
            <WrapperPagination>
                <Pagination defaultCurrent={1} total={50} />
            </WrapperPagination>
        </WrapperNewStory>
    );
}

export default NewStoryComponent;
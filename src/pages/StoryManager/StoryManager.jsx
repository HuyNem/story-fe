import React from 'react';
import ListStoryComponent from '../../components/StoryManagerComponent/ListStoryComponent';
import { WrapperStoryManager } from './style';

function StoryManager(props) {
    return (
        <WrapperStoryManager>
            <h5>Quản lý truyện</h5>
            <ListStoryComponent />
        </WrapperStoryManager>
    );
}

export default StoryManager;
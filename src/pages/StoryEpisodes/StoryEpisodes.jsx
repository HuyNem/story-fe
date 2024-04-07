import React from 'react';
import StoryEpisodesList from '../../components/StoryManagerComponent/StoryEpisodesList';
import { WrapperStoryManager } from './style';

function StoryEpisodes(props) {
    return (
        <WrapperStoryManager>
            <h5>Các tập truyện</h5>
            <StoryEpisodesList />
        </WrapperStoryManager>
    );
}

export default StoryEpisodes;
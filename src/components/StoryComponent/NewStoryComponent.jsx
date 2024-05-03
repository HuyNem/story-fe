import React from 'react';
import VerticalStory from './VerticalStory';
import { WrapperStory, WrapperNewStory, WrapperPagination } from './style';
import { useQuery } from '@tanstack/react-query';
import * as StoryService from '../../services/StoryService';
import Loading from '../../components/LoadingComponent/Loading';



function NewStoryComponent() {

    const fetchStoryAll = async () => {
        const res = await StoryService.getNewStory();
        return res
    }
    const { isPending, data: stories } = useQuery({ queryKey: ['storiesNew'], queryFn: fetchStoryAll, retry: 3, retryDelay: 1000 });
    console.log(stories);
    return (
        <WrapperNewStory >
            <Loading isLoading={isPending}>
                <h3 style={{ marginLeft: '10px' }}>Truyện Mới nhất</h3>
                <hr />
                <WrapperStory>
                    {stories && stories.data.map((story) => {
                        return (
                            <VerticalStory key={story._id} image={story.image} name={story.name} id={story._id} />
                        )
                    })}
                </WrapperStory>
            </Loading>
        </WrapperNewStory>
    );
}

export default NewStoryComponent;
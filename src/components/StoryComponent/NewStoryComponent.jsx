import React, { useState } from 'react';
import { Pagination } from 'antd';
import StoryComponent from './StoryComponents';
import { WrapperStory, WrapperNewStory, WrapperPagination } from './style';
import { useQuery } from '@tanstack/react-query';
import * as StoryService from '../../services/StoryService';
import Loading from '../../components/LoadingComponent/Loading';



function NewStoryComponent() {

    const fetchStoryAll = async () => {
        const res = await StoryService.getAllStory();
        console.log('res: ', res);
        return res
    }
    const { isPending, data: stories } = useQuery({ queryKey: ['story'], queryFn: fetchStoryAll, retry: 3, retryDelay: 1000 });

    return (
        <WrapperNewStory >
            <Loading isLoading={isPending}>
                <h3 style={{ marginLeft: '10px' }}>Truyện Đề Cử</h3>
                <hr />
                <WrapperStory>
                    {stories && stories.data && stories.data.map((story) => {
                        return (
                            <StoryComponent key={story._id} image={story.image} name={story.name} id={story._id} />
                        )
                    })}
                </WrapperStory>
            </Loading>
        </WrapperNewStory>
    );
}

export default NewStoryComponent;
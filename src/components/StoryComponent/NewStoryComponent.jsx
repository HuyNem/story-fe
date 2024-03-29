import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import StoryComponent from './StoryComponents';
import { Col } from 'antd';
import { WrapperStory, WrapperNewStory, WrapperPagination } from './style';
import { useQuery } from '@tanstack/react-query';
import * as StoryService from '../../services/StoryService';



function NewStoryComponent() {

    const fetchStoryAll = async () => {
        const res = await StoryService.getAllStory()
        return res
    }
    const { isPending, data: stories } = useQuery({ queryKey: ['story'], queryFn: fetchStoryAll, retry: 3, retryDelay: 1000 });

    return (
        <WrapperNewStory >
            <h3 style={{ marginLeft: '10px' }}>Truyện mới nhất</h3>
            <hr />
            <WrapperStory>
                {stories?.data.map((story) => {
                    return (
                        <StoryComponent key={story._id} image={story.image} name={story.name} />
                    )
                })}
            </WrapperStory>
            <WrapperPagination>
                <Pagination defaultCurrent={1} total={50} />
            </WrapperPagination>
        </WrapperNewStory>
    );
}

export default NewStoryComponent;
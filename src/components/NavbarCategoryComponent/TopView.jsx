import React, { useState } from 'react';
import { NavCategory, WrapperCategoryItem, WrapperContent, WrapperItem, WrapperLabel } from './style';
import { GiEyeTarget } from "react-icons/gi";
import * as StoryService from '../../services/StoryService';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { slug } from '../../utils';

function TopView() {
    const navigate = useNavigate();
    let top = 1;

    const fetchTopViewApi = async () => {
        const res = await StoryService.getTopView();
        return res;
    }
    const { data: stories } = useQuery({ queryKey: ['stories'], queryFn: fetchTopViewApi, retry: 3, retryDelay: 1000 });


    return (
        <NavCategory style={{ marginTop: 15 }}>
            <WrapperLabel>Top Truyện Hay</WrapperLabel>
            <hr />
            <WrapperContent>
                {stories && stories?.data.map((story) => {
                    const currentTop = top++;
                    const view = story.view;
                    const formatNum = view.toLocaleString('en-US');
                    return (
                        <WrapperItem key={story._id} onClick={() => navigate(`/truyen/${slug(story.name)}`, { state: { name: story.name, id: story._id } })}>
                            <h3>{currentTop}</h3>
                            <div>
                                <h4>{story.name}</h4>
                                <p><GiEyeTarget /> {formatNum}</p>
                            </div>
                        </WrapperItem>
                    )
                })}
            </WrapperContent>
        </NavCategory>
    );
}

export default TopView;
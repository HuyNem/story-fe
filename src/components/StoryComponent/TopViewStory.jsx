import React from 'react';
import { WrapperStoryCompleted, WrapperTitle } from './style';
import { useQuery } from '@tanstack/react-query';
import * as StoryService from '../../services/StoryService';
import Loading from '../../components/LoadingComponent/Loading';
import HorizontalStory from './HorizontalStory';


function TopViewStory(props) {

    const fetchStoryTopView = async () => {
        const res = await StoryService.getTopView();
        return res
    }
    const { isPending, data: storiesTopView } = useQuery({ queryKey: ['storiesTopView'], queryFn: fetchStoryTopView, retry: 3, retryDelay: 1000 });
    return (
        <WrapperStoryCompleted>
            <Loading isLoading={isPending}>

                <WrapperTitle>Truyện hay nhất</WrapperTitle>
                <hr />
                {storiesTopView && storiesTopView.data.map((data) => {
                    return (
                        <HorizontalStory
                            key={data._id}
                            img={data.image}
                            name={data.name}
                            author={data.author}
                            id={data._id}
                            view={data.view}
                        />
                    )
                })}
            </Loading>

        </WrapperStoryCompleted>
    );
}

export default TopViewStory;
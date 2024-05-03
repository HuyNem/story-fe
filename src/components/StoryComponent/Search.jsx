import React, { useEffect, useState } from 'react';
import { WrapperPagination, WrapperStory, WrapperStoryByCategory, WrapperStoryCategory, WrapperTitle } from './style';
import Loading from '../LoadingComponent/Loading';
import { useLocation } from 'react-router-dom';
import * as StoryService from '../../services/StoryService';
import { useQuery } from '@tanstack/react-query';
import HorizontalStory from './HorizontalStory';


function Search() {
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [stories, setStories] = useState([]);
    const q = location.state.q;

    const fetchSearch = async (q) => {
        setLoading(true);
        const res = await StoryService.search(q);
        if (res?.status === 'OK') {
            setLoading(false);
            setStories(res?.data);
        } else {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (q) {
            fetchSearch(q);
        }
    }, [q])


    return (
        <WrapperStoryByCategory>
            <Loading isLoading={loading}>

                <WrapperTitle>Kết quả tìm kiếm:</WrapperTitle>
                <hr />
                {stories?.map((data) => {
                    return (
                        <HorizontalStory
                            key={data._id}
                            img={data.image}
                            name={data.name}
                            author={data.author}
                            id={data._id}
                        />
                    )
                })}
            </Loading>

        </WrapperStoryByCategory>
    );
}

export default Search;
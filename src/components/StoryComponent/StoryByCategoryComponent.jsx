import React, { useEffect, useState } from 'react';
import { WrapperPagination, WrapperStory, WrapperStoryByCategory, WrapperStoryCategory, WrapperTitle } from './style';
import Loading from '../LoadingComponent/Loading';
import { useLocation } from 'react-router-dom';
import * as StoryService from '../../services/StoryService';
import StoryCategoryComponent from './StoryCategoryComponent';
import { Pagination } from 'antd';


function StoryByCategoryComponent(props) {
    const [pagination, setPagination] = useState({
        page: 0,
    });
    const { state } = useLocation();
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchStoryCategory = async (category, page) => {
        setLoading(true);
        const res = await StoryService.getStoryCategory(category, page);
        if (res?.status === 'OK') {
            setLoading(false);
            setStories(res?.data);
            setPagination({ ...pagination, total: res?.total })
        } else {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (state) {
            fetchStoryCategory(state, pagination.page);
        }
    }, [state, pagination.page])

    const onChange = (current) => {
        setPagination({ ...pagination, page: current - 1 })
    }

    return (
        <WrapperStoryByCategory>
            <Loading isLoading={loading}>

                <WrapperTitle>{state}</WrapperTitle>
                <hr />
                {stories?.map((data) => {
                    return (
                        <StoryCategoryComponent
                            key={data._id}
                            img={data.image}
                            name={data.name}
                            author={data.author}
                            id={data._id}
                        />
                    )
                })}
            </Loading>

            <WrapperPagination>
                <Pagination defaultCurrent={pagination.page + 1} total={pagination.total} onChange={onChange} />
            </WrapperPagination>

        </WrapperStoryByCategory>
    );
}

export default StoryByCategoryComponent;
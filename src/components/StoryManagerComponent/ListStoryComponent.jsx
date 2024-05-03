import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import TableComponent from '../TableComponent/TableComponent';
import { useSelector } from 'react-redux';
import * as StoryService from '../../services/StoryService';
import { useQuery } from '@tanstack/react-query';
import Loading from '../LoadingComponent/Loading';

import { CustomButton, WrapperListStory } from './style';
import { useNavigate } from 'react-router-dom';


function ListStoryComponent(props) {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const [memberStories, setMemberStories] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [rowSelected, setRowSelected] = useState({});

    const fetchMemberStoriesApi = async () => {
        setIsPending(true);
        try {
            const res = await StoryService.getMemberStories(user.id);
            setMemberStories(res.data);
        } catch (error) {
            console.error('Error fetching member stories:', error);
        } finally {
            setIsPending(false);
        }
    }

    useEffect(() => {
        fetchMemberStoriesApi();
    }, [user]);

    useEffect(() => {

    }, rowSelected);

    const handleEditStory = () => {
        if (rowSelected) {
            navigate('/quan-ly-truyen/sua-truyen', { state: { selectRow: rowSelected.storyId } });
        }
    }

    const handleStoryEpisodes = () => {
        if (rowSelected) {
            navigate('/quan-ly-truyen/cac-tap-truyen/', { state: { storyId: rowSelected.storyId, storyName: rowSelected.storyName } });
        }
    }

    const handleAddChap = () => {
        if (rowSelected) {
            navigate('/quan-ly-truyen/them-chap/', { state: { selectRow: rowSelected } });
        }
    }

    const columns = [
        {
            title: 'Tên truyện',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Hoàn thành',
            dataIndex: 'isCompleted',
            key: 'isCompleted',
            render: (isCompleted) => isCompleted ? 'Hoàn thành' : 'Chưa hoàn thành',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => status ? 'Đã duyệt' : 'Chờ duyệt',
        },
        {
            title: 'Chỉnh sửa',
            dataIndex: 'edit',
            key: 'edit',
            render: () => (<CustomButton onClick={handleEditStory}>Chỉnh sửa</CustomButton>),
        },
        {
            title: 'Các tập',
            dataIndex: 'episodes',
            key: 'episodes',
            render: () => (<CustomButton onClick={handleStoryEpisodes}>Các chương</CustomButton>),
        },
        {
            title: 'Thêm tập',
            key: 'addEpisodes',
            render: () => (<CustomButton onClick={handleAddChap} bgColor='green' hoverColor='#035a03'>Thêm chương</CustomButton>),
        },
    ];

    const data = memberStories || [];
    const dataWidthKey = data.map(item => ({ ...item, key: item._id }));

    return (
        <WrapperListStory>

            <p>{user?.name} Quản lý truyện</p>

            <TableComponent
                columns={columns}
                data={dataWidthKey}
                isPending={isPending}
                {...props}
                onRow={(record, rowIndex) => {
                    return {
                        onMouseEnter: (event) => {
                            setRowSelected({storyId: record._id, storyName: record.name});
                        },
                    };
                }}
            />
        </WrapperListStory>
    );
}

export default ListStoryComponent;
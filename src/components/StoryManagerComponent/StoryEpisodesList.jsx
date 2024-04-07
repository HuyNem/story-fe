import React, { useEffect, useState } from 'react';
import { CustomButton, WrapperListChapter } from './style';
import { useLocation } from 'react-router-dom';
import * as ChapterService from '../../services/ChapterService';
import TableComponent from '../TableComponent/TableComponent';
import ModalComponent from '../ModalComponent/ModalComponent';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as message from '../../components/Message/Message';
import Loading from '../LoadingComponent/Loading';
import { useQuery } from '@tanstack/react-query';


function StoryEpisodesList(props) {
    //useSelector
    const user = useSelector((state) => state?.user);
    const location = useLocation();
    const storyId = location?.state?.selectRow; //row in ListStory
    const [chapters, setChapters] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [rowSelected, setRowSelected] = useState();
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);


    const fetctChapterApi = async () => {
        setIsPending(true);
        try {
            const res = await ChapterService.getAllChapter(storyId);
            setChapters(res.data);
        } catch (error) {
            console.error('Error fetching chapter:', error);
        } finally {
            setIsPending(false);
        }
    }

    // useEffect
    useEffect(() => {
        fetctChapterApi();
    }, [storyId]);


    //
    //mutation delete chapter
    const mutationDelete = useMutationHooks(
        (data) => {
            const { id, token } = data;
            return ChapterService.deleteChapter(id, token);
        }
    )
    const { data: dataDelete, isPending: isPendingDelete, isSuccess: isSuccessDelete } = mutationDelete;

    //useEffect delete chapter
    useEffect(() => {
        if (isSuccessDelete) {
            if (dataDelete?.status === 'OK') {
                message.success('Xóa chapter thành công');
                handleCancelModalDelete();
            }
        }
    }, [isSuccessDelete])

    const columns = [
        {
            title: 'Chương',
            dataIndex: 'chapNum',
            key: 'chap',
            // render: (text) => <a>{text}</a>,
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Chỉnh sửa',
            dataIndex: 'edit',
            key: 'edit',
            render: () => (<CustomButton>Chỉnh sửa</CustomButton>),
        },
        {
            title: 'Xóa',
            dataIndex: 'delete',
            key: 'delete',
            render: () => (<CustomButton onClick={() => setIsModalOpenDelete(true)} style={{ backgroundColor: 'red', fontWeight: 500 }}>Xóa</CustomButton>),
        },
    ];

    //dữ liệu của bảng
    const data = chapters || [];
    const dataWidthKey = data.map(item => ({ ...item, key: item._id }));

    //cancel modal delete chapter
    const handleCancelModalDelete = () => {
        setIsModalOpenDelete(false)
    };

    //delete chapter
    const handleDelete = () => {
        mutationDelete.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                fetctChapterApi();
            }
        }
        )
    };

    return (
        <WrapperListChapter>
            <p>Truyện:</p>
            <TableComponent
                columns={columns}
                data={dataWidthKey}
                isPending={isPending}
                {...props}
                onRow={(record, rowIndex) => {
                    return {
                        onMouseEnter: () => { setRowSelected(record._id) },
                    };
                }}
            />
            {/* MODAL DELETE CATEGORY */}
            <ModalComponent
                icon={<ExclamationCircleFilled />}
                okText={'Xóa'}
                okType={'danger'}
                maskClosable={false}
                title="XÓA CHƯƠNG NÀY"
                open={isModalOpenDelete}
                onCancel={handleCancelModalDelete}
                onOk={handleDelete}>
                <Loading isLoading={isPendingDelete}>
                    <div>Bạn có chắc không?</div>
                </Loading>
            </ModalComponent>
        </WrapperListChapter>
    );
}

export default StoryEpisodesList;
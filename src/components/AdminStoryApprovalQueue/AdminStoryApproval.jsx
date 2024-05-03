import React, { useState, useEffect, useRef } from 'react';
import { WrapperAdminUser, WrapperHeader, WrapperTable } from '../AdminCategory/style';
import TableComponent from '../TableComponent/TableComponent';
import * as StoryService from '../../services/StoryService';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import ModalComponent from '../ModalComponent/ModalComponent';
import { ExclamationCircleFilled } from '@ant-design/icons';
import Loading from '../LoadingComponent/Loading';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { message } from 'antd';

import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';


function AdminStoryPendingApproval() {
    const user = useSelector((state) => state?.user);
    const [rowSelected, setRowSelected] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);

    //search
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    //pending approval stories
    const fetPendingApprovalStories = async () => {
        const res = await StoryService.getPendingApprovalStories();
        return res;
    }
    const queryStory = useQuery({ queryKey: ['story'], queryFn: fetPendingApprovalStories, retry: 3, retryDelay: 1000 });
    const { isPending, data: stories } = queryStory;

    //approval story
    const mutationApproval = useMutationHooks(
        (data) => {
            const { id, token } = data;
            return StoryService.approvalStory(id, token);
        }
    )
    const { data: dataApproval, isPending: isPendingApproval, isSuccess: isSuccessApproval } = mutationApproval;

    //useEffect approval story
    useEffect(() => {
        if (isSuccessApproval) {
            if (dataApproval?.status === 'OK') {
                message.success('Phê duyệt thành công');
                handleCancelModal();
            }
        }
    }, [isSuccessApproval])

    const columns = [
        {
            title: 'Tên truyện',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            key: 'author',
            ...getColumnSearchProps('author'),
        },
        {
            title: 'Ngày đăng',
            dataIndex: 'createdDate',
            key: 'createdDate',
            ...getColumnSearchProps('createdDate'),

        },
        {
            title: 'Duyệt',
            dataIndex: 'approved',
            key: 'approved',
            render: () => (<Button type='primary' onClick={() => setIsModalOpen(true)} >Duyệt</Button>),
        },

    ];

    //dữ liệu call được từ api
    const dataStory = stories?.data || [];
    const dataWithKeys = dataStory.map(item => ({ ...item, key: item._id, }));

    //cancel modal
    const handleCancelModal = () => {
        setIsModalOpen(false)
    };

    //approval story
    const handleApproval = () => {
        mutationApproval.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryStory.refetch();
            }
        }
        )
    };

    return (
        <WrapperAdminUser>
            <WrapperHeader>Danh sách truyện chưa duyệt</WrapperHeader>
            <WrapperTable>
                <TableComponent
                    isPending={isPending}
                    columns={columns}
                    data={dataWithKeys}
                    onRow={(record, rowIndex) => {
                        return {
                            onMouseEnter: () => { setRowSelected(record._id) },
                        };
                    }}
                />
            </WrapperTable>

            {/* MODAL APPROVAL STORY */}
            <ModalComponent
                icon={<ExclamationCircleFilled />}
                okText={'Đồng ý'}
                okType={'primary'}
                maskClosable={false}
                title="PHÊ DUYỆT TRUYỆN"
                open={isModalOpen}
                onCancel={handleCancelModal}
                onOk={handleApproval}>
                <Loading isLoading={isPending}>
                    <div>Bạn có chắc không?</div>
                </Loading>
            </ModalComponent>
        </WrapperAdminUser>
    );
}

export default AdminStoryPendingApproval;
import React, { useEffect, useRef, useState } from 'react';
import { WrapperAdminUser, WrapperHeader, WrapperTable } from './style';
import TableComponent from '../TableComponent/TableComponent';
import * as UserService from '../../services/UserService';
import { useQuery } from '@tanstack/react-query';

import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, message } from 'antd';
import Highlighter from 'react-highlight-words';
import ModalComponent from '../ModalComponent/ModalComponent';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { useSelector } from 'react-redux';
import Loading from '../LoadingComponent/Loading';


function AdminUser() {
    const user = useSelector((state) => state?.user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState();

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

    //get all user
    const fetGetAllUser = async () => {
        const res = await UserService.getAllUsers();
        return res;
    }
    const queryUsers = useQuery({ queryKey: ['users'], queryFn: fetGetAllUser });
    const { isPending, data: users, error } = queryUsers;
    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Role',
            dataIndex: 'isAdmin',
            render: (isAdmin) => isAdmin ? 'Admin' : 'Member',
            sorter: (a, b) => a.isAdmin - b.isAdmin,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Ngày đăng ký',
            dataIndex: 'createdDate',
            ...getColumnSearchProps('createdDate'),
        },
        {
            title: 'Xóa',
            dataIndex: 'delete',
            key: 'delete',
            render: () => (<Button type="primary" danger onClick={() => setIsModalOpen(true)}><DeleteOutlined /></Button>),
        },
    ];

    const dataUsers = users?.data || [];
    const dataWithKeys = dataUsers.map(item => ({ ...item, key: item._id, }));

    //approval story
    const mutationDelete = useMutationHooks(
        (data) => {
            const { id, token } = data;
            return UserService.deleteUser(id, token);
        }
    )
    const { data: dataDelete, isPending: isPendingDelete, isSuccess } = mutationDelete;

    //useEffect delete user
    useEffect(() => {
        if (isSuccess) {
            if (dataDelete?.status === 'OK') {
                message.success('Xóa thành viên thành công');
                handleCancelModal();
            }
            console.log(dataDelete);
        }
    }, [isSuccess])

    //cancel modal
    const handleCancelModal = () => {
        setIsModalOpen(false)
    };

    //approval story
    const handleDelete = () => {
        mutationDelete.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryUsers.refetch();
            }
        }
        )
    };

    return (
        <WrapperAdminUser>
            <WrapperHeader>Quản lý người dùng</WrapperHeader>
            <WrapperTable>
                {error ? (
                    <alert message="Server đang bảo trì" type="warning" />
                ) : (
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
                )}
            </WrapperTable>

            {/* MODAL DELETE USER */}
            <ModalComponent
                icon={<ExclamationCircleFilled />}
                okText={'Đồng ý'}
                okType={'primary'}
                maskClosable={false}
                title="XÓA THÀNH VIÊN"
                open={isModalOpen}
                onCancel={handleCancelModal}
                onOk={handleDelete}>
                <Loading isLoading={isPendingDelete}>
                    <div>Bạn có chắc không?</div>
                </Loading>
            </ModalComponent>
        </WrapperAdminUser>
    );
}

export default AdminUser;
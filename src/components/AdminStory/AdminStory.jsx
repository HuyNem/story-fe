import React, { useState, useRef } from 'react';
import { WrapperAdminUser, WrapperHeader, WrapperTable } from '../AdminCategory/style';
import TableComponent from '../TableComponent/TableComponent';
import * as StoryService from '../../services/StoryService';
import { useQuery } from '@tanstack/react-query';

import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import Highlighter from 'react-highlight-words';


function AdminStory() {
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

    // approved stories
    const fetApprovedStories = async () => {
        const res = await StoryService.getApprovedStories();
        return res;
    }
    const queryStory = useQuery({ queryKey: ['story'], queryFn: fetApprovedStories, retry: 3, retryDelay: 1000 });
    const { isPending, data: stories } = queryStory;

    const columns = [
        {
            title: 'Tên truyện',
            dataIndex: 'name',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            ...getColumnSearchProps('author'),
        },
        {
            title: 'Ngày đăng',
            dataIndex: 'createdDate',
            ...getColumnSearchProps('createdDate'),

        },
    ];
    //dữ liệu call được từ api
    const dataStory = stories?.data || [];
    const dataWithKeys = dataStory.map(item => ({ ...item, key: item._id, }));

    return (
        <WrapperAdminUser>
            <WrapperHeader>Quản lý Truyện</WrapperHeader>
            <WrapperTable>
                <TableComponent
                    isPending={isPending}
                    columns={columns}
                    data={dataWithKeys} />
            </WrapperTable>
        </WrapperAdminUser>
    );
}

export default AdminStory;
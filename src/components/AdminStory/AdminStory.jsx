import React, { useState } from 'react';
import { WrapperAdminUser, WrapperHeader, WrapperTable } from '../AdminCategory/style';
import { Divider, Radio, Table } from 'antd';
import TableComponent from '../TableComponent/TableComponent';


function AdminStory(props) {

    const columns = [
        {
            title: 'Tên truyện',
            dataIndex: 'name',
            // render: (text) => <a>{text}</a>,
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
        },
        {
            title: 'Ngày đăng',
            dataIndex: 'address',
        },
    ];
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
        },
        {
            key: '4',
            age: 99,
            address: 'Sydney No. 1 Lake Park',
        },
    ];

    return (
        <WrapperAdminUser>
            <WrapperHeader>Quản lý Truyện</WrapperHeader>
            <WrapperTable>
                <TableComponent columns={columns} data={data} />
            </WrapperTable>
        </WrapperAdminUser>
    );
}

export default AdminStory;
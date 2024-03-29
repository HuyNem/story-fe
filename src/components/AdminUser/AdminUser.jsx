import React, { useState } from 'react';
import { WrapperAdminUser, WrapperHeader, WrapperTable } from './style';
import { Divider, Radio, Table } from 'antd';
import TableComponent from '../TableComponent/TableComponent';


function AdminUser(props) {
    return (
        <WrapperAdminUser>
            <WrapperHeader>Quản lý người dùng</WrapperHeader>
            <WrapperTable>
                <TableComponent />
            </WrapperTable>
        </WrapperAdminUser>
    );
}

export default AdminUser;
import React from 'react';
import { Table } from 'antd';
import Loading from '../LoadingComponent/Loading';


// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
    }),
};

function TableComponent({ columns, data, isPending,...props }) {
    return (
        <Loading isLoading={isPending}>
            <Table
                rowSelection={{
                    ...rowSelection,
                }}
                bordered
                columns={columns}
                dataSource={data}
                rowKey={data._id}
                {...props}
            />
        </Loading>
    );
}

export default TableComponent;
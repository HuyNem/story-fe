import React, { useEffect, useState } from 'react';
import { WrapperAdminUser, WrapperHeader, WrapperTable } from './style';
import { Button, Modal, Form, Input, Drawer } from 'antd';
import TableComponent from '../TableComponent/TableComponent';
import { useQuery } from '@tanstack/react-query';
import * as CategoryService from '../../services/CategoryService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import Loading from '../LoadingComponent/Loading';
import * as message from '../../components/Message/Message';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DrawerComponent from '../DrawerComponent/DrawerComponent';



function AdminCategory(props) {
    const { TextArea } = Input;
    const [form] = Form.useForm();

    //state
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [rowSelected, setRowSelected] = useState();
    const [stateCategory, setStateCategory] = useState({
        name: '',
        description: ''
    });
    const [stateCategoryDetail, setStateCategoryDetail] = useState({
        name: '',
        description: ''
    });
    //call api category
    //all category
    const fetchCategoryApi = async () => {
        const res = await CategoryService.getAllCategory();
        return res;
    }
    const { data: categories } = useQuery({ queryKey: ['category'], queryFn: fetchCategoryApi, retry: 3, retryDelay: 1000 });
    //one category
    const fetchGetCategoryApiById = async (rowSelected) => {
        const res = await CategoryService.getCategoryById(rowSelected);
        if (res && res.data) {
            setStateCategoryDetail({
                name: res.data.name,
                description: res.data.description
            })
        }
    }


    useEffect(() => {
        if (isOpenDrawer) {
            form.setFieldsValue(stateCategoryDetail)
        }
    }, [form, stateCategoryDetail])

    useEffect(() => {
        if (rowSelected) {
            fetchGetCategoryApiById(rowSelected);
        }
    }, [rowSelected])
    //Action
    const handleDetailCategory = () => {
        if (rowSelected) {
            fetchGetCategoryApiById(rowSelected)
        }
        setIsOpenDrawer(true);
    }

    const renderAction = () => {
        return (
            <div style={{ display: 'flex', gap: 5 }}>
                <Button type="primary" onClick={handleDetailCategory}><FaEdit /></Button>
                <Button type="primary" danger><MdDelete /></Button>
            </div>
        )
    }
    const columns = [
        {
            title: 'Tên Thể loại',
            dataIndex: 'name',
            // render: (text) => <a>{text}</a>,
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
        },
        {
            title: 'Chức năng',
            dataIndex: 'action',
            render: renderAction
        }
    ];
    const dataCategory = categories.data;
    const dataWithKeys = dataCategory.map(item => ({ ...item, key: item._id, }));

    //modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };
    //form
    const onFinish = () => {
        mutation.mutate(stateCategory)
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleOnChange = (e) => {
        setStateCategory({
            ...stateCategory,
            [e.target.name]: e.target.value,
        })
    }

    const handleOnChangeDetail = (e) => {
        setStateCategoryDetail({
            ...stateCategoryDetail,
            [e.target.name]: e.target.value,
        })
    }

    //mutation
    const mutation = useMutationHooks(
        (data) => {
            const { name, description } = data;
            return CategoryService.createCategory({ name, description });
        }
    )
    const { data, isPending, isSuccess } = mutation;
    //useEffect
    useEffect(() => {
        if (isSuccess) {
            if (data?.status === 'OK') {
                message.success('Thêm danh mục thành công');
                handleCancel();
            }
            if (data?.status === 'AR') {
                message.warning('Danh mục đã tồn tại');
            }
        }
    }, [isSuccess])

    return (
        <WrapperAdminUser>
            <WrapperHeader>Quản lý thể loại</WrapperHeader>
            <Button type="primary" style={{ backgroundColor: '#0E3746', marginTop: '10px' }} onClick={() => setIsModalOpen(true)}>Thêm thể loại</Button>
            <WrapperTable>
                <TableComponent
                    keyField={dataCategory._id}
                    columns={columns}
                    data={dataWithKeys}
                    isPending={isPending}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => { setRowSelected(record._id) },
                        };
                    }}
                />
                {/* MODAL */}
                <Modal maskClosable={false} title="Thêm thể loại" open={isModalOpen} onCancel={handleCancel} footer={null}>
                    <Loading isLoading={isPending}>

                        <Form
                            layout='horizontal'
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            style={{
                                maxWidth: 600,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="on"
                            form={form}
                        >
                            <Form.Item
                                label="Tên thể loại"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên thể loại!',
                                    },
                                ]}
                            >
                                <Input allowClear={true} name="name" value={stateCategory.name} onChange={handleOnChange} />
                            </Form.Item>

                            <Form.Item
                                label="Mô tả"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mô tả thể loại!',
                                    },
                                ]}
                            >
                                <TextArea allowClear={true} rows={10} name="description" value={stateCategory.description} onChange={handleOnChange} ></TextArea>
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Thêm
                                </Button>
                            </Form.Item>
                        </Form>
                    </Loading>
                </Modal>
                {/* DRAWER */}
                <DrawerComponent
                    title='Chi tiết thể loại'
                    isOpen={isOpenDrawer}
                    onClose={() => setIsOpenDrawer(false)}
                >
                    <Loading isLoading={isPending}>

                        <Form
                            layout='horizontal'
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            style={{
                                maxWidth: 600,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="on"
                            form={form}
                        >
                            <Form.Item
                                label="Tên thể loại"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên thể loại!',
                                    },
                                ]}
                            >
                                <Input allowClear={true} name="name" value={stateCategoryDetail.name} onChange={handleOnChangeDetail} />
                            </Form.Item>

                            <Form.Item
                                label="Mô tả"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mô tả thể loại!',
                                    },
                                ]}
                            >
                                <TextArea allowClear={true} rows={10} name="description" value={stateCategoryDetail.description} onChange={handleOnChangeDetail} ></TextArea>
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Sửa
                                </Button>
                            </Form.Item>
                        </Form>
                    </Loading>
                </DrawerComponent>
            </WrapperTable>
        </WrapperAdminUser >
    );
}

export default AdminCategory;
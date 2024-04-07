import React, { useEffect, useRef, useState } from 'react';
import { WrapperAdminUser, WrapperHeader, WrapperTable } from './style';
import { Button, Modal, Form, Input, Drawer, Divider, Space } from 'antd';
import TableComponent from '../TableComponent/TableComponent';
import { useQuery } from '@tanstack/react-query';
import * as CategoryService from '../../services/CategoryService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import Loading from '../LoadingComponent/Loading';
import * as message from '../../components/Message/Message';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import { useSelector } from 'react-redux';
import ModalComponent from '../ModalComponent/ModalComponent';
import { ExclamationCircleFilled, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { FaArrowUp } from "react-icons/fa";



function AdminCategory(props) {
    const { TextArea } = Input;
    const [form] = Form.useForm();

    //use Select
    const user = useSelector((state) => state?.user);
    //state
    const [showGoToTop, setShowGoToTop] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
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
    const queryCategory = useQuery({ queryKey: ['category'], queryFn: fetchCategoryApi, retry: 3, retryDelay: 1000 });
    const { isPending: isPendingCategory, data: categories } = queryCategory;
    //one category
    const fetchGetCategoryApiById = async (rowSelected) => {
        const res = await CategoryService.getCategoryById(rowSelected);
        if (res?.data) {
            setStateCategoryDetail({
                name: res?.data?.name,
                description: res?.data?.description
            })
        }
        setIsLoadingUpdate(false);
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
            setIsLoadingUpdate(true);
            fetchGetCategoryApiById(rowSelected)
        }
        setIsOpenDrawer(true);
    }

    const renderAction = () => {
        return (
            <div style={{ display: 'flex', gap: 5 }}>
                <Button type="primary" onClick={handleDetailCategory}><FaEdit /></Button>
                <Button type="primary" danger onClick={() => setIsModalOpenDelete(true)}><MdDelete /></Button>
            </div>
        )
    }

    //tìm kiếm
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

    //search
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
    //các trường của bảng
    const columns = [
        {
            title: 'Tên Thể loại',
            dataIndex: 'name',
            // render: (text) => <a>{text}</a>,
            sorter: (a, b) => a.name.localeCompare(b.name),
            showSorterTooltip: false,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            ...getColumnSearchProps('description'),
        },
        {
            title: 'Chức năng',
            dataIndex: 'action',
            render: renderAction
        }
    ];
    //dữ liệu call được từ api
    const dataCategory = categories.data;
    const dataWithKeys = dataCategory.map(item => ({ ...item, key: item._id, }));

    //modal

    //hàm mở modal thêm
    const handleOpenModal = () => {
        setIsModalOpen(true);
        setStateCategoryDetail({
            name: '',
            description: ''
        });
    };

    //cancel modal create category
    const handleCancel = () => {
        setIsModalOpen(false);
        setStateCategory({ name: '', description: '' });
        form.resetFields();
    };

    //cancel modal edit category
    const handleCancelModalDelete = () => {
        setIsModalOpenDelete(false)
    };
    //delete category
    const handleDeleteCategory = () => {
        mutationDelete.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryCategory.refetch()
            }
        })
    }

    //đóng drawer của chức năng sửa
    const handleCloseDrawer = () => {
        setStateCategoryDetail({ name: '', description: '' });
        form.resetFields();
        setIsOpenDrawer(false);
    };
    //form
    const onFinish = () => {
        mutation.mutate(stateCategory, {
            onSettled: () => {
                queryCategory.refetch();
            }
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    //hàm thay đổi form thêm
    const handleOnChange = (e) => {
        setStateCategory({
            ...stateCategory,
            [e.target.name]: e.target.value,
        })
    }

    //hàm thay đổi form sửa
    const handleOnChangeDetail = (e) => {
        setStateCategoryDetail({
            ...stateCategoryDetail,
            [e.target.name]: e.target.value,
        })
    }

    //mutation create category
    const mutation = useMutationHooks(
        (data) => {
            const { name, description } = data;
            return CategoryService.createCategory({ name, description });
        }
    )
    const { data, isPending, isSuccess } = mutation;

    //mutation update category
    const mutationUpdate = useMutationHooks(
        (data) => {
            console.log('data: ', data);
            const { id, token, ...rests } = data;
            return CategoryService.updateCategory(id, token, rests);
        }
    )
    const { data: dataUpdate, isPending: isPendingUpdate, isSuccess: isSuccessUpdate } = mutationUpdate;
    //mutation delete category
    const mutationDelete = useMutationHooks(
        (data) => {
            const { id, token } = data;
            return CategoryService.deleteCategory(id, token);
        }
    )
    const { data: dataDelete, isPending: isPendingDelete, isSuccess: isSuccessDelete } = mutationDelete;

    //useEffect create category
    useEffect(() => {
        if (isSuccess) {
            if (data?.status === 'OK') {
                message.success('Thêm thể loại thành công');
                handleCancel();
            }
            if (data?.status === 'AR') {
                message.warning('Thể loại đã tồn tại');
            }
        }
    }, [isSuccess])

    //useEffect update category
    useEffect(() => {
        if (isSuccessUpdate) {
            if (dataUpdate?.status === 'OK') {
                message.success('Sửa thể loại thành công');
                handleCloseDrawer();
            }
            if (dataUpdate?.status === 'AR') {
                message.warning('Thể loại đã tồn tại');
            }
        }
    }, [isSuccessUpdate])

    //useEffect delete category
    useEffect(() => {
        if (isSuccessDelete) {
            if (dataDelete?.status === 'OK') {
                message.success('Xóa thể loại thành công');
                handleCancelModalDelete();
            }
        }
    }, [isSuccessDelete])

    const onUpdateCategory = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateCategoryDetail }, {
            onSettled: () => {
                queryCategory.refetch();
            }
        })
    }

    //useEffect scoll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 350) {
                setShowGoToTop(true);
            } else {
                setShowGoToTop(false);
            }
        }
        window.addEventListener('scroll', handleScroll);
    }, [])

    const handleGoToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Cuộn mượt
        });
    }

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
                {/* MODAL CREATE CATEGORY*/}
                <ModalComponent maskClosable={false} title="Thêm thể loại" open={isModalOpen} onCancel={handleCancel} footer={null}>
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
                                <Input allowClear={true} name="name" onChange={handleOnChange} />
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
                                <TextArea allowClear={true} rows={10} name="description" onChange={handleOnChange} ></TextArea>
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
                </ModalComponent>
                {/* DRAWER EDIT CATEGORY*/}
                <DrawerComponent
                    title='Chi tiết thể loại'
                    isOpen={isOpenDrawer}
                    onClose={() => setIsOpenDrawer(false)}
                >
                    <Loading isLoading={isLoadingUpdate}>

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
                            onFinish={onUpdateCategory}
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
                {/* MODAL DELETE CATEGORY */}
                <ModalComponent icon={<ExclamationCircleFilled />} okText={'Xóa'} okType={'danger'} maskClosable={false} title="Xóa thể loại" open={isModalOpenDelete} onCancel={handleCancelModalDelete} onOk={handleDeleteCategory}>
                    <Loading isLoading={isPendingDelete}>
                        <div>Bạn có chắc không?</div>
                    </Loading>
                </ModalComponent>
            </WrapperTable>
            {showGoToTop && (
                <button
                    style={{
                        position: 'fixed',
                        right: 60,
                        bottom: 60,
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        border: '0px',
                        backgroundColor: '#0E3746',
                        cursor: 'pointer',
                        color: '#fff',
                    }}
                    onClick={handleGoToTop}
                >
                    <FaArrowUp />
                </button>
            )}
        </WrapperAdminUser >
    );
}

export default AdminCategory;